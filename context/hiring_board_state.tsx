import {createContext, useContext, useEffect, useRef, useState} from 'react'
import {IVacancyWithHiringStages} from '@/data/interfaces/IVacancy'
import {DeepPartial, Nullable, RequestError} from '@/types/types'
import {useAppContext} from '@/context/state'
import {ModalType, SnackbarType} from '@/types/enums'
import {ConfirmModalArguments} from '@/types/modal_arguments'
import HiringBoardRepository from '@/data/repositories/HiriginBoardRepository'
import VacancyOwnerRepository from '@/data/repositories/VacancyOwnerRepository'
import IHiringStage, {IHiringStageWithApply} from '@/data/interfaces/IHiringStage'
import {ICVWithApply} from '@/data/interfaces/ICV'
import {omit} from '@/utils/omit'
type AppliesByStages = {[key: number]: ICVWithApply[]}
interface IState {
  vacancyId: number | undefined,
  vacancy: Nullable<IVacancyWithHiringStages>,
  deleteLoading: boolean,
  publishLoading: boolean,
  loading: boolean
  editLoading: boolean,
  appliesByStages: AppliesByStages,
  hiringStages: IHiringStageWithApply[],
  fetch: () => Promise<Nullable<IVacancyWithHiringStages>>
  delete: () => Promise<Nullable<IVacancyWithHiringStages>>,
  updateHiringStages: (data: DeepPartial<IHiringStage>[]) => Promise<Nullable<IVacancyWithHiringStages>>,
  moveHiringStage: (stageId: number, toIndex: number) => Promise<void>
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
  appliesByStages: {},
  hiringStages: [],
  fetch: async () => null,
  delete: async () => null,
  updateHiringStages: async (data: DeepPartial<IHiringStage>[]) => null,
  createHiringStage: async (data: DeepPartial<IHiringStage>) => null,
  deleteHiringStage: async (data: IHiringStage) => null,
  moveToStage: async (cv: ICVWithApply, hiringStageId: number) => {},
  moveHiringStage: async (stageId: number, toIndex: number) => {}
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
  const [appliesByStages, setAppliesByStages] = useState<AppliesByStages>({})
  const appliesByStagesRef = useRef<AppliesByStages>({})
  const [hiringStages, setHiringStages] = useState<IHiringStageWithApply[]>([])
  const hiringStagesRef = useRef<IHiringStageWithApply[]>([])

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
      const vacancy = res.data[0]
      setVacancy(vacancy)
      const appliesByStages = vacancy.hiringStages.reduce((ac, a) => ({
        ...ac,
        [a.id!]: [...a.applications.map(i => ({...i.cv, applications: [omit(i, ['cv'])] }) as ICVWithApply), ...a.proposals.map(i => ({...i.cv, proposals: [omit(i, ['cv'])] }) as ICVWithApply)]
      }), {} as AppliesByStages)
      appliesByStagesRef.current = appliesByStages
      setAppliesByStages(appliesByStages)
      hiringStagesRef.current = vacancy.hiringStages
      setHiringStages(vacancy.hiringStages)
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
      console.log('vacancy?.hiringStages,', vacancy?.hiringStages, data)
      const toUpdate = [...(vacancy?.hiringStages!.filter((i) => i.key !==  'offer') ?? []), data, vacancy?.hiringStages!.find((i) => i.key ===  'offer')]
      const res = await VacancyOwnerRepository.update(props.vacancyId, {hiringStages:toUpdate})
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
        if(!oldHiringStageId){
          return
        }
      const application = cv.applications?.length > 0 ? cv.applications[0] : null
      const proposal = cv.proposals?.length > 0 ? cv.proposals[0] : null
      const newAppliesByStages: AppliesByStages = {...appliesByStagesRef.current,
        [oldHiringStageId]: appliesByStagesRef.current[oldHiringStageId].filter(i => i.id !== cv.id),
        [hiringStageId]: !appliesByStagesRef.current[hiringStageId].find(i => i.id === cv.id) ?
          [...appliesByStagesRef.current[hiringStageId], {
            ...cv,
            ...(application ? {applications: [{...application, hiringStageId}]} : {}),
            ...(proposal ? {proposals: [{...proposal, hiringStageId}]} : {})} ]
           : appliesByStagesRef.current[hiringStageId]
      }
      console.log('DrageResult1', newAppliesByStages)
      setAppliesByStages(newAppliesByStages)
      const res = await HiringBoardRepository.moveToStage({
        ...(cv?.applications?.length > 0 ? {applicationId: cv?.applications[0].id} : {}),
        ...(cv?.proposals?.length > 0 ? {proposalId: cv?.proposals[0].id} : {}),
        hiringStageId,
      })
      await fetch()
      /*
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


       */
      appliesByStagesRef.current = newAppliesByStages
    } catch (err) {
      setAppliesByStages(appliesByStagesRef.current)
      if (err instanceof RequestError) {
        appContext.showSnackbar(err.message, SnackbarType.error)
      }
    }
    setEditLoading(false)
  }
  const moveHiringStage = async (stageId: number, toIndex: number) => {
      const currentHiringStageIndex = vacancy?.hiringStages.findIndex(i => i.id === stageId)
    if(!currentHiringStageIndex){
      return
    }
    const currentHiringStages = [...vacancy?.hiringStages!]
    currentHiringStages.splice(toIndex,0,currentHiringStages.splice(currentHiringStageIndex,1)[0])
    const toUpdate = currentHiringStages.map((i, index) => ({...i, order: index}))
     setHiringStages(toUpdate)
    try {
      setEditLoading(true)
      const res = await VacancyOwnerRepository.update(props.vacancyId, {hiringStages: toUpdate})
      const newVacancy = await fetch()
      setEditLoading(false)
    } catch (err) {
      setHiringStages(hiringStagesRef.current)
      if (err instanceof RequestError) {
        appContext.showSnackbar(err.message, SnackbarType.error)
      }
    }

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
    moveToStage,
    appliesByStages,
    hiringStages,
    moveHiringStage,
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
