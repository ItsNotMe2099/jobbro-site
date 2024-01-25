import {createContext, useContext, useEffect, useRef, useState} from 'react'
import {IVacancy} from '@/data/interfaces/IVacancy'
import {useAppContext} from '@/context/state'
import {CanceledError} from 'axios'
import {IVacancyOwnerListRequest} from '@/data/interfaces/IVacancyOwnerListRequest'
import {IPagination} from '@/data/interfaces/IPaginationRequest'
import VacancyRepository from '@/data/repositories/VacancyRepository'
import {Nullable} from '@/types/types'
import {PublishStatus} from '@/data/enum/PublishStatus'
import {omit} from '@/utils/omit'

export interface IVacancyFilter extends IVacancyOwnerListRequest {
  showClosed?: boolean
}
export enum VacancyOwnerListSortType{
  FromNewToOld = 'fromNewToOld',
  FromOldToNew = 'fromOldToNew ',
  FromLowToHighSalary = 'fromLowToHighSalary',
  FromHighToLowSalary = 'fromHighToLowSalary',
}

interface IState {
  data: IPagination<IVacancy>
  isLoaded: boolean
  isLoading: boolean
  page: number
  setPage: (page: number) => void
  filter: IVacancyFilter
  setFilter: (data: IVacancyFilter) => void
  filtersCount: number
  sortType: Nullable<VacancyOwnerListSortType>
  setSortType: (sortType: Nullable<VacancyOwnerListSortType>) => void
  reFetch: () => Promise<IPagination<IVacancy>>
  fetchMore: () => void
}

const defaultValue: IState = {
  data: {data: [], total: 0},
  isLoaded: false,
  isLoading: false,
  page: 1,
  setPage: (page: number) => null,
  filter: {page: 1, limit: 10},
  filtersCount: 0,
  setFilter: (data: IVacancyFilter) => null,
  reFetch: async () => ({data: [], total: 0}),
  fetchMore: () => null,
  sortType: null,
  setSortType: (sortType: Nullable<VacancyOwnerListSortType>) => null,
}

const VacancyListOwnerContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode
  limit?: number
}

export function VacancyListOwnerWrapper(props: Props) {
  const appContext = useAppContext()
  const [data, setData] = useState<IPagination<IVacancy>>({data: [], total: 0})
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)
  const [filter, setFilter] = useState<IVacancyFilter>({showClosed: true})
  const [sortType, setSortType] = useState<Nullable<VacancyOwnerListSortType>>(null)
  const filterRef = useRef<IVacancyFilter>(filter)
  const sortTypeRef = useRef<Nullable<VacancyOwnerListSortType>>(sortType)
  const abortControllerRef = useRef<AbortController | null>(null)

  const limit = props.limit ?? 20
  const init = async () => {
    await Promise.all([fetch()])
    setIsLoaded(true)
  }
  useEffect(() => {
    const subscriptionCreate = appContext.vacancyCreateState$.subscribe((vacancy) => {
      reFetch()
    })
    const subscriptionUpdate = appContext.vacancyUpdateState$.subscribe((vacancy) => {
      setData(i => ({...i, data: i.data.map(i => i.id == vacancy.id ? ({...i, ...vacancy}) : i)}))
    })
    const subscriptionDelete = appContext.vacancyDeleteState$.subscribe((vacancy) => {
      if (data.data.find(i => i.id === vacancy.id)) {
        setData((i) => ({...i, data: i.data.filter((i) => i.id !== vacancy.id), total: i.total - 1}))
      }
    })
    return () => {
      subscriptionCreate.unsubscribe()
      subscriptionUpdate.unsubscribe()
      subscriptionDelete.unsubscribe()
    }
  }, [data])
  const getSortParam = (sortType: VacancyOwnerListSortType) => {
    switch (sortType){
      case VacancyOwnerListSortType.FromOldToNew:
        return 'createdAt,ASC'
      case VacancyOwnerListSortType.FromLowToHighSalary:
        return 'salaryMin,ASC'
      case VacancyOwnerListSortType.FromHighToLowSalary:
        return 'salaryMin,DESC'
      case VacancyOwnerListSortType.FromNewToOld:
      default:
        return 'createdAt,DESC'
    }
  }
  const fetch = async ({page}: { page: number } = {page: 1}): Promise<IPagination<IVacancy>> => {
    setIsLoading(true)
    let res: IPagination<IVacancy> = {data: [], total: 0}
    if (abortControllerRef.current) {
      abortControllerRef.current?.abort()
    }
    abortControllerRef.current = new AbortController()

    try {
       res = await VacancyRepository.fetch({
          ...omit(filterRef.current, ['statuses', 'projects','showClosed']),
         ...((filterRef.current.projects?.length ?? 0) > 0 ? {
           projects: filterRef.current.projects
         } : {}),
         ...(((filterRef.current.statuses?.length ?? 0) > 0 || !filterRef.current.showClosed) ? {
          statuses: [
            ...((filterRef.current.statuses?.length ?? 0)> 0 ? filterRef.current.statuses! : []),
            ...(filterRef.current.showClosed ? ((filterRef.current.statuses?.length ?? 0) > 0 ? [PublishStatus.Closed] : []) : (!filterRef.current.statuses?.length ? [PublishStatus.Draft, PublishStatus.Paused, PublishStatus.Published] : []))]
        } : {}),

       ...(sortTypeRef.current ? {sort: getSortParam(sortTypeRef.current!)} : {}),
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
  const checkIsFilterEmpty = () => {
    const filter = filterRef.current
    const num:number = Object.values(filter).filter(Boolean).filter(Array.isArray).reduce((a, b) => a + b.length, 0)
    return num
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
    sortType,
    setSortType: (sortType) => {
      sortTypeRef.current = sortType
      setSortType(sortType)
      reFetch()
    },
    filtersCount: checkIsFilterEmpty(),
  }


  return (
    <VacancyListOwnerContext.Provider value={value}>
      {props.children}
    </VacancyListOwnerContext.Provider>
  )
}

export function useVacancyListOwnerContext() {
  return useContext(VacancyListOwnerContext)
}
