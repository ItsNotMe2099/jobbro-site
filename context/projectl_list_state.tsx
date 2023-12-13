import {createContext, useContext, useRef, useState} from 'react'
import {IProject} from '@/data/interfaces/IProject'
import {useAppContext} from '@/context/state'
import {CanceledError} from 'axios'
import {IPagination} from '@/data/interfaces/IPaginationRequest'
import {IProjectListRequest} from '@/data/interfaces/IProjectListRequest'
import ProjectRepository from '@/data/repositories/ProjectRepository'

export interface IProjectFilter extends IProjectListRequest {
}

interface IState {
  data: IPagination<IProject>
  isLoaded: boolean
  isLoading: boolean
  page: number
  setPage: (page: number) => void
  filter: IProjectFilter
  setFilter: (data: IProjectFilter) => void
  reFetch: () => Promise<IPagination<IProject>>
  fetchMore: () => void
}

const defaultValue: IState = {
  data: {data: [], total: 0},
  isLoaded: false,
  isLoading: false,
  page: 1,
  setPage: (page: number) => null,
  filter: {page: 1, limit: 10},
  setFilter: (data: IProjectFilter) => null,
  reFetch: async () => ({data: [], total: 0}),
  fetchMore: () => null
}

const ProjectListOwnerContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode
  limit?: number
}

export function ProjectListOwnerWrapper(props: Props) {
  const appContext = useAppContext()
  const [data, setData] = useState<IPagination<IProject>>({data: [], total: 0})
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)
  const [filter, setFilter] = useState<IProjectFilter>({page: 1, limit: props.limit ?? 10})
  const filterRef = useRef<IProjectFilter>(filter)
  const abortControllerRef = useRef<AbortController | null>(null)

  const limit = props.limit ?? 20
  const init = async () => {
    await Promise.all([fetch()])
    setIsLoaded(true)
  }

  const fetch = async ({page}: { page: number } = {page: 1}): Promise<IPagination<IProject>> => {
    setIsLoading(true)
    let res: IPagination<IProject> = {data: [], total: 0}
    if (abortControllerRef.current) {
      abortControllerRef.current?.abort()
    }
    abortControllerRef.current = new AbortController()
    try {
       res = await ProjectRepository.fetch({
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
    <ProjectListOwnerContext.Provider value={value}>
      {props.children}
    </ProjectListOwnerContext.Provider>
  )
}

export function useProjectListOwnerContext() {
  return useContext(ProjectListOwnerContext)
}
