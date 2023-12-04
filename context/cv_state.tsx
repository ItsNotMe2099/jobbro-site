import {createContext, useContext, useEffect, useState} from 'react'
import {ICV} from '@/data/interfaces/ICV'
import { Nullable} from '@/types/types'
import {useAppContext} from '@/context/state'
import CvOwnerRepository from '@/data/repositories/CvOwnerRepository'

interface IState {
  cvId: number | undefined,
  cv: Nullable<ICV>,
  loading: boolean
  fetch: () => Promise<Nullable<ICV>>
}

const defaultValue: IState = {
  cvId: 0,
  cv: null,
  loading: false,
  fetch: async () => null,

}

const CvContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode,
  cvId?: number,
  cv?: Nullable<ICV>,
}

export function CvWrapper(props: Props) {
  const appContext = useAppContext()
  const [cv, setCv] = useState<Nullable<ICV>>(props.cv as Nullable<ICV>)
  const [loading, setLoading] = useState<boolean>(true)
  useEffect(() => {
    setCv(props.cv as Nullable<ICV>)
    setLoading(false)
  }, [props.cv])
  const fetch = async (): Promise<Nullable<ICV>> => {
    try {
      const res = await CvOwnerRepository.fetchById(props.cvId!)
      setCv(res)
      return res
    }catch (e) {
      console.error(e)
      return null
    }
  }
  useEffect(() => {
    if (!props.cv) {
      setLoading(true)
      fetch().then((i) => setLoading(false))
    }
  }, [props.cvId, props.cv])

  const value: IState = {
    ...defaultValue,
    cv,
    cvId: props.cvId,
    loading,
    fetch,
  }
  return (
    <CvContext.Provider value={value}>
      {props.children}
    </CvContext.Provider>
  )
}

export function useCvContext() {
  return useContext(CvContext)
}
