import {createContext, useContext, useEffect, useState} from 'react'
import {IVacancyWithHiringStages} from '@/data/interfaces/IVacancy'
import {DeepPartial, Nullable, RequestError} from '@/types/types'
import {useAppContext} from '@/context/state'
import {ModalType, SnackbarType} from '@/types/enums'
import {ConfirmModalArguments} from '@/types/modal_arguments'
import HiringBoardRepository from '@/data/repositories/HiriginBoardRepository'
import VacancyOwnerRepository from '@/data/repositories/VacancyOwnerRepository'
import IHiringStage from '@/data/interfaces/IHiringStage'
import {ICVWithApply} from '@/data/interfaces/ICV'

interface IState {
  vacancyId: number | undefined,
  vacancy: Nullable<IVacancyWithHiringStages>,
  deleteLoading: boolean,
  publishLoading: boolean,
  loading: boolean
  editLoading: boolean,
  fetch: () => Promise<Nullable<IVacancyWithHiringStages>>
  delete: () => Promise<Nullable<IVacancyWithHiringStages>>,
  updateHiringStages: (data: DeepPartial<IHiringStage>[]) => Promise<Nullable<IVacancyWithHiringStages>>,
  createHiringStage: (data: DeepPartial<IHiringStage>) => Promise<Nullable<IVacancyWithHiringStages>>,
  deleteHiringStage: (data: IHiringStage) => Promise<Nullable<IVacancyWithHiringStages>>,
  moveToStage: (cv: ICVWithApply, hiringStageId: number) => Promise<void>
}

const defaultValue: IState = {
  vacancyId: 0,
  vacancy: null,
  deleteLoading: false,
  publishLoading: false,
  loading: false,
  editLoading: false,
  fetch: async () => null,
  delete: async () => null,
  updateHiringStages: async (data: DeepPartial<IHiringStage>[]) => null,
  createHiringStage: async (data: DeepPartial<IHiringStage>) => null,
  deleteHiringStage: async (data: IHiringStage) => null,
  moveToStage: async (cv: ICVWithApply, hiringStageId: number) => {}
}

const HiringBoardContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode,
  vacancyId: number,
  vacancy?: Nullable<IVacancyWithHiringStages> | undefined
}

export function HiringBoardWrapper(props: Props) {
  const appContext = useAppContext()
  const [vacancy, setVacancy] = useState<Nullable<IVacancyWithHiringStages>>(props.vacancy ?? null)
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false)
  const [publishLoading, setPublishLoading] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [editLoading, setEditLoading] = useState<boolean>(false)
  useEffect(() => {
    setVacancy(props.vacancy as Nullable<IVacancyWithHiringStages>)
    setLoading(false)
  }, [props.vacancy])
  const fetch = async (): Promise<Nullable<IVacancyWithHiringStages>> => {
    try {
      const res = await HiringBoardRepository.fetchByVacancyId(props.vacancyId)
      if ((res.data?.length ?? 0) === 0) {
        return null
      }
      setVacancy(res.data[0])
      return res.data[0]
    }catch (e) {
      console.error(e)
      return null
    }
  }
  useEffect(() => {
    if (!props.vacancy) {
      setLoading(true)
      fetch().then((i) => setLoading(false))
    }
  }, [props.vacancyId, props.vacancy])



  const createHiringStage = async (data:  DeepPartial<IHiringStage>): Promise<Nullable<IVacancyWithHiringStages>> => {
    try {
      setEditLoading(true)
      const res = await VacancyOwnerRepository.update(props.vacancyId, {hiringStages: [...vacancy?.hiringStages, ...data]})
      const newVacancy = await fetch()
      setEditLoading(false)
      return newVacancy
    } catch (err) {
      if (err instanceof RequestError) {
        appContext.showSnackbar(err.message, SnackbarType.error)
      }
      setEditLoading(false)
      throw err
    }
  }
  const updateHiringStages = async (data: DeepPartial<IHiringStage>[]): Promise<Nullable<IVacancyWithHiringStages>> => {
    try {
      setEditLoading(true)
      const res = await VacancyOwnerRepository.update(props.vacancyId, {hiringStages: data})
      const newVacancy = await fetch()
      setEditLoading(false)
      return newVacancy
    } catch (err) {
      if (err instanceof RequestError) {
        appContext.showSnackbar(err.message, SnackbarType.error)
      }
      setEditLoading(false)
      throw err
    }
  }
  const deleteHiringStage = async (hiringStage: IHiringStage): Promise<Nullable<IVacancyWithHiringStages>> => {
    return new Promise<Nullable<IVacancyWithHiringStages>>((resolve, reject) => {
      appContext.showModal(ModalType.Confirm, {
        text: `Are what you want to delete hiring stage «${hiringStage?.title}» ?`,
        onConfirm: async () => {
          try {
            appContext.hideModal()
            setDeleteLoading(true)
            const res = await VacancyOwnerRepository.update(props.vacancyId, {hiringStages: vacancy!.hiringStages.filter(i => i.id !== hiringStage.id)})
            const newVacancy = await fetch()
            resolve(newVacancy)
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

  const moveToStage = async (cv: ICVWithApply, hiringStageId: number) =>{
    try {
      const oldHiringStageId =  cv?.applications.length > 0?  cv?.applications[0].hiringStageId : cv.proposals?.length > 0 ? cv?.proposals[0].hiringStageId : null
      setEditLoading(true)
      const res = await HiringBoardRepository.moveToStage({
        ...(cv?.applications?.length > 0 ? {applicationId: cv?.applications[0].id} : {}),
        ...(cv?.proposals?.length > 0 ? {proposalId: cv?.proposals[0].id} : {}),
        hiringStageId,
      })

      const newCvData: DeepPartial<ICVWithApply> = {...cv,
        ...(cv?.applications?.length > 0 ? {applications: cv?.applications?.map(i => ({...i, hiringStageId}))} : {}),
        ...(cv?.proposals?.length > 0 ? {proposals: cv?.proposals?.map(i => ({...i, hiringStageId}))} : {})
      }

      const application = cv.applications?.length > 0 ? cv.applications[0] : null
      const proposal = cv.proposals?.length > 0 ? cv.proposals[0] : null
      setVacancy({...vacancy,
        hiringStages: vacancy?.hiringStages.map((i) => i.id === oldHiringStageId ? ({
          ...i,
          applications: i.applications.filter(i => i.cvId !== cv.id),
          proposals: i.proposals.filter(i => i.cvId !== cv.id)}) : (
            i.id === hiringStageId ? ({...i,
              ...(application && !i.applications.find(i => i.id === application.id) ? {applications: [...i.applications, application ]} : {}),
              ...(proposal && !i.proposals.find(i => i.id === proposal.id) ? {proposals: [...i.proposals, proposal ]} : {})
            }) : i)
        )} as IVacancyWithHiringStages)

    } catch (err) {
      if (err instanceof RequestError) {
        appContext.showSnackbar(err.message, SnackbarType.error)
      }
    }
    setEditLoading(false)
  }
  const value: IState = {
    ...defaultValue,
    vacancy,
    vacancyId: props.vacancyId,
    publishLoading,
    editLoading,
    loading,
    deleteLoading,
    fetch,
    updateHiringStages,
    createHiringStage,
    deleteHiringStage,
    moveToStage
  }
  return (
    <HiringBoardContext.Provider value={value}>
      {props.children}
    </HiringBoardContext.Provider>
  )
}

export function useHiringBoardContext() {
  return useContext(HiringBoardContext)
}
