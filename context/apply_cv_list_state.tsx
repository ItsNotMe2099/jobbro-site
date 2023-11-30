import {createContext, useContext, useEffect, useRef, useState} from 'react'
import {useAppContext} from '@/context/state'
import {CanceledError} from 'axios'
import {IPagination} from '@/data/interfaces/IPaginationRequest'
import {IAppliesListRequest} from '@/data/interfaces/IAppliesListRequest'
import AppliesRepository from '@/data/repositories/AppliesRepository'
import {ICVWithApply} from '@/data/interfaces/ICV'

export interface IApplyCvFilter extends IAppliesListRequest {
}

interface IState {
  data: IPagination<ICVWithApply>
  isLoaded: boolean
  isLoading: boolean
  page: number
  setPage: (page: number) => void
  filter: IApplyCvFilter
  setFilter: (data: IApplyCvFilter) => void
  reFetch: () => Promise<IPagination<ICVWithApply>>
  fetchMore: () => void
}

const defaultValue: IState = {
  data: {data: [], total: 0},
  isLoaded: false,
  isLoading: false,
  page: 1,
  setPage: (page: number) => null,
  filter: {},
  setFilter: (data: IApplyCvFilter) => null,
  reFetch: async () => ({data: [], total: 0}),
  fetchMore: () => null
}

const ApplyCvListContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode
  vacancyId: number
  limit?: number
}

export function ApplyCvListWrapper(props: Props) {
  const appContext = useAppContext()
  const [data, setData] = useState<IPagination<ICVWithApply>>({data: [], total: 0})
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)
  const [filter, setFilter] = useState<IApplyCvFilter>({})
  const filterRef = useRef<IApplyCvFilter>(filter)
  const abortControllerRef = useRef<AbortController | null>(null)

  const limit = props.limit ?? 20
  const init = async () => {
    await Promise.all([fetch()])
    setIsLoaded(true)
  }
  useEffect(() => {

    const subscriptionUpdate = appContext.cvApplyUpdateState$.subscribe((cv) => {
      setData(i => ({...i, data: i.data.map(i => i.id == cv.id ? ({...i, ...cv}) : i)}))
    })
    const subscriptionDelete = appContext.cvApplyDeleteState$.subscribe((cv) => {
      if (data.data.find(i => i.id === cv.id)) {
        setData((i) => ({...i, data: i.data.filter((i) => i.id !== cv.id), total: i.total - 1}))
      }
    })
    return () => {
      subscriptionUpdate.unsubscribe()
      subscriptionDelete.unsubscribe()
    }
  }, [data])

  const fetch = async ({page}: { page: number } = {page: 1}): Promise<IPagination<ICVWithApply>> => {
    setIsLoading(true)
    let res: IPagination<ICVWithApply> = {data: [], total: 0}
    if (abortControllerRef.current) {
      abortControllerRef.current?.abort()
    }
    abortControllerRef.current = new AbortController()
    try {
      res = await AppliesRepository.fetchForHirer(props.vacancyId, {
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
    <ApplyCvListContext.Provider value={value}>
      {props.children}
    </ApplyCvListContext.Provider>
  )
}

export function useApplyCvListOwnerContext() {
  return useContext(ApplyCvListContext)
}
