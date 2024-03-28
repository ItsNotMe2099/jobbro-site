import {createContext, useContext, useEffect, useRef, useState} from 'react'
import {useAppContext} from '@/context/state'
import {CanceledError} from 'axios'
import {IPagination, IPaginationRequest} from '@/data/interfaces/IPaginationRequest'
import CvNoteRepository from '@/data/repositories/CvNoteRepository'
import ICvNote from '@/data/interfaces/ICvNote'
import {ICvNoteCreateRequest} from '@/data/interfaces/ICvNoteCreateRequest'

export interface ICvNoteFilter extends IPaginationRequest {
}

interface IState {
  data: IPagination<ICvNote>
  isLoaded: boolean
  isLoading: boolean
  page: number
  setPage: (page: number) => void
  filter: ICvNoteFilter
  setFilter: (data: ICvNoteFilter) => void
  create: (data: ICvNoteCreateRequest) => Promise<void>
  reFetch: () => Promise<IPagination<ICvNote>>
  fetchMore: () => void
}

const defaultValue: IState = {
  data: {data: [], total: 0},
  isLoaded: false,
  isLoading: false,
  page: 1,
  setPage: (page: number) => null,
  filter: {page: 1, limit: 10},
  setFilter: (data: ICvNoteFilter) => null,
  create: async (data) => {},
  reFetch: async () => ({data: [], total: 0}),
  fetchMore: () => null
}

const CvNoteListOwnerContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode
  cvId: number
  limit?: number
}

export function CvNoteListOwnerWrapper(props: Props) {
  const appContext = useAppContext()
  const [data, setData] = useState<IPagination<ICvNote>>({data: [], total: 0})
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)
  const [filter, setFilter] = useState<ICvNoteFilter>({page: 1, limit: props.limit ?? 30})
  const filterRef = useRef<ICvNoteFilter>(filter)
  const abortControllerRef = useRef<AbortController | null>(null)

  const limit = props.limit ?? 20
  const init = async () => {
    await Promise.all([fetch()])
    setIsLoaded(true)
  }
  useEffect(() => {
    init()
  }, [])
  useEffect(() => {
    const subscriptionCreate = appContext.cvNoteCreateState$.subscribe((office) => {
      setData(i => ({...i, data: [ office, ...i.data]}))
    })
    const subscriptionUpdate = appContext.cvNoteUpdateState$.subscribe((office) => {
      setData(i => ({...i, data: i.data.map(i => i.id == office.id ? ({...i, ...office}) : i)}))
    })
    const subscriptionDelete = appContext.cvNoteDeleteState$.subscribe((office) => {
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
  const fetch = async ({page}: { page: number } = {page: 1}): Promise<IPagination<ICvNote>> => {
    setIsLoading(true)
    let res: IPagination<ICvNote> = {data: [], total: 0}
    if (abortControllerRef.current) {
      abortControllerRef.current?.abort()
    }
    abortControllerRef.current = new AbortController()
    try {
       res = await CvNoteRepository.fetch({
        ...filterRef.current,
         cvId: props.cvId,
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
    },
    create: async (data: ICvNoteCreateRequest) => {
      const cvNote = await CvNoteRepository.create({...data, cvId: props.cvId})
      appContext.cvNoteCreateState$.next(cvNote)
    }
  }


  return (
    <CvNoteListOwnerContext.Provider value={value}>
      {props.children}
    </CvNoteListOwnerContext.Provider>
  )
}

export function useCvNoteListOwnerContext() {
  return useContext(CvNoteListOwnerContext)
}
