import {createContext, useContext, useEffect, useState} from 'react'
import {ICompany} from '@/data/interfaces/ICompany'
import CompanyOwnerRepository from '@/data/repositories/CompanyOwnerRepository'
import {DeepPartial, Nullable, RequestError} from '@/types/types'
import {useAppContext} from '@/context/state'
import {ModalType, SnackbarType} from '@/types/enums'
import {ConfirmModalArguments} from '@/types/modal_arguments'

interface IState {
  companyId: number,
  company: Nullable<ICompany>,
  deleteLoading: boolean,
  publishLoading: boolean,
  loading: boolean
  editLoading: boolean,
  fetch: () => Promise<Nullable<ICompany>>
  delete: () => Promise<Nullable<ICompany>>,
  edit: () => void,
  editRequest: (data: DeepPartial<ICompany>) => Promise<Nullable<ICompany>>,
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
  edit: () => null,
  editRequest: async (data) => null
}

const CompanyOwnerContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode,
  companyId: number,
  company?: Nullable<ICompany>,
}

export function CompanyOwnerWrapper(props: Props) {
  const appContext = useAppContext()
  const [items, setItems] = useState<ICompany[]>([])
  const [company, setCompany] = useState<Nullable<ICompany>>(props.company as Nullable<ICompany>)
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false)
  const [publishLoading, setPublishLoading] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [editLoading, setEditLoading] = useState<boolean>(false)
  useEffect(() => {
    setCompany(props.company as Nullable<ICompany>)

  }, [props.company])
  const fetch = async (): Promise<Nullable<ICompany>> => {
    const res = await CompanyOwnerRepository.fetch()
    if((res?.length ?? 0) === 0){
      return null
    }
    setCompany(res[0])
    return res[0]
  }
  useEffect(() => {
    if (!props.company && props.companyId) {
      setLoading(true)
      fetch().then((i) => setLoading(false))
    }
  }, [props.companyId, props.company])
  const handleUpdate = (entity: ICompany) => {
    appContext.companyUpdateState$.next(entity)
  }
  const handleDelete = (entity: ICompany) => {
    appContext.companyDeleteState$.next(entity)
  }


  const editRequest = async (data: DeepPartial<ICompany>): Promise<Nullable<ICompany>> => {
    try {
      setEditLoading(true)
      const res = await CompanyOwnerRepository.update(props.companyId, data)
      setCompany(i => ({...i, ...res}))
      setEditLoading(false)
      return res
    } catch (err) {

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
            const res = await CompanyOwnerRepository.delete(props.companyId)
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
    editRequest,
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
