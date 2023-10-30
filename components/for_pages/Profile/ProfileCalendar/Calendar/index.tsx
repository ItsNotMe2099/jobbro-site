import styles from './index.module.scss'
import { ReactElement } from 'react'
import Card from '@/components/for_pages/Common/Card'
import CalendarSvg from '@/components/svg/CalendarSvg'
import { colors } from '@/styles/variables'
import { format } from 'date-fns'
import CalendarPictureSvg from '@/components/svg/CalendarPictureSvg'

interface Props {
  children?: ReactElement | ReactElement[]
}

export const Calendar = (props: Props) => {
  return (
    <Card>
      <div className={styles.wrapper}>
        <div className={styles.top}>
          <div className={styles.calendar}>
            <CalendarSvg color={colors.white} />
          </div>
          <div className={styles.date}>
            {format(new Date(), 'EEEE, MMMM dd')}
          </div>
        </div>
        <div className={styles.separator} />
        <CalendarPictureSvg />
        <div className={styles.schedule}>
          No scheduled meets
        </div>
        <div className={styles.bottom}>
          Apply for any vacancy and receive<br /> an invitation for an interview
        </div>
      </div>
    </Card>
  )
}