import {createContext, useContext, useEffect, useRef, useState} from 'react'
import {useAppContext} from '@/context/state'
import {CanceledError} from 'axios'
import {IPagination} from '@/data/interfaces/IPaginationRequest'
import {IAppliesListRequest} from '@/data/interfaces/IAppliesListRequest'
import AppliesRepository from '@/data/repositories/AppliesRepository'
import {ICVWithApply} from '@/data/interfaces/ICV'
import {Nullable, RequestError} from '@/types/types'
import {CvListSortType} from '@/data/enum/CvListSortType'
import CandidateRepository from '@/data/repositories/CandidateRepository'
import {SidePanelType, SnackbarType} from '@/types/enums'
import {JobInviteSidePanelArguments} from '@/types/side_panel_arguments'
import {useCandidateAddedContext} from '@/context/candidate_added_state'
import HiringBoardRepository from '@/data/repositories/HiriginBoardRepository'

export interface IApplyCvFilter extends IAppliesListRequest {
}

interface IState {
  data: IPagination<ICVWithApply>
  isLoaded: boolean
  isLoading: boolean
  page: number
  setPage: (page: number) => void
  isActionLoading: boolean,
  selectedIds: number[]
  isSelectAll: boolean,
  setSelectAll: (val: boolean) => void,
  addToSelectedId: (id: number) => void,
  cancelSelection: () => void
  addToBaseMulti: () => void,
  inviteToJobMulti: () => void,
  filter: IApplyCvFilter
  setFilter: (data: IApplyCvFilter) => void
  filterIsEmpty: boolean
  sortType: Nullable<CvListSortType>
  setSortType: (sortType: Nullable<CvListSortType>) => void
  reFetch: () => Promise<IPagination<ICVWithApply>>
  fetchMore: () => void
  moveToStageMulti: (hiringStageId: number) => void,
  rejectMulti: () => void
}

const defaultValue: IState = {
  data: {data: [], total: 0},
  isLoaded: false,
  isLoading: false,
  page: 1,
  setPage: (page: number) => null,
  isActionLoading: false,
  selectedIds: [],
  isSelectAll: false,
  setSelectAll: (val: boolean) => null,
  addToSelectedId: (id: number) => null,
  cancelSelection: () => null,
  addToBaseMulti: () => null,
  inviteToJobMulti: () => null,
  filter: {},
  setFilter: (data: IApplyCvFilter) => null,
  filterIsEmpty: false,
  sortType: null,
  setSortType: (sortType: Nullable<CvListSortType>) => null,
  reFetch: async () => ({data: [], total: 0}),
  fetchMore: () => null,
  moveToStageMulti: (hiringStageId: number) => null,
  rejectMulti: () => null
}

const ApplyCvListContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode
  vacancyId: number
  limit?: number
}

export function ApplyCvListWrapper(props: Props) {
  const appContext = useAppContext()
  const favoriteContext = useCandidateAddedContext()
  const [data, setData] = useState<IPagination<ICVWithApply>>({data: [], total: 0})
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)
  const [filter, setFilter] = useState<IApplyCvFilter>({})
  const [sortType, setSortType] = useState<Nullable<CvListSortType>>(null)
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [isSelectAll, setSelectAll] = useState<boolean>(false)
  const [isActionLoading, setIsActionLoading] = useState<boolean>(false)

  const sortTypeRef = useRef<Nullable<CvListSortType>>(sortType)

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
  const getSortParam = (sortType: CvListSortType) => {
    switch (sortType) {
      case CvListSortType.FromNewToOld:
        return 'createdAt,DESC'
      case CvListSortType.FromOldToNew:
        return 'createdAt,ASC'
      case CvListSortType.FromLowToHighSalary:
        return 'salaryMin,ASC'
      case CvListSortType.FromHighToLowSalary:
        return 'salaryMin,DESC'
      case CvListSortType.FromHighToLowScore:
        return 'score,ASC'
      case CvListSortType.FromLowToHighScore:
        return 'score,DESC'
    }
  }
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
  const checkIsFilterEmpty = () => {
    const filter = filterRef.current
    return Boolean(!filter.profileType?.length && !filter.skills?.length && !filter.country && !filter.salaryType && !filter.salaryMin && !filter.salaryMax && !filter.scoreMin && !filter.scoreMax)
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
    },
    filter,
    setFilter: async (data) => {
      filterRef.current = data
      setFilter(data)
      reFetch()
    },
    sortType,
    setSortType: (sortType) => {
      sortTypeRef.current = sortType
      setSortType(sortType)
      reFetch()
    },
    filterIsEmpty: checkIsFilterEmpty(),
    reFetch,
    fetchMore: () => {
      setPage(i => i + 1)
      fetch({page: page + 1})
    },
    addToBaseMulti: async () => {
      let cvIds: number[] = []
      setIsActionLoading(true)
      if (isSelectAll) {
        if(data.total > data.data.length) {
          const cvList = await AppliesRepository.fetchForHirer(props.vacancyId, {
            ...filterRef.current,
            limit: 1000,
            page: 1,
            ...(sortTypeRef.current ? {sort: getSortParam(sortTypeRef.current!)} : {}),
          })
          cvIds = cvList.data.map(i => i.id)
        }else{
          cvIds = data.data.map(i => i.id)
        }
      } else {
        cvIds = selectedIds
      }
      await CandidateRepository.createMulti(cvIds)
      favoriteContext.refreshState$.next(true)
      setIsActionLoading(false)
    },
    inviteToJobMulti: async () => {
      let cvIds: number[] = []
      setIsActionLoading(true)
      appContext.showSidePanel(SidePanelType.InviteToJob, { total: isSelectAll ? data.total : selectedIds.length, isMulti: true, cvs:  data.data.filter(i => selectedIds.includes(i.id)), allAppliesToVacancy: isSelectAll, appliedVacancyId: props.vacancyId } as JobInviteSidePanelArguments)

      setIsActionLoading(false)
    },
    moveToStageMulti: async (hiringStageId: number)=> {
      setIsActionLoading(true)
      try {
        const res = await HiringBoardRepository.multipleMoveToStage({
          all: isSelectAll,
          cvsIds: selectedIds,
          hiringStageId,
          vacancyId: props.vacancyId
        })
        await reFetch()
      }catch (err) {
        if(err instanceof  RequestError){
          appContext.showSnackbar(err.message, SnackbarType.error)
        }
      }
      setIsActionLoading(false)
    },
    rejectMulti: async ()=> {
      setIsActionLoading(true)
      try {
        const res = await HiringBoardRepository.multipleReject({
          all: isSelectAll,
          cvsIds: selectedIds,
          vacancyId: props.vacancyId
        })
        await reFetch()
      }catch (err) {
        if(err instanceof  RequestError){
          appContext.showSnackbar(err.message, SnackbarType.error)
        }
      }
      setIsActionLoading(false)
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
