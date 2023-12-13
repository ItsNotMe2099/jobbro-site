import styles from './index.module.scss'
import {useEffect, useState} from 'react'
import { getMonthStart} from '@/utils/date'
import { useTranslation } from 'next-i18next'
import {format} from 'date-fns'
import CalendarToolbar from '@/components/for_pages/Common/Calendar/CalendarToolbar'
import EventCalendar from '@/components/ui/EventCalendar'

interface Props {
  onChange: (value: Date) => void,
  value: Date,
  slots: {
    [key: string]: {
      start: string
      end: string
    }[]
  }
}

export default function CreateMeetingCalendar(props: Props) {
  const {value, onChange} = props
  const [activeStartDate, setActiveStartDate] = useState(getMonthStart(new Date()))
  const [view, setView] = useState('month')
  const {t, i18n} = useTranslation('common')

  useEffect(() => {
    const beginOfMonth = new Date(value.getFullYear(), value.getMonth(), 1)
    setActiveStartDate(beginOfMonth)
  }, [value])


  return (
    <div className={styles.root}>
      <CalendarToolbar onChangeDate={(date) => setActiveStartDate(date) } currentDate={activeStartDate}/>
      <EventCalendar
        onChange={(value) => onChange(value! as Date)}
        value={value}
        activeStartDate={activeStartDate}
        defaultActiveStartDate={activeStartDate}
        showNavigation={false}
        view={'month'}
        tileClassName={({
          activeStartDate,
          date,
          view,
        })=> {
          const slots = props.slots[format(date, 'yyyy-MM-dd')]
          return slots?.length > 0 ? styles.hasSlots : null
        }}
      />
    </div>
  )
}

