import {createContext, useContext, useEffect, useState} from 'react'
import {IOffice} from '@/data/interfaces/IOffice'
import {DeepPartial, Nullable, RequestError} from '@/types/types'
import {useAppContext} from '@/context/state'
import {ModalType, SnackbarType} from '@/types/enums'
import OfficeOwnerRepository from '@/data/repositories/OfficeOwnerRepository'
import {ConfirmModalArguments} from '@/types/modal_arguments'
import useTranslation from 'next-translate/useTranslation'
import showToast from '@/utils/showToast'

interface IState {
  officeId?: Nullable<number> | undefined
  office: Nullable<IOffice>,
  deleteLoading: boolean,
  loading: boolean
  editLoading: boolean,
  fetch: () => Promise<Nullable<IOffice>>
  delete: () => Promise<Nullable<IOffice>>,
  edit: () => void,
  update: (data: DeepPartial<IOffice>) => Promise<Nullable<IOffice>>,
  create: (data: DeepPartial<IOffice>) => Promise<Nullable<IOffice>>,

}

const defaultValue: IState = {
  officeId: 0,
  office: null,
  deleteLoading: false,
  loading: false,
  editLoading: false,
  fetch: async () => null,
  delete: async () => null,
  edit: () => null,
  update: async (data) => null,
  create: async (data: DeepPartial<IOffice>) => null,
}

const OfficeOwnerContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode,
  officeId?: Nullable<number> | undefined,
  office?: Nullable<IOffice>,
}

export function OfficeOwnerWrapper(props: Props) {
  const appContext = useAppContext()
  const { t } = useTranslation()
  const [office, setOffice] = useState<Nullable<IOffice>>(props.office as Nullable<IOffice>)
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [editLoading, setEditLoading] = useState<boolean>(false)
  useEffect(() => {
    setOffice(props.office as Nullable<IOffice>)

  }, [props.office])
  const fetch = async (): Promise<Nullable<IOffice>> => {
    const res = await OfficeOwnerRepository.fetchById(props.officeId!)
    setOffice(res)
    return res
  }

  useEffect(() => {
    if (!props.office && props.officeId) {
      setLoading(true)
      fetch().then((i) => setLoading(false))
    }
  }, [props.officeId, props.office])
  const handleUpdate = (entity: IOffice) => {
    appContext.officeUpdateState$.next(entity)
  }
  const handleDelete = (entity: IOffice) => {
    appContext.officeDeleteState$.next(entity)
  }
  const handleCreate = (entity: IOffice) => {
    appContext.officeCreateState$.next(entity)
  }

  const create = async (data: DeepPartial<IOffice>): Promise<Nullable<IOffice>> => {
    try {
      setEditLoading(true)
      const res = await OfficeOwnerRepository.create(data)
      setOffice(res)
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

  const update = async (data: DeepPartial<IOffice>): Promise<Nullable<IOffice>> => {
    try {
      setEditLoading(true)
      const res = await OfficeOwnerRepository.update(props.officeId!, data)
      handleUpdate(res)
      setOffice(i => ({...i, ...res}))
      setEditLoading(false)
      return res
    } catch (err) {

      setEditLoading(false)
      throw err
    }
  }

  const deleteRequest = async (): Promise<Nullable<IOffice>> => {

    return new Promise<Nullable<IOffice>>((resolve, reject) => {
      appContext.showModal(ModalType.Confirm, {
        title: t('confirm_office_delete_title', {name: office?.name}),
        text: t('confirm_office_delete_desc', {name: office?.name}),
         onConfirm: async () => {
          try {
            appContext.hideModal()
            setDeleteLoading(true)
            const res = await OfficeOwnerRepository.delete(props.officeId!)
            handleDelete(office!)
            resolve(office)
            showToast({title: t('toast_office_deleted_title'), text: t('toast_office_deleted_desc')})
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
    office,
    officeId: props.officeId,
    editLoading,
    loading,
    deleteLoading,
    fetch,
    update,
    delete: deleteRequest,
    create,
  }
  return (
    <OfficeOwnerContext.Provider value={value}>
      {props.children}
    </OfficeOwnerContext.Provider>
  )
}

export function useOfficeOwnerContext() {
  return useContext(OfficeOwnerContext)
}
