import styles from './index.module.scss'
import Calendar from 'react-calendar'
import {useEffect, useState} from 'react'

import {formatMonthYear, getBeginNext, getBeginPrevious, getMonthStart} from '@/utils/date'
import { useTranslation } from 'next-i18next'
import {format} from 'date-fns'
import ArrowSvg from '@/components/svg/ArrowSvg'
import {colors} from '@/styles/variables'
import IconButton from '@/components/ui/IconButton'

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

  const renderLabel = (date: Date) => {
    const parts = formatMonthYear(i18n.language, date).split(' ')
    return (<>{parts[0]} <span className={styles.year}>{parts[1]}</span></>)
  }

  return (
    <div className={styles.root}>
      <div className={styles.toolbar}>
        <IconButton bgColor={'lightGreen'} onClick={handlePrevClick}><ArrowSvg direction='left' color={colors.green}/></IconButton>
        <div className={styles.label}>{renderLabel(activeStartDate)}</div>
        <IconButton  bgColor={'lightGreen'} onClick={handleNextClick}><ArrowSvg direction='right' color={colors.green}/></IconButton>
      </div>
      <Calendar
        className={styles.calendar}
        onChange={(value) => onChange(value! as Date)}
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
      />
    </div>
  )
}

