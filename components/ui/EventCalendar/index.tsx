import styles from './index.module.scss'
import Calendar, {CalendarProps} from 'react-calendar'
import classNames from 'classnames'

interface Props extends CalendarProps{

}


export default function EventCalendar(props: Props) {
  return (
      <Calendar
        className={classNames(styles.calendar, props.className)}
        {...props}
      />
  )
}

