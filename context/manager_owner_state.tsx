import {createContext, useContext, useEffect, useState} from 'react'
import { Nullable, RequestError} from '@/types/types'
import {useAppContext} from '@/context/state'
import {ModalType, SnackbarType} from '@/types/enums'
import {ConfirmModalArguments} from '@/types/modal_arguments'
import UserUtils from '@/utils/UserUtils'
import {IManagerCreateRequest} from '@/data/interfaces/IManagerCreateRequest'
import {IManager} from '@/data/interfaces/IManager'
import ManagerOwnerRepository from '@/data/repositories/ManagerOwnerRepository'

interface IState {
  managerId: Nullable<string> | undefined,
  manager: Nullable<IManager>,
  deleteLoading: boolean,
  loading: boolean
  editLoading: boolean,
  fetch: () => Promise<Nullable<IManager>>
  delete: () => Promise<Nullable<IManager>>,
  deleteFromFarmRequest: (farmId: number) => Promise<Nullable<IManager>>,
  deleteRequest: () => Promise<Nullable<IManager>>,
  edit: () => void,
  update: (data: IManagerCreateRequest) => Promise<Nullable<IManager>>,
  create: (data: IManagerCreateRequest) => Promise<Nullable<IManager>>,

}

const defaultValue: IState = {
  managerId: null,
  manager: null,
  deleteLoading: false,
  loading: false,
  editLoading: false,
  fetch: async () => null,
  delete: async () => null,
  deleteFromFarmRequest: async (farmId: number) => null,
  deleteRequest: async () => null,
  edit: () => null,
  update: async (data) => null,
  create: async (data) => null,
}

const ManagerOwnerContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode,
  managerId: Nullable<string> | undefined,
  manager?: Nullable<IManager>,
}

export function ManagerOwnerWrapper(props: Props) {
  const appContext = useAppContext()
  const [manager, setManager] = useState<Nullable<IManager>>(props.manager as Nullable<IManager>)
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [editLoading, setEditLoading] = useState<boolean>(false)
  useEffect(() => {
    setManager(props.manager as Nullable<IManager>)

  }, [props.manager])
  const fetch = async (): Promise<Nullable<IManager>> => {
    const res = await ManagerOwnerRepository.fetchById(props.managerId!)
    setManager(res)
    return res
  }

  useEffect(() => {
    if (!props.manager && props.managerId) {
      setLoading(true)
      fetch().then((i) => setLoading(false))
    }
  }, [props.managerId, props.manager])
  const handleUpdate = (entity: IManager) => {
    appContext.managerUpdateState$.next(entity)
  }
  const handleDelete = (entity: IManager) => {
    appContext.managerDeleteState$.next(entity)
  }
  const handleCreate = (entity: IManager) => {
    appContext.managerCreateState$.next(entity)
  }

  const create = async (data: IManagerCreateRequest): Promise<Nullable<IManager>> => {
    try {
      setEditLoading(true)
      const res = await ManagerOwnerRepository.create(data)
      setManager(res)
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

  const update = async (data: IManagerCreateRequest): Promise<Nullable<IManager>> => {
    try {
      setEditLoading(true)
      const res = await ManagerOwnerRepository.update(props.managerId!, data)
      handleUpdate(res)
      setManager(i => ({...i, ...res}))
      setEditLoading(false)
      return res
    } catch (err) {

      setEditLoading(false)
      throw err
    }
  }

  const deleteConfirm = async (): Promise<Nullable<IManager>> => {

    return new Promise<Nullable<IManager>>((resolve, reject) => {
      appContext.showModal(ModalType.Confirm, {
        text: `Вы уверены что хотите удалить сотрудника «${UserUtils.getName(manager) || manager?.email}» ?`,
        onConfirm: async () => {
          try {
            appContext.hideModal()
            setDeleteLoading(true)
            const res = await ManagerOwnerRepository.delete(props.managerId!)
            handleDelete(manager!)
            resolve(manager)
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



  const deleteRequest = async (): Promise<Nullable<IManager>> => {
    try {
      setDeleteLoading(true)
      const res = await ManagerOwnerRepository.delete(props.managerId!)
      handleDelete(manager!)

    } catch (err) {
      if (err instanceof RequestError) {
        appContext.showSnackbar(err.message, SnackbarType.error)
      }
    }
    setDeleteLoading(false)
    return null
  }

  const value: IState = {
    ...defaultValue,
    manager,
    managerId: props.managerId,
    editLoading,
    loading,
    deleteLoading,
    fetch,
    update,
    delete: deleteConfirm,
    deleteRequest,
    create,
  }
  return (
    <ManagerOwnerContext.Provider value={value}>
      {props.children}
    </ManagerOwnerContext.Provider>
  )
}

export function useManagerOwnerContext() {
  return useContext(ManagerOwnerContext)
}
