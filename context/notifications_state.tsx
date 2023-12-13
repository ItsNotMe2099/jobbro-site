import {
  INotificationRecord,
  NotificationType,
  NotificationUnreadStoreType,
  NotificationUnreadType
} from 'data/interfaces/INotification'
import { INotificationStats, INotificationStatsItem } from 'data/interfaces/INotificationStats'
import NotificationRepository from 'data/repositories/NotificationRepository'
import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { useAppContext } from 'context/state'
import useInterval from 'use-interval'
import useWindowFocus from 'use-window-focus'
import { Timers } from 'types/constants'
import { useNetworkStatus } from 'use-network-status'
import { debounce, uniqBy } from 'lodash'
type ByTypes = { [key: NotificationType | string]: number }

const initStore = {
  application: [],
  proposal: [],
  cv: [],
  vacancy: [],
  message: [],
}
const tmpList: INotificationRecord[] = []
const markReadList: { id: number, recordId: number, type: NotificationUnreadType, shallow?: boolean }[] = []
const deleteRecordList: { id: number, recordId: number, type: NotificationUnreadType, time: Date }[] = []
interface IState {
  store: NotificationUnreadStoreType,
  addRecord(id: number, type: NotificationUnreadType): void
  addRecords(ids: number[], type: NotificationUnreadType): void
  removeRecord(id: number, type: NotificationUnreadType): void
  removeRecords(id: number[], type: NotificationUnreadType): void
  removeRecordsByType(type: NotificationUnreadType): void
  markRead(id: number, type: NotificationUnreadType, shallow?: boolean): void
  items: INotificationStatsItem[]
  total: number,
  byTypes: ByTypes
  mutate: () => void
  getTotalByTypes: (types: NotificationType[]) => number
}


const defaultValue: IState = {
  store: initStore,
  addRecord: () => { },
  addRecords: () => { },
  removeRecord: () => { },
  removeRecords: () => { },
  removeRecordsByType: () => { },
  markRead: () => { },
  items: [],
  total: 0,
  byTypes: {},
  mutate: () => { },
  getTotalByTypes: (types) => 0
}

const NotificationStateContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode
}
export function NotificationWrapper(props: Props) {
  const appContext = useAppContext()
  const windowFocused = useWindowFocus()
  const isOnline = useNetworkStatus()
  const isLogged = appContext.isLogged
  const isLoggedRef = useRef<boolean>(isLogged)
  const [store, setStore] = useState<NotificationUnreadStoreType>({ ...initStore })
  const storeRef = useRef<NotificationUnreadStoreType>(store)
  const [stats, setStats] = useState<INotificationStats>({ items: [], total: 0 })
  const mutate = () => {
    if (!isLoggedRef.current) {
      return
    }
    NotificationRepository.fetchStats().then(i => setStats(i))
  }

  useEffect(() => {
    storeRef.current = store
  }, [store])

  useEffect(() => {
    if (!isLoggedRef.current && isLogged) {
      debouncedSave()
    }
    if (isLoggedRef.current && !isLogged) {
      setStore({ ...initStore })
    }
    isLoggedRef.current = isLogged
    if(isLogged){
      mutate()
    }
  }, [isLogged])
  useInterval(() => {
    mutate()
  }, Timers.notificationsRefresh)
  useEffect(() => {
    if (windowFocused || isOnline) {
      mutate()
    }
  }, [windowFocused, isOnline])
  const byTypes = useMemo(() => {
    const val: ByTypes = {}
    for (const item of stats.items) {
      val[item.type] = item.count
    }
    return val
  }, [stats])


  const getTotalByType = (type: NotificationType) => {
    return stats.items.find((i) => i.type === type)?.count || 0
  }
  const getTotalByTypes = (types: NotificationType[]) => {
    return stats.items.filter((i) => types.includes(i.type)).reduce((a, b) => a + b.count, 0) || 0
  }

  const debouncedSave = debounce(async () => {
    console.log('DealOffer1Save', tmpList)
    if (isLoggedRef.current && tmpList.length > 0) {
      const list = await NotificationRepository.fetchStatus(tmpList)
      if (list) {
        setStore(join({ ...storeRef.current }, list))
      }
    }
  }, 500)
  const debouncedMarkRead = debounce(async () => {

    if (isLoggedRef.current && markReadList.length > 0) {
      const notificationIds = markReadList.map(i => i.id)
      const notificationIdsToRemove = markReadList.filter(i => !i.shallow).map(i => i.id)
      NotificationRepository.setReadByIds(notificationIds)

      const keys = Object.keys(store) as NotificationUnreadType[]
      const newStore = { ...storeRef.current }
      for (const key of keys) {
        newStore[key] = store[key].filter(i => !notificationIdsToRemove.includes(i.id))
      }
      for (const mark of markReadList) {
        const index = tmpList.findIndex(i => i.type === mark.type && i.id === mark.recordId)
        if (index >= 0) {
          tmpList.splice(index, 1)
        }
      }
      markReadList.length = 0
      setStore(newStore)
    }
  }, 500)
  const debouncedDeleteRecord = debounce(async () => {
    const toDeletedRecordList =  deleteRecordList.filter((i) => tmpList.find(a => i.time?.getTime() > a.time.getTime()))
    const notificationIds = toDeletedRecordList.filter(i => i.id !== 0).map(i => i.id)
    const keys = Object.keys(store) as NotificationUnreadType[]
    const newStore = { ...storeRef.current }
    for (const key of keys) {
      newStore[key] = store[key].filter(i => !notificationIds.includes(i.id))
    }
    for (const mark of toDeletedRecordList) {
      const index = tmpList.findIndex(i => i.type === mark.type && i.id === mark.recordId)
      if (index >= 0) {
        tmpList.splice(index, 1)
      }
    }

    console.log('DealOffer1Delete', tmpList)
    setStore(newStore)
    deleteRecordList.length = 0
  }, 200)
  const value: IState = {
    store,
    addRecord(id: number, type: NotificationUnreadType) {

      console.log('DealOffer1Add0', tmpList)
      if (!tmpList.find(i => i.id === id && i.type === type)) {
        tmpList.push({ id, type, time: new Date() })
        debouncedSave()
      }
    },
    removeRecord(recordId: number, type: NotificationUnreadType) {
      const inStore = store[type].filter(i => i.eId === recordId)
      for (const item of inStore) {
        deleteRecordList.push({ recordId, type, id: item.id, time: new Date() })
      }
      const inTmpList = tmpList.filter(i => i.id === recordId && i.type === type)
      for (const item of inTmpList) {
        deleteRecordList.push({ id: 0, type, recordId: item.id, time: new Date() })
      }
      debouncedDeleteRecord()
    },
    removeRecords(ids: number[], type: NotificationUnreadType) {
      const inStore = store[type].filter(i => ids.includes(i.eId))
      for (const item of inStore) {
        deleteRecordList.push({ recordId: item.eId, type, id: item.id, time: new Date() })
      }
      const inTmpList = tmpList.filter(i =>  ids.includes(i.id) && i.type === type)
      for (const item of inTmpList) {
        deleteRecordList.push({ id: 0, type, recordId: item.id, time: new Date() })
      }
      debouncedDeleteRecord()
    },
    removeRecordsByType(type: NotificationUnreadType) {
      const inStore = store[type]
      for (const item of inStore) {
        deleteRecordList.push({ recordId: item.eId, type, id: item.id, time: new Date()})
      }
      const inTmpList = tmpList.filter(i => i.type === type)
      for (const item of inTmpList) {
        deleteRecordList.push({ id: 0, type, recordId: item.id, time: new Date() })
      }
      debouncedDeleteRecord()
    },
    addRecords(ids: number[], type: NotificationUnreadType) {
      for (const id of ids) {
        if (!tmpList.find(i => i.id === id && i.type === type)) {
          tmpList.push({ id, type, time: new Date() })
        }
      }
      debouncedSave()
    },
    markRead(recordId: number, type: NotificationUnreadType, shallow?: boolean) {
      const inStore = store[type].filter(i => i.eId === recordId)
      for (const item of inStore) {
        markReadList.push({ recordId, type, id: item.id, shallow })
      }
      debouncedMarkRead()
    },
    items: stats.items,
    total: stats.total,
    mutate,
    byTypes,
    getTotalByTypes,
  }

  return (
    <NotificationStateContext.Provider value={value}>
      {props.children}
    </NotificationStateContext.Provider>
  )
}

export function useNotificationContext() {
  return useContext(NotificationStateContext)
}

function join(a: NotificationUnreadStoreType, b: NotificationUnreadStoreType): NotificationUnreadStoreType {
  const result: NotificationUnreadStoreType = { ...initStore }
  for (let type in NotificationUnreadType) {
    const listA = a[type as NotificationUnreadType] ?? []
    const listB = b[type as NotificationUnreadType] ?? []
    result[type as NotificationUnreadType] = Array.from(new Set([...listA, ...listB]))
  }
  const keys = Object.keys(result) as NotificationUnreadType[]
  for (const key of keys) {
    result[key] = uniqBy(result[key], (e) => {
      return `${e.eId}.${e.id}`
    })
  }
  return result
}
