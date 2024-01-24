import {createContext, useContext, useEffect, useRef, useState} from 'react'
import {useAppContext} from 'context/state'
import CvEvaluationRepository from '@/data/repositories/CvEvaluationRepository'
import {ProfileType} from '@/data/enum/ProfileType'
import {useDebouncedCallback} from 'use-debounce'
import {debounce} from 'lodash'
import {Nullable} from '@/types/types'
import {ICVEvaluationSimple} from '@/data/interfaces/ICVEvaluationSimple'

type CvEvaluationStoreType = { [key: string]: { evaluation: Nullable<ICVEvaluationSimple> } }
const initStore: CvEvaluationStoreType = {} as CvEvaluationStoreType

interface IState {
  store: CvEvaluationStoreType

  addRecord(vacancyName: string): void
  removeRecord(vacancyName: string): void
}

const defaultValue: IState = {
  store: initStore,
  addRecord() {
  },
  removeRecord(){}
}

const CvEvaluationSimpleContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode
  cvTitle: string
}

export function CvEvaluationSimpleWrapper(props: Props) {
  const appContext = useAppContext()
  const [store, setStore] = useState<CvEvaluationStoreType>(initStore)
  const isLogged = appContext.isLogged
  const isLoggedRef = useRef<boolean>(isLogged)
  const storeRef = useRef<CvEvaluationStoreType>(store)
  const tmpListRef = useRef< { vacancyName: string, time: Date }[]>([])
  const deleteRecordListRef = useRef<{ vacancyName: string, time: Date }[] >([])
  const abortFetchControllerRef = useRef<AbortController | null>(null)
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

  const debouncedSave = useDebouncedCallback(
    async () => {
      if (abortFetchControllerRef.current) {
        abortFetchControllerRef.current?.abort()
      }
      abortFetchControllerRef.current = new AbortController()
      if (isLoggedRef.current && tmpListRef.current.length > 0) {
        const keys = Array.from(new Set(tmpListRef.current.map((item) => `${item.vacancyName}`)))

        abortFetchControllerRef.current = new AbortController()
        const res = await CvEvaluationRepository.fetchEvaluatedSimple({
          cvTitle: props.cvTitle,
          vacancies: keys.map((i) => ({name: i}))
        }, {signal: abortFetchControllerRef.current?.signal})
        tmpListRef.current.length = 0
        if (res) {
          const newStore = convertToStore(res)
          for (const key of keys) {
            if (!newStore[key]) {
              newStore[key] = {evaluation: null}
            }
          }
          const newStoreSet = join(storeRef.current, newStore)
          storeRef.current = newStoreSet
          setStore(newStoreSet)

        }
      }
    },
    500
  )

  const debouncedDeleteRecord = debounce(async () => {
    const toDeletedRecordList = deleteRecordListRef.current.filter((i) => tmpListRef.current.find(a => i.time?.getTime() > a.time.getTime()))
    const newStore = {...storeRef.current}

    for (const mark of toDeletedRecordList) {
      delete newStore[`${mark.vacancyName}`]
      const indexTmp = tmpListRef.current.findIndex(i => i.vacancyName === mark.vacancyName)
      if (indexTmp >= 0) {
        tmpListRef.current.splice(indexTmp, 1)
      }
    }
    storeRef.current = newStore
    setStore(newStore)
    deleteRecordListRef.current.length = 0
  }, 200)
  const value: IState = {
    ...defaultValue,
    store,
    addRecord(vacancyName: string) {
      if (!appContext.isLogged || appContext.aboutMe?.profileType !== ProfileType.Hirer) {
        return
      }
      if(store[vacancyName]){
        return
      }

      tmpListRef.current.push({ vacancyName, time: new Date()})
      debouncedSave()
    },
    removeRecord(vacancyName: string) {
      const inStore = store[`${vacancyName}`]
      const inTmp = tmpListRef.current.find(i => i.vacancyName === vacancyName)
      if ((!!inStore || !!inTmp) && !deleteRecordListRef.current.find((i) => i.vacancyName === vacancyName)) {
        deleteRecordListRef.current.push({ vacancyName, time: new Date()})
      }

      debouncedDeleteRecord()
    },

  }

  return (
    <CvEvaluationSimpleContext.Provider value={value}>
      {props.children}
    </CvEvaluationSimpleContext.Provider>
  )
}

export function useCvEvaluationSimpleContext() {
  return useContext(CvEvaluationSimpleContext)
}

function join(a: CvEvaluationStoreType, b: CvEvaluationStoreType): CvEvaluationStoreType {
  return {...a, ...b}
}

function convertToStore(data: ICVEvaluationSimple[]): CvEvaluationStoreType {
  return data.reduce((ac, a) => ({
    ...ac,
    [`${a.name}`]: {evaluation: a}
  }), {} as CvEvaluationStoreType)
}
