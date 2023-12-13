import {createContext, useContext, useEffect, useRef, useState} from 'react'
import {IManager} from '@/data/interfaces/IManager'
import {useAppContext} from '@/context/state'
import {CanceledError} from 'axios'
import {IPagination} from '@/data/interfaces/IPaginationRequest'

import {IManagerListRequest} from '@/data/interfaces/IManagerListRequest'
import ManagerOwnerRepository from '@/data/repositories/ManagerOwnerRepository'

export interface IManagerFilter extends IManagerListRequest {
}

interface IState {
  data: IPagination<IManager>
  isLoaded: boolean
  isLoading: boolean
  page: number
  setPage: (page: number) => void
  filter: IManagerFilter
  setFilter: (data: IManagerFilter) => void
  reFetch: () => Promise<IPagination<IManager>>
  fetchMore: () => void
}

const defaultValue: IState = {
  data: {data: [], total: 0},
  isLoaded: false,
  isLoading: false,
  page: 1,
  setPage: (page: number) => null,
  filter: {page: 1, limit: 10},
  setFilter: (data: IManagerFilter) => null,
  reFetch: async () => ({data: [], total: 0}),
  fetchMore: () => null
}

const ManagerListOwnerContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode
  limit?: number
}

export function ManagerListOwnerWrapper(props: Props) {
  const appContext = useAppContext()
  const [data, setData] = useState<IPagination<IManager>>({data: [], total: 0})
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)
  const [filter, setFilter] = useState<IManagerFilter>({page: 1, limit: props.limit ?? 10})
  const filterRef = useRef<IManagerFilter>(filter)
  const abortControllerRef = useRef<AbortController | null>(null)

  const limit = props.limit ?? 20
  const init = async () => {
    await Promise.all([fetch()])
    setIsLoaded(true)
  }
  useEffect(() => {
    const subscriptionCreate = appContext.managerCreateState$.subscribe((manager) => {
      reFetch()
    })
    const subscriptionUpdate = appContext.managerUpdateState$.subscribe((manager) => {
      setData(i => ({...i, data: i.data.map(i => i.id == manager.id ? ({...i, ...manager}) : i)}))
    })
    const subscriptionDelete = appContext.managerDeleteState$.subscribe((manager) => {
      if (data.data.find(i => i.id === manager.id)) {
        setData((i) => ({...i, data: i.data.filter((i) => i.id !== manager.id), total: i.total - 1}))
      }
    })
    return () => {
      subscriptionCreate.unsubscribe()
      subscriptionUpdate.unsubscribe()
      subscriptionDelete.unsubscribe()
    }
  }, [data])
  const fetch = async ({page}: { page: number } = {page: 1}): Promise<IPagination<IManager>> => {
    setIsLoading(true)
    let res: IPagination<IManager> = {data: [], total: 0}
    if (abortControllerRef.current) {
      abortControllerRef.current?.abort()
    }
    abortControllerRef.current = new AbortController()
    try {
       res = await ManagerOwnerRepository.fetch({
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
    <ManagerListOwnerContext.Provider value={value}>
      {props.children}
    </ManagerListOwnerContext.Provider>
  )
}

export function useManagerListOwnerContext() {
  return useContext(ManagerListOwnerContext)
}
