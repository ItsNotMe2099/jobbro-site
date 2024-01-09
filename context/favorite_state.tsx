import { createContext, useContext, useEffect, useRef, useState } from 'react'
import {  SnackbarType } from 'types/enums'
import { debounce } from 'debounce'
import FavoriteRepository from 'data/repositories/FavoriteRepository'
import {  RequestError } from 'types/types'
import { useAppContext } from 'context/state'
import {IFavoriteRecord} from '@/data/interfaces/IFavoriteRecord'
import {FavoriteStoreType} from '@/data/interfaces/FavoriteStoreType'
import {FavoriteEntityType} from '@/data/enum/FavoriteEntityType'

const tmpList: IFavoriteRecord[] = []

const initStore: FavoriteStoreType = {
  [FavoriteEntityType.vacancy]: [] as number[],
} as FavoriteStoreType

interface IState {
  store: FavoriteStoreType
  addRecord(id: number, entityType: FavoriteEntityType): void
  like(id: number, entityType: FavoriteEntityType): void
  unlike(id: number, entityType: FavoriteEntityType): void
}

const defaultValue: IState = {
  store: {...initStore},
  addRecord() {},
  like() {},
  unlike() {},
}

const FavoriteContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode
}

export function FavoriteWrapper(props: Props) {
  const appContext = useAppContext()
  const [store, setStore] = useState<FavoriteStoreType>({...initStore})
  const isLogged = appContext.isLogged
  const isLoggedRef = useRef<boolean>(isLogged)
  const storeRef = useRef<FavoriteStoreType>(store)

  useEffect(() => {
    storeRef.current = store
  }, [store])

  useEffect(() => {
    if (!isLoggedRef.current && isLogged) {
      debouncedSave()
    }
    if (isLoggedRef.current && !isLogged) {
      setStore({...initStore})
    }
    isLoggedRef.current = isLogged
  }, [isLogged])

  const debouncedSave = debounce(async () => {
    if (isLoggedRef.current && tmpList.length > 0) {
      const likes = await FavoriteRepository.fetchStatus(tmpList)
      tmpList.length = 0
      if (likes) {
        setStore(join(store, likes))
      }
    }
  }, 500)
  const value: IState = {
    ...defaultValue,
    store,
    addRecord(id: number, entityType: FavoriteEntityType) {
      tmpList.push({id, entityType})
      debouncedSave()
    },
    async like(id: number, entityType: FavoriteEntityType) {
      setStore(join(storeRef.current, {
        ...initStore,
        [entityType]: [id],
      }))
      try {
        await FavoriteRepository.create(id, entityType)
      } catch (err) {
        if (err instanceof RequestError) {
          appContext.showSnackbar(err.message, SnackbarType.error)
        }
      }
    },
    async unlike(id: number, entityType: FavoriteEntityType) {
      setStore({
        ...storeRef.current,
        [entityType]: storeRef.current[entityType].filter(item => item != id)
      })
      try {
        await FavoriteRepository.delete(id, entityType)
      } catch (err) {
        if (err instanceof RequestError) {
          appContext.showSnackbar(err.message, SnackbarType.error)
        }
      }
    },
  }

  return (
    <FavoriteContext.Provider value={value}>
      {props.children}
    </FavoriteContext.Provider>
  )
}

export function useFavoriteContext() {
  return useContext(FavoriteContext)
}

function join(a: FavoriteStoreType, b: FavoriteStoreType): FavoriteStoreType{
  const result: FavoriteStoreType = {...initStore}
  for (let type in FavoriteEntityType) {
    const listA = a[type as FavoriteEntityType] ?? []
    const listB = b[type as FavoriteEntityType] ?? []
    result[type as FavoriteEntityType] = Array.from(new Set([...listA, ...listB]))
  }
  return result
}
