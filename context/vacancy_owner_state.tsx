import {createContext, useContext, useEffect, useState} from 'react'
import {IVacancy} from '@/data/interfaces/IVacancy'
import {DeepPartial, Nullable, RequestError} from '@/types/types'
import {useAppContext} from '@/context/state'
import {ModalType, SnackbarType} from '@/types/enums'
import VacancyOwnerRepository from '@/data/repositories/VacancyOwnerRepository'
import {ConfirmModalArguments} from '@/types/modal_arguments'

interface IState {
  vacancyId?: Nullable<number> | undefined
  vacancy: Nullable<IVacancy>,
  deleteLoading: boolean,
  loading: boolean
  editLoading: boolean,
  fetch: () => Promise<Nullable<IVacancy>>
  delete: () => Promise<Nullable<IVacancy>>,
  edit: () => void,
  update: (data: DeepPartial<IVacancy>) => Promise<Nullable<IVacancy>>,
  create: (data: DeepPartial<IVacancy>) => Promise<Nullable<IVacancy>>,

}

const defaultValue: IState = {
  vacancyId: 0,
  vacancy: null,
  deleteLoading: false,
  loading: false,
  editLoading: false,
  fetch: async () => null,
  delete: async () => null,
  edit: () => null,
  update: async (data) => null,
  create: async (data: DeepPartial<IVacancy>) => null,
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
  const [loading, setLoading] = useState<boolean>(false)
  const [editLoading, setEditLoading] = useState<boolean>(false)
  useEffect(() => {
    setVacancy(props.vacancy as Nullable<IVacancy>)

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
      console.log('DeleteReq1')
      appContext.showModal(ModalType.Confirm, {
        text: `Вы уверены что хотите удалить вакансию «${vacancy?.header}» ?`,
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
  const value: IState = {
    ...defaultValue,
    vacancy,
    vacancyId: props.vacancyId,
    editLoading,
    loading,
    deleteLoading,
    fetch,
    update,
    delete: deleteRequest,
    create,
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
