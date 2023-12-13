import {createContext, useContext, useEffect, useState} from 'react'
import {ICandidate} from '@/data/interfaces/ICandidate'
import CandidateRepository from '@/data/repositories/CandidateRepository'
import { Nullable, RequestError} from '@/types/types'
import {useAppContext} from '@/context/state'
import {ModalType, SnackbarType} from '@/types/enums'
import {ConfirmModalArguments} from '@/types/modal_arguments'

interface IState {
  candidateId: number | undefined,
  candidate: Nullable<ICandidate>,
  deleteLoading: boolean,
  loading: boolean
  fetch: () => Promise<Nullable<ICandidate>>
  delete: () => Promise<Nullable<ICandidate>>,
}

const defaultValue: IState = {
  candidateId: 0,
  candidate: null,
  deleteLoading: false,
  loading: false,
  fetch: async () => null,
  delete: async () => null,

}

const CandidateContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode,
  candidateId?: number,
  candidate?: Nullable<ICandidate>,
}

export function CandidateWrapper(props: Props) {
  const appContext = useAppContext()
  const [candidate, setCandidate] = useState<Nullable<ICandidate>>(props.candidate as Nullable<ICandidate>)
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  useEffect(() => {
    setCandidate(props.candidate as Nullable<ICandidate>)
    setLoading(false)
  }, [props.candidate])
  const fetch = async (): Promise<Nullable<ICandidate>> => {
    try {
      const res = await CandidateRepository.fetchById(props.candidateId!)
      setCandidate(res)
      return res
    }catch (e) {
      console.error(e)
      return null
    }
  }
  useEffect(() => {
    if (!props.candidate) {
      setLoading(true)
      fetch().then((i) => setLoading(false))
    }
  }, [props.candidateId, props.candidate])
  const handleUpdate = (entity: ICandidate) => {
    appContext.candidateUpdateState$.next(entity)
  }
  const handleCreate = (entity: ICandidate) => {
    appContext.candidateCreateState$.next(entity)
  }
  const handleDelete = (entity: ICandidate) => {
    appContext.candidateDeleteState$.next(entity)
  }

  const deleteRequest = async (): Promise<Nullable<ICandidate>> => {
    return new Promise<Nullable<ICandidate>>((resolve, reject) => {
      appContext.showModal(ModalType.Confirm, {
        text: `Are you sure that you want to delete «${candidate?.cv.title}» ?`,
        onConfirm: async () => {
          try {
            appContext.hideModal()
            setDeleteLoading(true)
            const res = await CandidateRepository.delete(props.candidate!.id!)
            handleDelete(candidate!)
            resolve(candidate)
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
    candidate,
    candidateId: props.candidateId,
    loading,
    deleteLoading,
    fetch,
    delete: deleteRequest,
  }
  return (
    <CandidateContext.Provider value={value}>
      {props.children}
    </CandidateContext.Provider>
  )
}

export function useCandidateContext() {
  return useContext(CandidateContext)
}
