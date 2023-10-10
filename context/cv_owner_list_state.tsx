import {createContext, useContext, useEffect, useRef, useState} from 'react'
import {ICV} from '@/data/interfaces/ICV'
import {useAppContext} from '@/context/state'
import {CanceledError} from 'axios'
import {IPagination} from '@/data/interfaces/IPaginationRequest'
import {ICvOwnerListRequest} from '@/data/interfaces/ICvOwnerListRequest'
import CvOwnerRepository from '@/data/repositories/CvOwnerRepository'

export interface ICVFilter extends ICvOwnerListRequest {
}

interface IState {
  data: IPagination<ICV>
  isLoaded: boolean
  isLoading: boolean
  page: number
  setPage: (page: number) => void
  filter: ICVFilter
  setFilter: (data: ICVFilter) => void
  reFetch: () => Promise<IPagination<ICV>>
  fetchMore: () => void
}

const defaultValue: IState = {
  data: {data: [], total: 0},
  isLoaded: false,
  isLoading: false,
  page: 1,
  setPage: (page: number) => null,
  filter: {page: 1, limit: 10},
  setFilter: (data: ICVFilter) => null,
  reFetch: async () => ({data: [], total: 0}),
  fetchMore: () => null
}

const CVListOwnerContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode
  limit?: number
}

export function CVListOwnerWrapper(props: Props) {
  const appContext = useAppContext()
  const [data, setData] = useState<IPagination<ICV>>({data: [], total: 0})
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)
  const [filter, setFilter] = useState<ICVFilter>({page: 1, limit: props.limit ?? 10})
  const filterRef = useRef<ICVFilter>(filter)
  const abortControllerRef = useRef<AbortController | null>(null)

  const limit = props.limit ?? 20
  const init = async () => {
    await Promise.all([fetch()])
    setIsLoaded(true)
  }
  useEffect(() => {
    const subscriptionCreate = appContext.cvCreateState$.subscribe((cv) => {
      reFetch()
    })
    const subscriptionUpdate = appContext.cvUpdateState$.subscribe((cv) => {
      setData(i => ({...i, data: i.data.map(i => i.id == cv.id ? ({...i, ...cv}) : i)}))
    })
    const subscriptionDelete = appContext.cvDeleteState$.subscribe((cv) => {
      if (data.data.find(i => i.id === cv.id)) {
        setData((i) => ({...i, data: i.data.filter((i) => i.id !== cv.id), total: i.total - 1}))
      }
    })
    return () => {
      subscriptionCreate.unsubscribe()
      subscriptionUpdate.unsubscribe()
      subscriptionDelete.unsubscribe()
    }
  }, [data])
  const fetch = async ({page}: { page: number } = {page: 1}): Promise<IPagination<ICV>> => {
    setIsLoading(true)
    let res: IPagination<ICV> = {data: [], total: 0}
    if (abortControllerRef.current) {
      abortControllerRef.current?.abort()
    }
    abortControllerRef.current = new AbortController()
    try {
       res = await CvOwnerRepository.fetch({
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
    <CVListOwnerContext.Provider value={value}>
      {props.children}
    </CVListOwnerContext.Provider>
  )
}

export function useCVListOwnerContext() {
  return useContext(CVListOwnerContext)
}
