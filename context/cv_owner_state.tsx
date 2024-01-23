import {createContext, useContext, useEffect, useState} from 'react'
import {ICV} from '@/data/interfaces/ICV'
import {DeepPartial, Nullable, RequestError} from '@/types/types'
import {useAppContext} from '@/context/state'
import {ModalType, SnackbarType} from '@/types/enums'
import CvOwnerRepository from '@/data/repositories/CvOwnerRepository'
import {ConfirmModalArguments} from '@/types/modal_arguments'
import {PublishStatus} from '@/data/enum/PublishStatus'
import useTranslation from 'next-translate/useTranslation'

interface IState {
  cvId?: Nullable<number> | undefined
  cv: Nullable<ICV>,
  deleteLoading: boolean,
  loading: boolean
  editLoading: boolean,
  editStatusLoading: boolean,
  fetch: () => Promise<Nullable<ICV>>
  delete: () => Promise<Nullable<ICV>>,
  edit: () => void,
  update: (data: DeepPartial<ICV>) => Promise<Nullable<ICV>>,
  create: (data: DeepPartial<ICV>) => Promise<Nullable<ICV>>,
  publish: () => Promise<Nullable<ICV>>,
  pause: () => Promise<Nullable<ICV>>,
}

const defaultValue: IState = {
  cvId: 0,
  cv: null,
  deleteLoading: false,
  loading: false,
  editLoading: false,
  editStatusLoading: false,
  fetch: async () => null,
  delete: async () => null,
  edit: () => null,
  update: async (data) => null,
  create: async (data: DeepPartial<ICV>) => null,
  publish: async () => null,
  pause: async () => null,
}

const CVOwnerContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode,
  cvId?: Nullable<number> | undefined,
  cv?: Nullable<ICV>,
}

export function CVOwnerWrapper(props: Props) {
  const appContext = useAppContext()
  const [cv, setCV] = useState<Nullable<ICV>>(props.cv as Nullable<ICV>)
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [editLoading, setEditLoading] = useState<boolean>(false)
  const [editStatusLoading, setEditStatusLoading] = useState<boolean>(false)
  const { t } = useTranslation()
  useEffect(() => {
    setCV(props.cv as Nullable<ICV>)

  }, [props.cv])
  const fetch = async (): Promise<Nullable<ICV>> => {
    const res = await CvOwnerRepository.fetchById(props.cvId!)
    setCV(res)
    return res
  }

  useEffect(() => {
    if (!props.cv && props.cvId) {
      setLoading(true)
      fetch().then((i) => setLoading(false))
    }
  }, [props.cvId, props.cv])
  const handleUpdate = (entity: ICV) => {
    appContext.cvUpdateState$.next(entity)
  }
  const handleDelete = (entity: ICV) => {
    appContext.cvDeleteState$.next(entity)
  }
  const handleCreate = (entity: ICV) => {
    appContext.cvCreateState$.next(entity)
  }

  const create = async (data: DeepPartial<ICV>): Promise<Nullable<ICV>> => {

    try {
      setEditLoading(true)
      const res = await CvOwnerRepository.create(data)
      setCV(res)
      handleCreate(res)
      setEditLoading(false)
      return res
    } catch (err) {
      if (err instanceof RequestError) {
        appContext.showSnackbar(err.message, SnackbarType.error)
      }
      setEditLoading(false)
      throw err
    }
  }

  const update = async (data: DeepPartial<ICV>): Promise<Nullable<ICV>> => {
    try {
      setEditLoading(true)
      const res = await CvOwnerRepository.update(props.cvId!, data)
      handleUpdate(res)
      setCV(i => ({...i, ...res}))
      setEditLoading(false)
      return res
    } catch (err) {

      setEditLoading(false)
      throw err
    }
  }

  const deleteRequest = async (): Promise<Nullable<ICV>> => {

    return new Promise<Nullable<ICV>>((resolve, reject) => {
      appContext.showModal(ModalType.Confirm, {
        title: t('confirm_cv_delete_title', {name: cv?.title}),
        text: t('confirm_cv_delete_desc', {name: cv?.title}),
        onConfirm: async () => {
          try {
            appContext.hideModal()
            setDeleteLoading(true)
            const res = await CvOwnerRepository.delete(props.cvId!)
            handleDelete(cv!)
            resolve(cv)
          } catch (err) {
            if (err instanceof RequestError) {
              appContext.showSnackbar(err.message, SnackbarType.error)
            }
            resolve(null)
          }
          setDeleteLoading(false)
        }
      } as ConfirmModalArguments)
    })

  }

  const updateStatusRequest = async (status: PublishStatus): Promise<Nullable<ICV>> => {
    try {
      setEditStatusLoading(true)
      const res = await CvOwnerRepository.update(props.cvId!, {status})
      handleUpdate(res)
      setEditStatusLoading(false)
    } catch (err) {
      if (err instanceof RequestError) {
        appContext.showSnackbar(err.message, SnackbarType.error)
      }
      setEditStatusLoading(false)
    }
    return null
  }
  const publish = async (): Promise<Nullable<ICV>> => {
    return new Promise<Nullable<ICV>>((resolve, reject) => {
      appContext.showModal(ModalType.Confirm, {
        title: t('confirm_cv_publish_title', {name: cv?.title}),
        text: t('confirm_cv_publish_desc', {name: cv?.title}),
        onConfirm: async () => {
          await updateStatusRequest(PublishStatus.Published)
          appContext.hideModal()
        }
      } as ConfirmModalArguments)
    })
  }

  const pause = async (): Promise<Nullable<ICV>> => {
    return new Promise<Nullable<ICV>>((resolve, reject) => {
      appContext.showModal(ModalType.Confirm, {
        title: t('confirm_cv_hide_for_hiring_title', {name: cv?.title}),
        text: t('confirm_cv_hide_for_hiring_desc', {name: cv?.title}),
        onConfirm: async () => {
          await updateStatusRequest(PublishStatus.Paused)
          appContext.hideModal()
        }
      } as ConfirmModalArguments)
    })
  }


  const value: IState = {
    ...defaultValue,
    cv,
    cvId: props.cvId,
    editLoading,
    loading,
    deleteLoading,
    editStatusLoading,
    fetch,
    update,
    delete: deleteRequest,
    create,
    publish,
    pause,
  }
  return (
    <CVOwnerContext.Provider value={value}>
      {props.children}
    </CVOwnerContext.Provider>
  )
}

export function useCVOwnerContext() {
  return useContext(CVOwnerContext)
}
