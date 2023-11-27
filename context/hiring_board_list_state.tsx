import {createContext, useContext, useRef, useState} from 'react'
import {useAppContext} from '@/context/state'
import {CanceledError} from 'axios'
import {IPagination} from '@/data/interfaces/IPaginationRequest'
import {IVacancyWithHiringStages} from '@/data/interfaces/IVacancy'
import HiringBoardRepository from '@/data/repositories/HiriginBoardRepository'
import {IHiringBoardListRequest} from '@/data/interfaces/IHiringBoardListRequest'

export interface IHiringBoardListFilter extends IHiringBoardListRequest {
}

interface IState {
  data: IPagination<IVacancyWithHiringStages>
  isLoaded: boolean
  isLoading: boolean
  page: number
  setPage: (page: number) => void
  filter: IHiringBoardListFilter
  setFilter: (data: IHiringBoardListFilter) => void
  reFetch: () => Promise<IPagination<IVacancyWithHiringStages>>
  fetchMore: () => void
}

const defaultValue: IState = {
  data: {data: [], total: 0},
  isLoaded: false,
  isLoading: false,
  page: 1,
  setPage: (page: number) => null,
  filter: {},
  setFilter: (data: IHiringBoardListFilter) => null,
  reFetch: async () => ({data: [], total: 0}),
  fetchMore: () => null
}

const HiringBoardListContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode
  limit?: number
}

export function HiringBoardListWrapper(props: Props) {
  const appContext = useAppContext()
  const [data, setData] = useState<IPagination<IVacancyWithHiringStages>>({data: [], total: 0})
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)
  const [filter, setFilter] = useState<IHiringBoardListFilter>({})
  const filterRef = useRef<IHiringBoardListFilter>(filter)
  const abortControllerRef = useRef<AbortController | null>(null)

  const limit = props.limit ?? 20
  const init = async () => {
    await Promise.all([fetch()])
    setIsLoaded(true)
  }

  const fetch = async ({page}: { page: number } = {page: 1}): Promise<IPagination<IVacancyWithHiringStages>> => {
    setIsLoading(true)
    let res: IPagination<IVacancyWithHiringStages> = {data: [], total: 0}
    if (abortControllerRef.current) {
      abortControllerRef.current?.abort()
    }
    abortControllerRef.current = new AbortController()
    try {
      res = await HiringBoardRepository.fetch({
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
    page,
    setPage: (page) => {
      setPage(page)
      fetch({page})
    },
    data,
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
    <HiringBoardListContext.Provider value={value}>
      {props.children}
    </HiringBoardListContext.Provider>
  )
}

export function useHiringBoardListContext() {
  return useContext(HiringBoardListContext)
}
