import {createContext, useContext, useEffect, useRef, useState} from 'react'
import {ICandidate} from '@/data/interfaces/ICandidate'
import {useAppContext} from '@/context/state'
import {CanceledError} from 'axios'
import {IPagination} from '@/data/interfaces/IPaginationRequest'
import {ICandidateListRequest} from '@/data/interfaces/ICandidateListRequest'
import CandidateRepository from '@/data/repositories/CandidateRepository'

export interface ICandidateFilter extends ICandidateListRequest {
}

interface IState {
  data: IPagination<ICandidate>
  isLoaded: boolean
  isLoading: boolean
  page: number
  setPage: (page: number) => void
  filter: ICandidateFilter
  setFilter: (data: ICandidateFilter) => void
  reFetch: () => Promise<IPagination<ICandidate>>
  fetchMore: () => void
}

const defaultValue: IState = {
  data: {data: [], total: 0},
  isLoaded: false,
  isLoading: false,
  page: 1,
  setPage: (page: number) => null,
  filter: {page: 1, limit: 10},
  setFilter: (data: ICandidateFilter) => null,
  reFetch: async () => ({data: [], total: 0}),
  fetchMore: () => null
}

const CandidateListContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode
  limit?: number
}

export function CandidateListWrapper(props: Props) {
  const appContext = useAppContext()
  const [data, setData] = useState<IPagination<ICandidate>>({data: [], total: 0})
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)
  const [filter, setFilter] = useState<ICandidateFilter>({page: 1, limit: props.limit ?? 10})
  const filterRef = useRef<ICandidateFilter>(filter)
  const abortControllerRef = useRef<AbortController | null>(null)

  const limit = props.limit ?? 20
  const init = async () => {
    await Promise.all([fetch()])
    setIsLoaded(true)
  }
  useEffect(() => {
    const subscriptionCreate = appContext.candidateCreateState$.subscribe((Candidate) => {
      reFetch()
    })
    const subscriptionUpdate = appContext.candidateUpdateState$.subscribe((candidate) => {
      setData(i => ({...i, data: i.data.map(i => i.id == candidate.id ? ({...i, ...candidate}) : i)}))
    })
    const subscriptionDelete = appContext.candidateDeleteState$.subscribe((candidate) => {
      if (data.data.find(i => i.id === candidate.id)) {
        setData((i) => ({...i, data: i.data.filter((i) => i.id !== candidate.id), total: i.total - 1}))
      }
    })
    return () => {
      subscriptionCreate.unsubscribe()
      subscriptionUpdate.unsubscribe()
      subscriptionDelete.unsubscribe()
    }
  }, [data])
  const fetch = async ({page}: { page: number } = {page: 1}): Promise<IPagination<ICandidate>> => {
    setIsLoading(true)
    let res: IPagination<ICandidate> = {data: [], total: 0}
    if (abortControllerRef.current) {
      abortControllerRef.current?.abort()
    }
    abortControllerRef.current = new AbortController()
    try {
       res = await CandidateRepository.fetch({
        ...filterRef.current,
       limit: filterRef.current.limit ?? limit,
        page
      }, {signal: abortControllerRef.current?.signal})
      setData(page > 1 ? (i) => ({total: res.total, data: [...i.data, ...res.data]}) : res)

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
    setPage(1)
    setData({data: [], total: 0})
    setIsLoaded(false)
    return fetch({page: 1})
  }
  const value: IState = {
    ...defaultValue,
    isLoaded,
    isLoading,
    data,
    page,
    setPage: (page) => {
      setPage(page)
      fetch({page})
    },
    filter,
    setFilter: async (data) => {
      filterRef.current = data
      setFilter(data)
      reFetch()
    },
    reFetch,
    fetchMore: () => {
      setPage(i => i + 1)
      fetch({page: page + 1})
    }
  }


  return (
    <CandidateListContext.Provider value={value}>
      {props.children}
    </CandidateListContext.Provider>
  )
}

export function useCandidateListContext() {
  return useContext(CandidateListContext)
}