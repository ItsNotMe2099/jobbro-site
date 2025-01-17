import {createContext, useContext, useEffect, useRef, useState} from 'react'
import {Goal, SnackbarType} from 'types/enums'
import {debounce} from 'debounce'
import {RequestError} from 'types/types'
import {useAppContext} from 'context/state'
import {CandidateAddedStoreType} from '@/data/interfaces/CandidateAddedStoreType'
import CandidateRepository from '@/data/repositories/CandidateRepository'
import Analytics from '@/utils/goals'
import showToast from '@/utils/showToast'
import useTranslation from 'next-translate/useTranslation'
import {Subject} from 'rxjs'

const tmpList: number[] = []

const initStore: CandidateAddedStoreType = [] as CandidateAddedStoreType

interface IState {
  store: CandidateAddedStoreType
  addRecord(id: number): void
  like(id: number): void
  unlike(id: number): void
  refreshState$: Subject<boolean>,

}

const refreshState$ = new Subject<boolean>()
const defaultValue: IState = {
  store: initStore,
  addRecord() {},
  like() {},
  unlike() {},
  refreshState$
}

const CandidateAddedContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode
}

export function CandidateAddedWrapper(props: Props) {
  const appContext = useAppContext()
  const {t} = useTranslation()
  const [store, setStore] = useState<CandidateAddedStoreType>(initStore)
  const isLogged = appContext.isLogged
  const isLoggedRef = useRef<boolean>(isLogged)
  const storeRef = useRef<CandidateAddedStoreType>(store)

  useEffect(() => {
    storeRef.current = store
  }, [store])

  useEffect(() => {
    if (!isLoggedRef.current && isLogged) {
      debouncedSave()
    }
    if (isLoggedRef.current && !isLogged) {
      setStore(initStore)
    }
    isLoggedRef.current = isLogged
  }, [isLogged])

  const debouncedSave = debounce(async () => {
    if (isLoggedRef.current && tmpList.length > 0) {
      const likes = await CandidateRepository.fetchAdded(tmpList)
      tmpList.length = 0
      if (likes) {
        setStore(join(store, likes))
      }
    }
  }, 500)
  const value: IState = {
    ...defaultValue,
    store,
    addRecord(id: number) {
      tmpList.push(id)
      debouncedSave()
    },
    async like(id: number) {
      setStore(join(storeRef.current, [id]))
      try {
        await CandidateRepository.create(id)
        showToast({title: t('toast_candidate_added_title'), text: t('toast_candidate_added_desc')})

        Analytics.goal(Goal.CandidateBaseAdd)
      } catch (err) {
        if (err instanceof RequestError) {
          appContext.showSnackbar(err.message, SnackbarType.error)
        }
      }
    },
    async unlike(id: number) {
      setStore(storeRef.current.filter(item => item != id))
      try {
        await CandidateRepository.delete(id)
        showToast({title: t('toast_candidate_deleted_title'), text: t('toast_candidate_deleted_desc')})

      } catch (err) {
        if (err instanceof RequestError) {
          appContext.showSnackbar(err.message, SnackbarType.error)
        }
      }
    },
  }

  return (
    <CandidateAddedContext.Provider value={value}>
      {props.children}
    </CandidateAddedContext.Provider>
  )
}

export function useCandidateAddedContext() {
  return useContext(CandidateAddedContext)
}

function join(a: CandidateAddedStoreType, b: CandidateAddedStoreType): CandidateAddedStoreType{
  return Array.from(new Set([...a, ...b]))
}
