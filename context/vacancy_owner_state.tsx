import {createContext, useContext, useEffect, useState} from 'react'
import {IVacancy} from '@/data/interfaces/IVacancy'
import {DeepPartial, Nullable, RequestError} from '@/types/types'
import {useAppContext} from '@/context/state'
import {ModalType, SidePanelType, SnackbarType} from '@/types/enums'
import VacancyRepository from '@/data/repositories/VacancyRepository'
import {ConfirmModalArguments} from '@/types/modal_arguments'
import {PublishStatus} from '@/data/enum/PublishStatus'
import {JobReviewSidePanelArguments} from '@/types/side_panel_arguments'
import useTranslation from 'next-translate/useTranslation'
import showToast from '@/utils/showToast'

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
  const { t } = useTranslation()
  useEffect(() => {
    setVacancy(props.vacancy as Nullable<IVacancy>)
    setLoading(false)

  }, [props.vacancy])
  const fetch = async (): Promise<Nullable<IVacancy>> => {
    const res = await VacancyRepository.fetchById(props.vacancyId!)
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
      const res = await VacancyRepository.create(data)
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
      const res = await VacancyRepository.update(props.vacancyId!, data)
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
        title: t('confirm_job_delete_title', {name: vacancy?.name}),
        text: t('confirm_job_delete_desc', {name: vacancy?.name}),
        onConfirm: async () => {
          try {
            appContext.hideModal()
            setDeleteLoading(true)
            const res = await VacancyRepository.delete(props.vacancyId!)
            handleDelete(vacancy!)
            resolve(vacancy)
            showToast({title: t('toast_vacancy_deleted_title'), text: t('toast_vacancy_deleted_desc')})
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
      const res = await VacancyRepository.update(props.vacancyId!, {status})
      handleUpdate({...vacancy, status} as IVacancy)
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
        title: t('confirm_job_publish_title', {name: vacancy?.name}),
        text: t('confirm_job_publish_desc', {name: vacancy?.name}),
        onConfirm: async () => {
          await updateStatusRequest(PublishStatus.Published)
          appContext.hideModal()
          showToast({title: t('toast_vacancy_published_title'), text: t('toast_vacancy_published_desc')})
        }
      } as ConfirmModalArguments)
    })
  }

  const pause = async (): Promise<Nullable<IVacancy>> => {
    return new Promise<Nullable<IVacancy>>((resolve, reject) => {
      appContext.showModal(ModalType.Confirm, {
        title: t('confirm_job_pause_title', {name: vacancy?.name}),
        text: t('confirm_job_pause_desc', {name: vacancy?.name}),
        onConfirm: async () => {
          await updateStatusRequest(PublishStatus.Paused)
          appContext.hideModal()
          showToast({title: t('toast_vacancy_paused_title'), text: t('toast_vacancy_paused_desc')})
        }
      } as ConfirmModalArguments)
    })
  }

  const close = async (): Promise<Nullable<IVacancy>> => {
    return new Promise<Nullable<IVacancy>>((resolve, reject) => {
      appContext.showModal(ModalType.Confirm, {
        title: t('confirm_job_close_title', {name: vacancy?.name}),
        text: t('confirm_job_close_desc', {name: vacancy?.name}),
        onConfirm: async () => {
          await updateStatusRequest(PublishStatus.Closed)
          showToast({title: t('toast_vacancy_closed_title'), text: t('toast_vacancy_closed_desc')})
          appContext.hideModal()
          appContext.showSidePanel(SidePanelType.JobReview, {vacancyId: vacancy!.id} as JobReviewSidePanelArguments)

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
