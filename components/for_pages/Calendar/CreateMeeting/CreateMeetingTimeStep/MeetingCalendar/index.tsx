import styles from './index.module.scss'
import Calendar from 'react-calendar'
import {useEffect, useState} from 'react'
import ArrowLeftSvg from '@/components/svg/ArrowLeftSvg'
import MeetingCalendarCell
  from '@/components/for_pages/Calendar/CreateMeeting/CreateMeetingTimeStep/MeetingCalendar/MeetingCalendarCell'
import {formatMonthYear, getBegin, getBeginNext, getBeginPrevious, getMonthStart} from '@/utils/date'
import { useTranslation } from 'next-i18next'
import {format} from 'date-fns'

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

const views = ['decade', 'year', 'month']

export default function MeetingCalendar(props: Props) {
  const {value, onChange} = props
  const [activeStartDate, setActiveStartDate] = useState(getMonthStart(new Date()))
  const [view, setView] = useState('month')
  const {t, i18n} = useTranslation('common')

  useEffect(() => {
    const beginOfMonth = new Date(value.getFullYear(), value.getMonth(), 1)

    setActiveStartDate(beginOfMonth)
  }, [value])

  const handlePrevClick = () => {
    setActiveStartDate(getBeginPrevious(view, activeStartDate))
  }
  const handleNextClick = () => {
    setActiveStartDate(getBeginNext(view, activeStartDate))
  }

  const handleDrillUp = () => {
    if (views.indexOf(view) === 0) {
      return
    }
    const nextView = views[views.indexOf(view) - 1]
    const nextActiveStartDate = getBegin(nextView, activeStartDate)
    setView(nextView)
    setActiveStartDate(nextActiveStartDate)
  }

  const renderLabel = (date: Date) => {
    const parts = formatMonthYear(i18n.language, date).split(' ')
    return (<>{parts[0]} <span className={styles.year}>{parts[1]}</span></>)
  }

  return (
    <div className={styles.root}>
      <div className={styles.toolbar}>
        <div className={styles.label} onClick={handleDrillUp}>{renderLabel(activeStartDate)}</div>
        <div className={styles.arrows}>
          <div className={styles.arrow} onClick={handlePrevClick}><ArrowLeftSvg direction='left'/></div>
          <div className={styles.arrow} onClick={handleNextClick}><ArrowLeftSvg direction='right'/></div>
        </div>
      </div>
      <Calendar
        className={styles.calendar}
        onChange={onChange}
        value={value}
        activeStartDate={activeStartDate}
        defaultActiveStartDate={activeStartDate}
        showNavigation={false}
        view={view as any}
        tileClassName={({
          activeStartDate,
          date,
          view,
        })=> {
          const slots = props.slots[format(date, 'yyyy-MM-dd')]
          return slots?.length > 0 ? styles.hasSlots : null
        }}
        tileContent={({activeStartDate, date, view}) => view === 'month' ? (
          <MeetingCalendarCell availabilities={[]} date={date}/>) : null}
      />
    </div>
  )
}

