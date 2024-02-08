import {createContext, useContext, useEffect, useState} from 'react'
import {DeepPartial, Nullable, RequestError} from '@/types/types'
import {useAppContext} from '@/context/state'
import {ModalType, SnackbarType} from '@/types/enums'
import {ConfirmModalArguments} from '@/types/modal_arguments'
import useTranslation from 'next-translate/useTranslation'
import showToast from '@/utils/showToast'
import {IIntegrationProfile} from '@/data/interfaces/IIntegrationProfile'
import IntegrationProfileOwnerRepository from '@/data/repositories/IntegrationProfileOwnerRepository'

interface IState {
  integrationId?: Nullable<number> | undefined
  integration: Nullable<IIntegrationProfile>,
  deleteLoading: boolean,
  loading: boolean
  editLoading: boolean,
  fetch: () => Promise<Nullable<IIntegrationProfile>>
  delete: () => Promise<Nullable<IIntegrationProfile>>,
  edit: () => void,
  update: (data: DeepPartial<IIntegrationProfile>) => Promise<Nullable<IIntegrationProfile>>,
  create: (data: DeepPartial<IIntegrationProfile>) => Promise<Nullable<IIntegrationProfile>>,

}

const defaultValue: IState = {
  integrationId: 0,
  integration: null,
  deleteLoading: false,
  loading: false,
  editLoading: false,
  fetch: async () => null,
  delete: async () => null,
  edit: () => null,
  update: async (data) => null,
  create: async (data: DeepPartial<IIntegrationProfile>) => null,
}

const IntegrationOwnerContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode,
  integrationId?: Nullable<number> | undefined,
  integration?: Nullable<IIntegrationProfile>,
}

export function IntegrationOwnerWrapper(props: Props) {
  const appContext = useAppContext()
  const { t } = useTranslation()
  const [integration, setIntegration] = useState<Nullable<IIntegrationProfile>>(props.integration as Nullable<IIntegrationProfile>)
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [editLoading, setEditLoading] = useState<boolean>(false)
  useEffect(() => {
    setIntegration(props.integration as Nullable<IIntegrationProfile>)

  }, [props.integration])
  const fetch = async (): Promise<Nullable<IIntegrationProfile>> => {
    const res = await IntegrationProfileOwnerRepository.fetchById(props.integrationId!)
    setIntegration(res)
    return res
  }

  useEffect(() => {
    if (!props.integration && props.integrationId) {
      setLoading(true)
      fetch().then((i) => setLoading(false))
    }
  }, [props.integrationId, props.integration])
  const handleUpdate = (entity: IIntegrationProfile) => {
    appContext.integrationUpdateState$.next(entity)
  }
  const handleDelete = (entity: IIntegrationProfile) => {
    appContext.integrationDeleteState$.next(entity)
  }
  const handleCreate = (entity: IIntegrationProfile) => {
    appContext.integrationCreateState$.next(entity)
  }

  const create = async (data: DeepPartial<IIntegrationProfile>): Promise<Nullable<IIntegrationProfile>> => {
    try {
      setEditLoading(true)
      const res = await IntegrationProfileOwnerRepository.create(data)
      setIntegration(res)
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

  const update = async (data: DeepPartial<IIntegrationProfile>): Promise<Nullable<IIntegrationProfile>> => {
    try {
      setEditLoading(true)
      const res = await IntegrationProfileOwnerRepository.update(props.integrationId!, data)
      handleUpdate(res)
      setIntegration(i => ({...i, ...res}))
      setEditLoading(false)
      return res
    } catch (err) {

      setEditLoading(false)
      throw err
    }
  }

  const deleteRequest = async (): Promise<Nullable<IIntegrationProfile>> => {

    return new Promise<Nullable<IIntegrationProfile>>((resolve, reject) => {
      appContext.showModal(ModalType.Confirm, {
        title: t('confirm_integration_delete_title', {name: integration?.platform}),
        text: t('confirm_integration_delete_desc', {name: integration?.platform}),
         onConfirm: async () => {
          try {
            appContext.hideModal()
            setDeleteLoading(true)
            const res = await IntegrationProfileOwnerRepository.delete(props.integrationId!)
            handleDelete(integration!)
            resolve(integration)
            showToast({title: t('toast_integration_deleted_title'), text: t('toast_integration_deleted_desc')})
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
    integration,
    integrationId: props.integrationId,
    editLoading,
    loading,
    deleteLoading,
    fetch,
    update,
    delete: deleteRequest,
    create,
  }
  return (
    <IntegrationOwnerContext.Provider value={value}>
      {props.children}
    </IntegrationOwnerContext.Provider>
  )
}

export function useIntegrationOwnerContext() {
  return useContext(IntegrationOwnerContext)
}
