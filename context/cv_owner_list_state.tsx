import {createContext, useContext, useEffect, useRef, useState} from 'react'
import {ICV} from '@/data/interfaces/ICV'
import {useAppContext} from '@/context/state'
import {CanceledError} from 'axios'
import {ICvOwnerListRequest} from '@/data/interfaces/ICvOwnerListRequest'
import CvOwnerRepository from '@/data/repositories/CvOwnerRepository'

export interface ICVFilter extends ICvOwnerListRequest {
}

interface IState {
  data: ICV[]
  isLoaded: boolean
  isLoading: boolean
  filter: ICVFilter
  setFilter: (data: ICVFilter) => void
  reFetch: () => Promise<ICV[]>
}

const defaultValue: IState = {
  data: [],
  isLoaded: false,
  isLoading: false,
  filter: {},
  setFilter: (data: ICVFilter) => null,
  reFetch: async () => [],
}

const CVListOwnerContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode
  limit?: number
}

export function CVListOwnerWrapper(props: Props) {
  const appContext = useAppContext()
  const [data, setData] = useState<ICV[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)
  const [filter, setFilter] = useState<ICVFilter>({})
  const filterRef = useRef<ICVFilter>(filter)
  const abortControllerRef = useRef<AbortController | null>(null)

  const init = async () => {
    await Promise.all([fetch()])
    setIsLoaded(true)
  }
  useEffect(() => {
    const subscriptionCreate = appContext.cvCreateState$.subscribe((cv) => {
      reFetch()
    })
    const subscriptionUpdate = appContext.cvUpdateState$.subscribe((cv) => {
      setData(i =>  i.map(i => i.id == cv.id ? ({...i, ...cv}) : i))
    })
    const subscriptionDelete = appContext.cvDeleteState$.subscribe((cv) => {
      if (data.find(i => i.id === cv.id)) {
        setData((i) => i.filter((i) => i.id !== cv.id))
      }
    })
    return () => {
      subscriptionCreate.unsubscribe()
      subscriptionUpdate.unsubscribe()
      subscriptionDelete.unsubscribe()
    }
  }, [data])
  const fetch = async (): Promise<ICV[]> => {
    setIsLoading(true)
    let res: ICV[] = []
    if (abortControllerRef.current) {
      abortControllerRef.current?.abort()
    }
    abortControllerRef.current = new AbortController()
    try {
       res = await CvOwnerRepository.fetch({
        ...filterRef.current,
        page
      }, {signal: abortControllerRef.current?.signal})
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
    filter,
    setFilter: async (data) => {
      filterRef.current = data
      setFilter(data)
      reFetch()
    },
    reFetch,
  }


  return (
    <CVListOwnerContext.Provider value={value}>
      {props.children}
    </CVListOwnerContext.Provider>
  )
}

export function useCVListOwnerContext() {
  return useContext(CVListOwnerContext)
}
