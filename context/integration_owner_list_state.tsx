import {createContext, useContext, useEffect, useRef, useState} from 'react'
import {useAppContext} from '@/context/state'
import {CanceledError} from 'axios'
import IntegrationProfileOwnerRepository from '@/data/repositories/IntegrationProfileOwnerRepository'
import {IIntegrationProfileListRequest} from '@/data/interfaces/IIntegrationProfileListRequest'
import {IIntegrationProfile} from '@/data/interfaces/IIntegrationProfile'

export interface IIntegrationFilter extends IIntegrationProfileListRequest {
}

interface IState {
  data: IIntegrationProfile[]
  isLoaded: boolean
  isLoading: boolean
  filter: IIntegrationFilter
  setFilter: (data: IIntegrationFilter) => void
  reFetch: () => Promise<IIntegrationProfile[]>
}

const defaultValue: IState = {
  data: [],
  isLoaded: false,
  isLoading: false,
  filter: {},
  setFilter: (data: IIntegrationFilter) => null,
  reFetch: async () => ([]),
}

const IntegrationListOwnerContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode
  limit?: number
}

export function IntegrationListOwnerWrapper(props: Props) {
  const appContext = useAppContext()
  const [data, setData] = useState<IIntegrationProfile[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [filter, setFilter] = useState<IIntegrationFilter>({})
  const filterRef = useRef<IIntegrationFilter>(filter)
  const abortControllerRef = useRef<AbortController | null>(null)

  const limit = props.limit ?? 20
  const init = async () => {
    await Promise.all([fetch()])
    setIsLoaded(true)
  }
  useEffect(() => {
    const subscriptionCreate = appContext.integrationCreateState$.subscribe((integration) => {
      reFetch()
    })
    const subscriptionUpdate = appContext.integrationUpdateState$.subscribe((integration) => {
      setData(i => i.map(i => i.id == integration.id ? ({...i, ...integration}) : i))
    })
    const subscriptionDelete = appContext.integrationDeleteState$.subscribe((integration) => {
      if (data.find(i => i.id === integration.id)) {
        setData((i) => i.filter((i) => i.id !== integration.id))
      }
    })
    return () => {
      subscriptionCreate.unsubscribe()
      subscriptionUpdate.unsubscribe()
      subscriptionDelete.unsubscribe()
    }
  }, [data])
  const fetch = async ({page}: { page: number } = {page: 1}): Promise<IIntegrationProfile[]> => {
    setIsLoading(true)
    let res: IIntegrationProfile[] = []
    if (abortControllerRef.current) {
      abortControllerRef.current?.abort()
    }
    abortControllerRef.current = new AbortController()
    try {
       res = await IntegrationProfileOwnerRepository.fetch({
        ...filterRef.current,
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
    setData([])
    setIsLoaded(false)
    return fetch({page: 1})
  }
  const value: IState = {
    ...defaultValue,
    isLoaded,
    isLoading,
    data,
    filter,
    setFilter: async (data) => {
      filterRef.current = data
      setFilter(data)
      reFetch()
    },
    reFetch,
  }


  return (
    <IntegrationListOwnerContext.Provider value={value}>
      {props.children}
    </IntegrationListOwnerContext.Provider>
  )
}

export function useIntegrationListOwnerContext() {
  return useContext(IntegrationListOwnerContext)
}
