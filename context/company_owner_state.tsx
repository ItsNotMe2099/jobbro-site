import {createContext, useContext, useEffect, useState} from 'react'
import {ICompany} from '@/data/interfaces/ICompany'
import CompanyOwnerRepository from '@/data/repositories/CompanyOwnerRepository'
import {DeepPartial, Nullable, RequestError} from '@/types/types'
import {useAppContext} from '@/context/state'
import {ModalType, SnackbarType} from '@/types/enums'
import {ConfirmModalArguments} from '@/types/modal_arguments'

interface IState {
  companyId: number | undefined,
  company: Nullable<ICompany>,
  deleteLoading: boolean,
  publishLoading: boolean,
  loading: boolean
  editLoading: boolean,
  fetch: () => Promise<Nullable<ICompany>>
  delete: () => Promise<Nullable<ICompany>>,
  update: (data: DeepPartial<ICompany>) => Promise<Nullable<ICompany>>,
  create: (data: DeepPartial<ICompany>) => Promise<Nullable<ICompany>>,

}

const defaultValue: IState = {
  companyId: 0,
  company: null,
  deleteLoading: false,
  publishLoading: false,
  loading: false,
  editLoading: false,
  fetch: async () => null,
  delete: async () => null,
  update: async (data) => null,
  create: async (data: DeepPartial<ICompany>) => null,

}

const CompanyOwnerContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode,
  companyId?: number,
  company?: Nullable<ICompany>,
}

export function CompanyOwnerWrapper(props: Props) {
  const appContext = useAppContext()
  const [company, setCompany] = useState<Nullable<ICompany>>(props.company as Nullable<ICompany>)
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false)
  const [publishLoading, setPublishLoading] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [editLoading, setEditLoading] = useState<boolean>(false)
  useEffect(() => {
    setCompany(props.company as Nullable<ICompany>)
    setLoading(false)
  }, [props.company])
  const fetch = async (): Promise<Nullable<ICompany>> => {
    try {
      const res = await CompanyOwnerRepository.fetch()
      if ((res?.length ?? 0) === 0) {
        return null
      }
      setCompany(res[0])
      return res[0]
    }catch (e) {
      console.error(e)
      return null
    }
  }
  useEffect(() => {
    if (!props.company) {
      setLoading(true)
      fetch().then((i) => setLoading(false))
    }
  }, [props.companyId, props.company])
  const handleUpdate = (entity: ICompany) => {
    appContext.companyUpdateState$.next(entity)
  }
  const handleCreate = (entity: ICompany) => {
    appContext.companyCreateState$.next(entity)
  }
  const handleDelete = (entity: ICompany) => {
    appContext.companyDeleteState$.next(entity)
  }


  const create = async (data: DeepPartial<ICompany>): Promise<Nullable<ICompany>> => {
    try {
      setEditLoading(true)
      const res = await CompanyOwnerRepository.create(data)
      setCompany(res)
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
  const update = async (data: DeepPartial<ICompany>): Promise<Nullable<ICompany>> => {
    try {
      setEditLoading(true)
      const res = await CompanyOwnerRepository.update(company!.id, data)
      setCompany(res)
      handleUpdate(res)
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
  const deleteRequest = async (): Promise<Nullable<ICompany>> => {
    return new Promise<Nullable<ICompany>>((resolve, reject) => {
      appContext.showModal(ModalType.Confirm, {
        text: `Вы уверены что хотите удалить пункт приема «${company?.name}» ?`,
        onConfirm: async () => {
          try {
            appContext.hideModal()
            setDeleteLoading(true)
            const res = await CompanyOwnerRepository.delete(props.company!.id!)
            handleDelete(company!)
            resolve(company)
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
    company,
    companyId: props.companyId,
    publishLoading,
    editLoading,
    loading,
    deleteLoading,
    fetch,
    update,
    create,
    delete: deleteRequest,
  }
  return (
    <CompanyOwnerContext.Provider value={value}>
      {props.children}
    </CompanyOwnerContext.Provider>
  )
}

export function useCompanyOwnerContext() {
  return useContext(CompanyOwnerContext)
}
