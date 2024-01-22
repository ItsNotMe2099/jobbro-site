import {createContext, useContext, useEffect, useRef, useState} from 'react'
import {useAppContext} from 'context/state'
import {ICVEvaluation} from '@/data/interfaces/ICVEvaluation'
import CvEvaluationRepository from '@/data/repositories/CvEvaluationRepository'
import {ProfileType} from '@/data/enum/ProfileType'
import {useDebouncedCallback} from 'use-debounce'
import {debounce} from 'lodash'
import {Nullable} from '@/types/types'
import useInterval from 'use-interval'

const tmpList: { cvId: number, vacancyId: number, time: Date }[] = []
type CvEvaluationStoreType = { [key: string]: { evaluation: Nullable<ICVEvaluation> } }
const initStore: CvEvaluationStoreType = {} as CvEvaluationStoreType
const deleteRecordList: { cvId: number, vacancyId: number, time: Date }[] = []
const refreshList: { cvId: number, vacancyId: number, time: Date }[] = []

interface IState {
  store: CvEvaluationStoreType

  addRecord(cvId: number, vacancyId: number): void
  removeRecord(cvId: number, vacancyId: number): void
}

const defaultValue: IState = {
  store: initStore,
  addRecord() {
  },
  removeRecord(){}
}

const CvEvaluationContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode
}

export function CvEvaluationWrapper(props: Props) {
  const appContext = useAppContext()
  const [store, setStore] = useState<CvEvaluationStoreType>(initStore)
  const isLogged = appContext.isLogged
  const isLoggedRef = useRef<boolean>(isLogged)
  const storeRef = useRef<CvEvaluationStoreType>(store)

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

  useInterval(async () => {
    if(!refreshList.length){
      return
    }
    const keys = Array.from(new Set(refreshList.map((item) => `${item.cvId}:${item.vacancyId}`)))

    const res = await CvEvaluationRepository.fetchEvaluated({
      cvVacancies: keys.map((i) => {
        const spl = i.split(':').map(i => parseInt(i, 10))
        return {cvId: spl[0], vacancyId: spl[1]}
      })})
    for(const item of res){
      const index = refreshList.findIndex(i => i.cvId === item.cvId && i.vacancyId === item.vacancyId)
      if (index >= 0) {
        refreshList.splice(index, 1)
      }
    }

    setStore(join(store, convertToStore(res)))
  }, 5000)

  const debouncedSave = useDebouncedCallback(
    async () => {
      if (abortFetchControllerRef.current) {
        abortFetchControllerRef.current?.abort()
      }
      abortFetchControllerRef.current = new AbortController()
      if (isLoggedRef.current && tmpList.length > 0) {
        const keys = Array.from(new Set(tmpList.map((item) => `${item.cvId}:${item.vacancyId}`)))

        abortFetchControllerRef.current = new AbortController()
        const res = await CvEvaluationRepository.fetchEvaluated({
          cvVacancies: keys.map((i) => {
            const spl = i.split(':').map(i => parseInt(i, 10))
            return {cvId: spl[0], vacancyId: spl[1]}
          })
        }, {signal: abortFetchControllerRef.current?.signal})
        tmpList.length = 0
        if (res) {
          const newStore = convertToStore(res)
          for (const key of keys) {
            if (!newStore[key]) {
              newStore[key] = {evaluation: null}
              if (!refreshList.find(i => `${i.cvId}:${i.vacancyId}` === key)) {
                const spl = key.split(':').map(i => parseInt(i, 10))
                refreshList.push({cvId: spl[0], vacancyId: spl[1], time: new Date()})
              }
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
    const toDeletedRecordList = deleteRecordList.filter((i) => tmpList.find(a => i.time?.getTime() > a.time.getTime()))
    const newStore = {...storeRef.current}

    for (const mark of toDeletedRecordList) {
      delete newStore[`${mark.cvId}:${mark.vacancyId}`]
      const indexTmp = tmpList.findIndex(i => i.cvId === mark.cvId && i.vacancyId === mark.vacancyId)
      if (indexTmp >= 0) {
        tmpList.splice(indexTmp, 1)
      }
      const indexRefresh = tmpList.findIndex(i => i.cvId === mark.cvId && i.vacancyId === mark.vacancyId)
      if (indexRefresh >= 0) {
        refreshList.splice(indexRefresh, 1)
      }
    }
    storeRef.current = newStore
    setStore(newStore)
    deleteRecordList.length = 0
  }, 200)
  const value: IState = {
    ...defaultValue,
    store,
    addRecord(cvId: number, vacancyId: number) {
      if (!appContext.isLogged || appContext.aboutMe?.profileType !== ProfileType.Hirer) {
        return
      }
      tmpList.push({cvId, vacancyId, time: new Date()})
      debouncedSave()
    },
    removeRecord(cvId: number, vacancyId: number) {
      const inStore = store[`${cvId}:${vacancyId}`]

      const inTmp = tmpList.find(i => i.cvId === cvId && i.vacancyId === vacancyId)
      const inRefresh = refreshList.find(i => i.cvId === cvId && i.vacancyId === vacancyId)

      if ((!!inStore || !!inTmp || !!inRefresh) && !deleteRecordList.find((i) => i.cvId === cvId && i.vacancyId === vacancyId)) {
        deleteRecordList.push({cvId, vacancyId, time: new Date()})
      }

      debouncedDeleteRecord()
    },

  }

  return (
    <CvEvaluationContext.Provider value={value}>
      {props.children}
    </CvEvaluationContext.Provider>
  )
}

export function useCvEvaluationContext() {
  return useContext(CvEvaluationContext)
}

function join(a: CvEvaluationStoreType, b: CvEvaluationStoreType): CvEvaluationStoreType {
  return {...a, ...b}
}

function convertToStore(data: ICVEvaluation[]): CvEvaluationStoreType {
  return data.reduce((ac, a) => ({
    ...ac,
    [`${a.cvId}:${a.vacancyId}`]: {evaluation: a}
  }), {} as CvEvaluationStoreType)
}
