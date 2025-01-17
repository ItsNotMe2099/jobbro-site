import {createContext, useContext, useRef, useState} from 'react'
import {useAppContext} from '@/context/state'
import {CanceledError} from 'axios'
import {IPagination} from '@/data/interfaces/IPaginationRequest'
import {IVacancyWithApply} from '@/data/interfaces/IVacancy'
import {IAppliesListRequest} from '@/data/interfaces/IAppliesListRequest'
import AppliesRepository from '@/data/repositories/AppliesRepository'

export interface IApplyVacancyFilter extends IAppliesListRequest {
}

interface IState {
  data: IPagination<IVacancyWithApply>
  isLoaded: boolean
  isLoading: boolean
  page: number
  setPage: (page: number) => void
  filter: IApplyVacancyFilter
  setFilter: (data: IApplyVacancyFilter) => void
  reFetch: () => Promise<IPagination<IVacancyWithApply>>
  fetchMore: () => void
}

const defaultValue: IState = {
  data: {data: [], total: 0},
  isLoaded: false,
  isLoading: false,
  page: 1,
  setPage: (page: number) => null,
  filter: {},
  setFilter: (data: IApplyVacancyFilter) => null,
  reFetch: async () => ({data: [], total: 0}),
  fetchMore: () => null
}

const ApplyVacancyListContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode
  limit?: number
}

export function ApplyVacancyListWrapper(props: Props) {
  const appContext = useAppContext()
  const [data, setData] = useState<IPagination<IVacancyWithApply>>({data: [], total: 0})
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)
  const [filter, setFilter] = useState<IApplyVacancyFilter>({})
  const filterRef = useRef<IApplyVacancyFilter>(filter)
  const abortControllerRef = useRef<AbortController | null>(null)

  const limit = props.limit ?? 20
  const init = async () => {
    await Promise.all([fetch()])
    setIsLoaded(true)
  }

  const fetch = async ({page}: { page: number } = {page: 1}): Promise<IPagination<IVacancyWithApply>> => {
    setIsLoading(true)
    let res: IPagination<IVacancyWithApply> = {data: [], total: 0}
    if (abortControllerRef.current) {
      abortControllerRef.current?.abort()
    }
    abortControllerRef.current = new AbortController()
    try {
      res = await AppliesRepository.fetchForEmployee({
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
    <ApplyVacancyListContext.Provider value={value}>
      {props.children}
    </ApplyVacancyListContext.Provider>
  )
}

export function useApplyListOwnerContext() {
  return useContext(ApplyVacancyListContext)
}
