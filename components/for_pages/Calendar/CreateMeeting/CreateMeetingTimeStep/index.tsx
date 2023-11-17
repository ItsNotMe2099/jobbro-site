import styles from './index.module.scss'
import MeetingCalendar from '@/components/for_pages/Calendar/CreateMeeting/CreateMeetingTimeStep/MeetingCalendar'
import {useState} from 'react'
import MeetingDaySlots from '@/components/for_pages/Calendar/CreateMeeting/CreateMeetingTimeStep/MeetingDaySlots'
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
      <MeetingCalendar value={currentDate} slots={props.values} onChange={handleChange} />
    </div>
    <div  className={styles.right}>
      <MeetingDaySlots  value={currentDate} slots={props.values}/>
    </div>


  </div>
}
