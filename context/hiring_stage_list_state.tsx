import {createContext, useContext, useRef, useState} from 'react'
import {useAppContext} from '@/context/state'
import {CanceledError} from 'axios'
import IHiringStage from '@/data/interfaces/IHiringStage'
import HiringStageRepository from '@/data/repositories/HiriginStageRepository'

interface IState {
  data: IHiringStage[]
  isLoaded: boolean
  isLoading: boolean
  reFetch: () => Promise<IHiringStage[]>
}

const defaultValue: IState = {
  data: [],
  isLoaded: false,
  isLoading: false,
  reFetch: async () => [],
}

const HiringStageListContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode
  limit?: number
  vacancyId: number
}

export function HiringStageListWrapper(props: Props) {
  const appContext = useAppContext()
  const [data, setData] = useState<IHiringStage[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const abortControllerRef = useRef<AbortController | null>(null)

  const init = async () => {
    await Promise.all([fetch()])
    setIsLoaded(true)
  }

  const fetch = async (): Promise<IHiringStage[]> => {
    setIsLoading(true)
    let res: IHiringStage[] = []
    if (abortControllerRef.current) {
      abortControllerRef.current?.abort()
    }
    abortControllerRef.current = new AbortController()
    try {
       res = await HiringStageRepository.fetchByVacancyId(props.vacancyId, {signal: abortControllerRef.current?.signal})
      setData(res)

    } catch (err) {
      if (err instanceof CanceledError) {
        return res
      }
    }
    setIsLoaded(true)
    setIsLoading(false)
    return res
  }

  const reFetch = () => {
    setData([])
    setIsLoaded(false)
    return fetch()
  }
  const value: IState = {
    ...defaultValue,
    isLoaded,
    isLoading,
    data,
    reFetch,
  }


  return (
    <HiringStageListContext.Provider value={value}>
      {props.children}
    </HiringStageListContext.Provider>
  )
}

export function useHiringStageListContext() {
  return useContext(HiringStageListContext)
}
