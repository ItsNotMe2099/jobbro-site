import {createContext, useContext, useEffect, useRef, useState} from 'react'
import {ICandidate} from '@/data/interfaces/ICandidate'
import {useAppContext} from '@/context/state'
import {CanceledError} from 'axios'
import {IPagination} from '@/data/interfaces/IPaginationRequest'
import {ICandidateListRequest} from '@/data/interfaces/ICandidateListRequest'
import CandidateRepository from '@/data/repositories/CandidateRepository'
import {Nullable} from '@/types/types'
import {CvListSortType} from '@/data/enum/CvListSortType'
import {SidePanelType} from '@/types/enums'
import {JobInviteSidePanelArguments} from '@/types/side_panel_arguments'

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
  filterIsEmpty: boolean
  sortType: Nullable<CvListSortType>
  setSortType: (sortType: Nullable<CvListSortType>) => void
  isActionLoading: boolean,
  selectedIds: number[]
  isSelectAll: boolean,
  setSelectAll: (val: boolean) => void,
  addToSelectedId: (id: number) => void,
  cancelSelection: () => void
  removeFromBaseMulti: () => void,
  inviteToJobMulti: () => void,
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
  filterIsEmpty: false,
  sortType: null,
  setSortType: (sortType: Nullable<CvListSortType>) => null,
  isActionLoading: false,
  selectedIds: [],
  isSelectAll: false,
  setSelectAll: (val: boolean) => null,
  addToSelectedId: (id: number) => null,
  cancelSelection: () => null,
  removeFromBaseMulti: () => null,
  inviteToJobMulti: () => null,
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
  const [sortType, setSortType] = useState<Nullable<CvListSortType>>(null)
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [isSelectAll, setSelectAll] = useState<boolean>(false)
  const [isActionLoading, setIsActionLoading] = useState<boolean>(false)

  const filterRef = useRef<ICandidateFilter>(filter)
  const sortTypeRef = useRef<Nullable<CvListSortType>>(sortType)
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
  const getSortParam = (sortType: CvListSortType) => {
    switch (sortType){
      case CvListSortType.FromNewToOld:
        return 'createdAt,DESC'
      case CvListSortType.FromOldToNew:
        return 'createdAt,ASC'
      case CvListSortType.FromLowToHighSalary:
        return 'cv.salaryMin,ASC'
      case CvListSortType.FromHighToLowSalary:
        return 'cv.salaryMin,DESC'
    }
  }
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
        page,
         ...(sortTypeRef.current ? {sort: getSortParam(sortTypeRef.current!)} : {}),

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
    return Boolean(!filter.profileType?.length && !filter.skills?.length && !filter.country && !filter.salaryType && !filter.salaryMin && !filter.salaryMax)
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
    filterIsEmpty: checkIsFilterEmpty(),
    isActionLoading,
    selectedIds,
    isSelectAll,
    addToSelectedId: (id: number) => {
      if (isActionLoading) {
        return
      }
      setSelectedIds(i => i.includes(id) ? i.filter(i => i !== id) : [...i, id])
    },
    cancelSelection: () => {
      setSelectedIds([])
      setSelectAll(false)
    },
    setSelectAll: (value: boolean) => {
      setSelectAll(value)
      if(!value) {
        setSelectedIds([])
      }
    },
    removeFromBaseMulti: async () => {
      let cvIds: number[] = []
      setIsActionLoading(true)
      if (isSelectAll) {
        if(data.total > data.data.length) {
          const cvList =  await CandidateRepository.fetch({
            ...filterRef.current,
            limit: 1000,
            page,
            ...(sortTypeRef.current ? {sort: getSortParam(sortTypeRef.current!)} : {}),
          })
          cvIds = cvList.data.map(i => i.id)
        }else{
          cvIds = data.data.map(i => i.id)
        }
      } else {
        cvIds = selectedIds
      }
      await CandidateRepository.deleteMulti(cvIds)
      setData(data => ({data: data.data.filter(i => !cvIds.includes(i.id)), total: data.total - 1}))
      setSelectAll(false)
      setSelectedIds([])
      setIsActionLoading(false)
    },
    inviteToJobMulti: async () => {
      setIsActionLoading(true)
      appContext.showSidePanel(SidePanelType.InviteToJob, { total: isSelectAll ? data.total : selectedIds.length, isMulti: true, cvs: data.data.filter(i => selectedIds.includes(i.id)).map(i => i.cv), allCandidateBase: isSelectAll } as JobInviteSidePanelArguments)

      setIsActionLoading(false)
    },
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
