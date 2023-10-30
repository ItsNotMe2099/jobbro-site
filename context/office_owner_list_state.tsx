import {createContext, useContext, useEffect, useRef, useState} from 'react'
import {IOffice} from '@/data/interfaces/IOffice'
import {useAppContext} from '@/context/state'
import {CanceledError} from 'axios'
import {IPagination} from '@/data/interfaces/IPaginationRequest'
import OfficeOwnerRepository from '@/data/repositories/OfficeOwnerRepository'
import {IOfficeListRequest} from '@/data/interfaces/IOfficeListRequest'

export interface IOfficeFilter extends IOfficeListRequest {
}

interface IState {
  data: IPagination<IOffice>
  isLoaded: boolean
  isLoading: boolean
  page: number
  setPage: (page: number) => void
  filter: IOfficeFilter
  setFilter: (data: IOfficeFilter) => void
  reFetch: () => Promise<IPagination<IOffice>>
  fetchMore: () => void
}

const defaultValue: IState = {
  data: {data: [], total: 0},
  isLoaded: false,
  isLoading: false,
  page: 1,
  setPage: (page: number) => null,
  filter: {page: 1, limit: 10},
  setFilter: (data: IOfficeFilter) => null,
  reFetch: async () => ({data: [], total: 0}),
  fetchMore: () => null
}

const OfficeListOwnerContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode
  limit?: number
}

export function OfficeListOwnerWrapper(props: Props) {
  const appContext = useAppContext()
  const [data, setData] = useState<IPagination<IOffice>>({data: [], total: 0})
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)
  const [filter, setFilter] = useState<IOfficeFilter>({page: 1, limit: props.limit ?? 10})
  const filterRef = useRef<IOfficeFilter>(filter)
  const abortControllerRef = useRef<AbortController | null>(null)

  const limit = props.limit ?? 20
  const init = async () => {
    await Promise.all([fetch()])
    setIsLoaded(true)
  }
  useEffect(() => {
    const subscriptionCreate = appContext.officeCreateState$.subscribe((office) => {
      reFetch()
    })
    const subscriptionUpdate = appContext.officeUpdateState$.subscribe((office) => {
      setData(i => ({...i, data: i.data.map(i => i.id == office.id ? ({...i, ...office}) : i)}))
    })
    const subscriptionDelete = appContext.officeDeleteState$.subscribe((office) => {
      if (data.data.find(i => i.id === office.id)) {
        setData((i) => ({...i, data: i.data.filter((i) => i.id !== office.id), total: i.total - 1}))
      }
    })
    return () => {
      subscriptionCreate.unsubscribe()
      subscriptionUpdate.unsubscribe()
      subscriptionDelete.unsubscribe()
    }
  }, [data])
  const fetch = async ({page}: { page: number } = {page: 1}): Promise<IPagination<IOffice>> => {
    setIsLoading(true)
    let res: IPagination<IOffice> = {data: [], total: 0}
    if (abortControllerRef.current) {
      abortControllerRef.current?.abort()
    }
    abortControllerRef.current = new AbortController()
    try {
       res = await OfficeOwnerRepository.fetch({
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
    <OfficeListOwnerContext.Provider value={value}>
      {props.children}
    </OfficeListOwnerContext.Provider>
  )
}

export function useOfficeListOwnerContext() {
  return useContext(OfficeListOwnerContext)
}