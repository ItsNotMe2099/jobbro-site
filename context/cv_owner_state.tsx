import {createContext, useContext, useEffect, useState} from 'react'
import {ICV} from '@/data/interfaces/ICV'
import {DeepPartial, Nullable, RequestError} from '@/types/types'
import {useAppContext} from '@/context/state'
import {ModalType, SnackbarType} from '@/types/enums'
import CvOwnerRepository from '@/data/repositories/CvOwnerRepository'
import {ConfirmModalArguments} from '@/types/modal_arguments'

interface IState {
  cvId?: Nullable<number> | undefined
  cv: Nullable<ICV>,
  deleteLoading: boolean,
  loading: boolean
  editLoading: boolean,
  fetch: () => Promise<Nullable<ICV>>
  delete: () => Promise<Nullable<ICV>>,
  edit: () => void,
  update: (data: DeepPartial<ICV>) => Promise<Nullable<ICV>>,
  create: (data: DeepPartial<ICV>) => Promise<Nullable<ICV>>,

}

const defaultValue: IState = {
  cvId: 0,
  cv: null,
  deleteLoading: false,
  loading: false,
  editLoading: false,
  fetch: async () => null,
  delete: async () => null,
  edit: () => null,
  update: async (data) => null,
  create: async (data: DeepPartial<ICV>) => null,
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
    console.log('handleUpdate', entity)
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
      console.log('DeleteReq1')
      appContext.showModal(ModalType.Confirm, {
        text: `Вы уверены что хотите удалить резюму «${cv?.title}» ?`,
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
  const value: IState = {
    ...defaultValue,
    cv,
    cvId: props.cvId,
    editLoading,
    loading,
    deleteLoading,
    fetch,
    update,
    delete: deleteRequest,
    create,
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