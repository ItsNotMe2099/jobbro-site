import classNames from 'classnames'
import { IAvailability } from 'data/interfaces/IAvailability'
import styles from './index.module.scss'
interface Props {
  date: Date,
  availabilities: IAvailability[]
}

const Dot = () => {
  return    <div className={classNames(styles.dot)}/>
}
export default function MeetingCalendarCell(props: Props) {
  return (
    <div className={styles.root}>
      {props.availabilities.map(item => <Dot key={item.id}/>)}
    </div>
  )
}
