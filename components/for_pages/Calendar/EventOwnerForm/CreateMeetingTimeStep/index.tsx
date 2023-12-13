import styles from './index.module.scss'
import {useState} from 'react'
import MeetingDaySlots from '@/components/for_pages/Calendar/EventOwnerForm/CreateMeetingTimeStep/MeetingDaySlots'
import CreateMeetingCalendar
  from '@/components/for_pages/Calendar/EventOwnerForm/CreateMeetingTimeStep/CreateMeetingCalendar'
interface Props {
  values: {
    [key: string]: {
      start: string
      end: string
    }[]
  }
}

export default function CreateMeetingTimeStep(props: Props) {
  const [currentDate, setCurrentDate] = useState<Date>(new Date())
  const handleChange = (date: Date) => {
    setCurrentDate(date)
  }
  return <div className={styles.root}>
    <div  className={styles.left}>
      <CreateMeetingCalendar value={currentDate} slots={props.values} onChange={handleChange} />
    </div>
    <div  className={styles.right}>
      <MeetingDaySlots  value={currentDate} slots={props.values}/>
    </div>
  </div>
}
