import {createContext, useContext, useEffect, useRef, useState} from 'react'
import IEvent from '@/data/interfaces/IEvent'
import EventRepository from '@/data/repositories/EventRepository'
import {useAppContext} from '@/context/state'

interface IState {
  loading: boolean,
  events: IEvent[]
}

const defaultValue: IState = {
  loading: false,
  events: []
}
const EventListContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode
}

export function EventListWrapper(props: Props) {
  const appContext = useAppContext()
  const [events, setEvents] = useState<IEvent[]>([])
 const [loading, setLoading] = useState(false)

  const isLogged = appContext.isLogged
  const isLoggedRef = useRef<boolean>(isLogged)
  const fetchEvents = async (): Promise<IEvent[]> => {
    return EventRepository.fetchConfirmed()
  }
  const fetch = async () => {
    if (!isLoggedRef.current) {
      return
    }
    setLoading(true)
    const res = await fetchEvents()
    setEvents(res)
    setLoading(false)
   }

  useEffect(() => {
    fetch()
  }, [])

  useEffect(() => {
      console.log('IsLogged', isLogged, isLoggedRef.current)
    if (isLoggedRef.current && !isLogged) {
      setEvents([])
    }
    isLoggedRef.current = isLogged
    if(isLogged){
      fetch()
    }
  }, [isLogged])

  const value: IState = {
    ...defaultValue,
    events,
    loading,
  }

  return (
    <EventListContext.Provider value={value}>
      {props.children}
    </EventListContext.Provider>
  )
}

export function useEventListContext() {
  return useContext(EventListContext)
}
