import {createContext, useContext, useEffect, useState} from 'react'
import {IVacancy} from '@/data/interfaces/IVacancy'
import {DeepPartial, Nullable, RequestError} from '@/types/types'
import {useAppContext} from '@/context/state'
import {ModalType, SnackbarType} from '@/types/enums'
import VacancyOwnerRepository from '@/data/repositories/VacancyOwnerRepository'
import {ConfirmModalArguments} from '@/types/modal_arguments'
import {PublishStatus} from '@/data/enum/PublishStatus'

interface IState {
  vacancyId?: Nullable<number> | undefined
  vacancy: Nullable<IVacancy>,
  deleteLoading: boolean,
  loading: boolean
  editLoading: boolean,
  editStatusLoading: boolean,
  fetch: () => Promise<Nullable<IVacancy>>
  delete: () => Promise<Nullable<IVacancy>>,
  edit: () => void,
  update: (data: DeepPartial<IVacancy>) => Promise<Nullable<IVacancy>>,
  create: (data: DeepPartial<IVacancy>) => Promise<Nullable<IVacancy>>,

  publish: () => Promise<Nullable<IVacancy>>,
  pause: () => Promise<Nullable<IVacancy>>,
  close: () => Promise<Nullable<IVacancy>>
}

const defaultValue: IState = {
  vacancyId: 0,
  vacancy: null,
  deleteLoading: false,
  loading: false,
  editLoading: false,
  editStatusLoading: false,
  fetch: async () => null,
  delete: async () => null,
  edit: () => null,
  update: async (data) => null,
  create: async (data: DeepPartial<IVacancy>) => null,
  publish: async () => null,
  pause: async () => null,
  close: async () => null,
}

const VacancyOwnerContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode,
  vacancyId?: Nullable<number> | undefined,
  vacancy?: Nullable<IVacancy>,
}

export function VacancyOwnerWrapper(props: Props) {
  const appContext = useAppContext()
  const [vacancy, setVacancy] = useState<Nullable<IVacancy>>(props.vacancy as Nullable<IVacancy>)
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [editLoading, setEditLoading] = useState<boolean>(false)
  const [editStatusLoading, setEditStatusLoading] = useState<boolean>(false)
  useEffect(() => {
    setVacancy(props.vacancy as Nullable<IVacancy>)
    setLoading(false)

  }, [props.vacancy])
  const fetch = async (): Promise<Nullable<IVacancy>> => {
    const res = await VacancyOwnerRepository.fetchById(props.vacancyId!)
    setVacancy(res)
    return res
  }

  useEffect(() => {
    if (!props.vacancy && props.vacancyId) {
      setLoading(true)
      fetch().then((i) => setLoading(false))
    }
  }, [props.vacancyId, props.vacancy])
  const handleUpdate = (entity: IVacancy) => {
    console.log('handleUpdate', entity)
    appContext.vacancyUpdateState$.next(entity)
  }
  const handleDelete = (entity: IVacancy) => {
    appContext.vacancyDeleteState$.next(entity)
  }
  const handleCreate = (entity: IVacancy) => {
    appContext.vacancyCreateState$.next(entity)
  }

  const create = async (data: DeepPartial<IVacancy>): Promise<Nullable<IVacancy>> => {
    try {
      setEditLoading(true)
      const res = await VacancyOwnerRepository.create(data)
      setVacancy(res)
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

  const update = async (data: DeepPartial<IVacancy>): Promise<Nullable<IVacancy>> => {
    try {
      setEditLoading(true)
      const res = await VacancyOwnerRepository.update(props.vacancyId!, data)
      handleUpdate(res)
      setVacancy(i => ({...i, ...res}))
      setEditLoading(false)
      return res
    } catch (err) {

      setEditLoading(false)
      throw err
    }
  }

  const deleteRequest = async (): Promise<Nullable<IVacancy>> => {
    return new Promise<Nullable<IVacancy>>((resolve, reject) => {
      appContext.showModal(ModalType.Confirm, {
        text: `Are you sure that you want to delete «${vacancy?.name}» ?`,
        onConfirm: async () => {
          try {
            appContext.hideModal()
            setDeleteLoading(true)
            const res = await VacancyOwnerRepository.delete(props.vacancyId!)
            handleDelete(vacancy!)
            resolve(vacancy)
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

  const updateStatusRequest = async (status: PublishStatus): Promise<Nullable<IVacancy>> => {
    try {
      setEditStatusLoading(true)
      const res = await VacancyOwnerRepository.update(props.vacancyId!, {status})
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
  const publish = async (): Promise<Nullable<IVacancy>> => {
    return new Promise<Nullable<IVacancy>>((resolve, reject) => {
      appContext.showModal(ModalType.Confirm, {
        text: `Are you sure that you want to publish «${vacancy?.name}» ?`,
        onConfirm: async () => {
          await updateStatusRequest(PublishStatus.Published)
          appContext.hideModal()
        }
      } as ConfirmModalArguments)
    })
  }

  const pause = async (): Promise<Nullable<IVacancy>> => {
    return new Promise<Nullable<IVacancy>>((resolve, reject) => {
      appContext.showModal(ModalType.Confirm, {
        text: `Are you sure that you want to pause «${vacancy?.name}» ?`,
        onConfirm: async () => {
          await updateStatusRequest(PublishStatus.Paused)
          appContext.hideModal()
        }
      } as ConfirmModalArguments)
    })
  }

  const close = async (): Promise<Nullable<IVacancy>> => {
    return new Promise<Nullable<IVacancy>>((resolve, reject) => {
      appContext.showModal(ModalType.Confirm, {
        text: `Are you sure that you want to close «${vacancy?.name}» ?`,
        onConfirm: async () => {
          await updateStatusRequest(PublishStatus.Closed)
          appContext.hideModal()
        }
      } as ConfirmModalArguments)
    })
  }

  const value: IState = {
    ...defaultValue,
    vacancy,
    vacancyId: props.vacancyId,
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
    close
  }
  return (
    <VacancyOwnerContext.Provider value={value}>
      {props.children}
    </VacancyOwnerContext.Provider>
  )
}

export function useVacancyOwnerContext() {
  return useContext(VacancyOwnerContext)
}