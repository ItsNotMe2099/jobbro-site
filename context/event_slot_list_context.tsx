import {createContext, useContext, useEffect, useMemo, useRef, useState} from 'react'
import { addDays, format, subDays, startOfMonth, endOfMonth} from 'date-fns'
import {IAvailableSlot} from '@/data/interfaces/IEvent'
import EventRepository from '@/data/repositories/EventRepository'
import {Nullable} from '@/types/types'

interface IState {
  eventId?: number | null
  calendarLoading: boolean
  slots: IAvailableSlot[],
  rangeStartDate: Date
  rangeEndDate: Date
  currentDate: Nullable<Date>
  setRange: (start: Date, end: Date) => void,
  setCurrentDate: (date: Date) => void
  currentDateSlots: IAvailableSlot[]
}

const defaultValue: IState = {
  calendarLoading: false,
  slots: [],
  rangeStartDate: startOfMonth(new Date()),
  rangeEndDate: endOfMonth(new Date()),
  currentDate: new Date(),
  setRange: (start: Date, end: Date) => {
  },

  setCurrentDate: (date: Date) => {
  },
  currentDateSlots: []
}
const EventSlotListContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode
  eventId: number
}

export function EventSlotListWrapper(props: Props) {
  const [slots, setSlots] = useState<IAvailableSlot[]>([])
  const [rangeStartDate, setRangeStartDate] = useState<Date>(startOfMonth(new Date()))
  const [rangeEndDate, setRangeEndDate] = useState<Date>(endOfMonth(new Date()))
  const [currentDate, setCurrentDate] = useState<Date | null>(null)
  const currentDateRef = useRef<Date | null>(null)
  const slotsRef = useRef<IAvailableSlot[]>([])
  const [calendarLoading, setCalendarLoading] = useState<boolean>(false)

  useEffect(() => {
    currentDateRef.current = currentDate
  }, [currentDate])
  useEffect(() => {
    slotsRef.current = slots
  }, [slots])
  const fetchSlots = async (data: {from: string, to: string}): Promise<IAvailableSlot[]> => {
    return EventRepository.fetchEmployeeAvailableSlots(props.eventId, data)
  }
  const fetch = async (start: Date, end: Date) => {
    setCalendarLoading(true)
    const res = await fetchSlots({
      from: format(subDays(start, 6), 'yyyy-MM-dd'),
      to: format(addDays(end, 6), 'yyyy-MM-dd'),
    })
     setSlots(res)
    slotsRef.current = res
    console.log('FetchRes', res)
    if(!currentDateRef.current && res.length > 0){
      console.log('SetCurrentDate', new Date(res[0].start))
      setCurrentDate(new Date(res[0].start))
    }
   }

  useEffect(() => {
    fetch(rangeStartDate, rangeEndDate)
  }, [props.eventId])
  const currentDateSlots = useMemo(() => {
    if(!currentDate){
      return []
    }
    const formattedDate = format(currentDate, 'yyyy-MM-dd')
    return  slotsRef.current.filter(i => i.date === formattedDate)
  }, [currentDate])
  const value: IState = {
    ...defaultValue,
    calendarLoading,
    slots,
    rangeStartDate,
    rangeEndDate,
    currentDate,
    currentDateSlots,
    setRange: (start: Date, end: Date) => {
      fetch(start, end)
    },
    setCurrentDate: (date: Date) => {
      setCurrentDate(date)
    }
  }

  return (
    <EventSlotListContext.Provider value={value}>
      {props.children}
    </EventSlotListContext.Provider>
  )
}

export function useEventSlotListContext() {
  return useContext(EventSlotListContext)
}
