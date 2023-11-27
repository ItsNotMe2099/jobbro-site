import {createContext, useContext, useEffect, useState} from 'react'
import {DeepPartial, Nullable, RequestError} from '@/types/types'
import {useAppContext} from '@/context/state'
import { SnackbarType} from '@/types/enums'
import {IProposal} from '@/data/interfaces/IProposal'
import {IApplication} from '@/data/interfaces/IApplication'
import CvUtils from '@/utils/CvUtils'
import {ICVWithApply} from '@/data/interfaces/ICV'
import HiringBoardRepository from '@/data/repositories/HiriginBoardRepository'

interface IState {
  cv: Nullable<ICVWithApply>,
  apply: Nullable<IProposal | IApplication>
  deleteLoading: boolean,
  loading: boolean
  editLoading: boolean
  moveToStage:  (hiringStageId: number) => Promise<void>,
}

const defaultValue: IState = {
  cv: null,
  apply: null,
  deleteLoading: false,
  loading: false,
  editLoading: false,
  moveToStage: async (hiringStageId: number) => {},
}

const ApplyCvContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode,
  cv: Nullable<ICVWithApply>,
}

export function ApplyCvWrapper(props: Props) {
  const appContext = useAppContext()
  const [cv, setCv] = useState<Nullable<ICVWithApply>>(props.cv as Nullable<ICVWithApply>)
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [editLoading, setEditLoading] = useState<boolean>(false)
  useEffect(() => {
    setCv(props.cv as Nullable<ICVWithApply>)
    setLoading(false)
  }, [props.cv])

  const handleUpdate = (entity: DeepPartial<ICVWithApply>) => {
    appContext.cvApplyUpdateState$.next({...cv, ...entity} as ICVWithApply)
  }

  const moveToStage = async (hiringStageId: number) =>{
    try {
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
      setCv(cv => ({...cv, ...newCvData} as ICVWithApply))
      handleUpdate(newCvData)
    } catch (err) {
      if (err instanceof RequestError) {
        appContext.showSnackbar(err.message, SnackbarType.error)
      }
    }
    setEditLoading(false)
  }
  const value: IState = {
    ...defaultValue,
    cv,
    apply: CvUtils.getProposalOrApplicationFromCv(cv),
    loading,
    deleteLoading,
    editLoading,
    moveToStage,
  }
  return (
    <ApplyCvContext.Provider value={value}>
      {props.children}
    </ApplyCvContext.Provider>
  )
}

export function useApplyCvContext() {
  return useContext(ApplyCvContext)
}
