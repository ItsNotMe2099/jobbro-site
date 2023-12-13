import {createContext, useContext, useEffect, useRef, useState} from 'react'
import FavoriteRepository from '@/data/repositories/FavoriteRepository'
import {IFavoriteListRequest} from '@/data/interfaces/IFavoriteListRequest'
import {SortOrder} from '@/types/enums'
import {CanceledError} from 'axios'
import {IPagination} from '@/data/interfaces/IPaginationRequest'
import {IVacancy} from '@/data/interfaces/IVacancy'
import {FavoriteEntityType} from '@/data/enum/FavoriteEntityType'

interface IFavoriteListFilter extends IFavoriteListRequest {
}

interface IState {
  data: IPagination<IVacancy>
  isLoaded: boolean
  isLoading: boolean
  page: number
  setPage: (page: number) => void
  sortOrder: SortOrder,
  setSortOrder: (sort: SortOrder) => void,
  filter: IFavoriteListFilter
  setFilter: (data: IFavoriteListFilter) => void
  reFetch: () => void
  fetchMore: () => void
  deleteFromFavorite: (id: number) => void
}

const defaultValue: IState = {
  data: {data: [], total: 0},
  isLoaded: false,
  isLoading: false,
  page: 1,
  setPage: (page: number) => null,
  sortOrder: SortOrder.Desc,
  setSortOrder: (sort: SortOrder) => null,
  filter: {page: 1, limit: 10},
  setFilter: (data: IFavoriteListFilter) => null,
  reFetch: () => null,
  fetchMore: () => null,
  deleteFromFavorite: (id: number) => null
}

const FavoriteListContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode
  limit?: number
}

export function FavoriteListWrapper(props: Props) {
  const [data, setData] = useState<IPagination<IVacancy>>({data: [], total: 0})
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)
  const [filter, setFilter] = useState<IFavoriteListFilter>({page: 1, limit: 10})
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.Desc)
  const filterRef = useRef<IFavoriteListFilter>(filter)
  const sortOrderRef = useRef<SortOrder>(sortOrder)
  const abortControllerRef = useRef<AbortController | null>(null)
  const limit = props.limit ?? 12
  useEffect(() => {
    filterRef.current = filter
  }, [filter])

  useEffect(() => {
    sortOrderRef.current = sortOrder
  }, [sortOrder])
  const init = async () => {
    await Promise.all([fetch()])
    setIsLoaded(true)
  }
  const fetch = async ({page}: { page: number } = {page: 1}) => {
    setIsLoading(true)
    if (abortControllerRef.current) {
      abortControllerRef.current?.abort()
    }
    abortControllerRef.current = new AbortController()
    try {
      const res = await FavoriteRepository.fetchByType<IVacancy>(FavoriteEntityType.vacancy, {
        ...filterRef.current,
        limit: filterRef.current.limit ?? limit,
        ...(sortOrderRef.current ? {sortOrder: sortOrderRef.current} : {}), page
      }, {signal: abortControllerRef.current?.signal})
      setData(page > 1 ? (i) => ({total: res.total, data: [...i.data, ...res.data]}) : res)

    } catch (err) {
      if (err instanceof CanceledError) {
        return
      }
    }
    setIsLoaded(true)
    setIsLoading(false)
  }

  const reFetch = () => {
    setPage(1)
    setData({data: [], total: 0})
    setIsLoaded(false)
    fetch({page: 1})
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
    sortOrder,
    setSortOrder: async (sortOrder) => {
      sortOrderRef.current = sortOrder
      setSortOrder(sortOrder)
      reFetch()
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
    deleteFromFavorite: async (id: number) => {
      if (data.data?.find(i => i.id === id)) {
        setData(i => ({...i, data: i.data.filter(i => i.id !== id), total: i.total - 1}))

        await FavoriteRepository.delete(id, FavoriteEntityType.vacancy)
      }
    }
  }


  return (
    <FavoriteListContext.Provider value={value}>
      {props.children}
    </FavoriteListContext.Provider>
  )
}

export function useFavoriteListContext() {
  return useContext(FavoriteListContext)
}
