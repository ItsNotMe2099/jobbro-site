import styles from './index.module.scss'
import { ReactElement } from 'react'
import CalendarPictureSvg from '@/components/svg/CalendarPictureSvg'

interface Props {
  children?: ReactElement | ReactElement[]
}

export const MyEventsEmpty = (props: Props) => {
  return (
      <div className={styles.root}>
        <CalendarPictureSvg className={styles.pic} />
        <div className={styles.schedule}>
          No scheduled meets
        </div>
        <div className={styles.bottom}>
          Apply for any vacancy and receive<br /> an invitation for an interview
        </div>
      </div>
  )
}
