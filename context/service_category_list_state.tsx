import {createContext, useContext, useRef, useState} from 'react'
import {IServiceCategory} from '@/data/interfaces/IServiceCategory'
import {useAppContext} from '@/context/state'
import {CanceledError} from 'axios'
import {IServiceCategoryListRequest} from '@/data/interfaces/IServiceCategoryListRequest'
import ServiceCategoryRepository from '@/data/repositories/ServiceCategoryRepository'
import {Nullable} from '@/types/types'

export interface IServiceCategoryFilter extends IServiceCategoryListRequest {
}

interface IState {
  data: IServiceCategory[]
  isLoaded: boolean
  isLoading: boolean
  reFetch: () => Promise<IServiceCategory[]>
  fetchMore: () => void
}

const defaultValue: IState = {
  data: [],
  isLoaded: false,
  isLoading: false,
  reFetch: async () => [],
  fetchMore: () => null
}

const ServiceCategoryListOwnerContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode
  limit?: number
  categoryId?: Nullable<number> | undefined
}

export function ServiceCategoryListOwnerWrapper(props: Props) {
  const appContext = useAppContext()
  const [data, setData] = useState<IServiceCategory[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)
  const abortControllerRef = useRef<AbortController | null>(null)

  const limit = props.limit ?? 20
  const init = async () => {
    await Promise.all([fetch()])
    setIsLoaded(true)
  }

  const fetch = async ({page}: { page: number } = {page: 1}): Promise<IServiceCategory[]> => {
    setIsLoading(true)
    let res: IServiceCategory[] = []
    if (abortControllerRef.current) {
      abortControllerRef.current?.abort()
    }
    abortControllerRef.current = new AbortController()
    try {
      res = await ServiceCategoryRepository.fetch({
      ...(props.categoryId ? {categoryId: props.categoryId} : {}),
      }, {signal: abortControllerRef.current?.signal})
      setData(res)

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
    setData([])
    setIsLoaded(false)
    return fetch({page: 1})
  }
  const value: IState = {
    ...defaultValue,
    isLoaded,
    isLoading,
    data,
    reFetch,
    fetchMore: () => {
      setPage(i => i + 1)
      fetch({page: page + 1})
    }
  }


  return (
    <ServiceCategoryListOwnerContext.Provider value={value}>
      {props.children}
    </ServiceCategoryListOwnerContext.Provider>
  )
}

export function useServiceCategoryListOwnerContext() {
  return useContext(ServiceCategoryListOwnerContext)
}
