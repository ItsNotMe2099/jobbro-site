import classNames from 'classnames'
import styles from './index.module.scss'

interface Props {
  minTime?: Date
  value?: string|null
  onSet: (time: string) => void
  focused?: boolean
}

export default function TimePicker(props: Props) {

  const getAllTimeOptionsWithAmPm = (minTime?: Date): string[] => {
    const minHour = minTime?.getHours()||0
    const timeOptions: string[] = []
    for (let i = minHour; i < 24; i++) {
      for (let j = 0; j < 4; j++) {
        const hour = i>=13 ? i-12 : i
        const amPmTime = `${hour.toString().padStart(2, '0')}:${(j * 15).toString().padStart(2, '0')}`
        const amPm = i >= 12 ? 'pm' : 'am'
        timeOptions.push(`${amPmTime} ${amPm}`)
      }
    }
    return timeOptions
  }
  const timeOptions = getAllTimeOptionsWithAmPm(props.minTime)
  


  return (<div className={classNames(styles.root, {[styles.focused]: props.focused})}> 
    {timeOptions.map((time) => {
      const splitted: any = time.split(' ')
      return (
        <div
        className={classNames(styles.time, {
          [styles.selected]: time === props.value
        })}
        onClick={() => props.onSet&&props.onSet(time)}
        >
          <p className={styles.timeText}>{splitted[0]}</p>
          <p className={styles.timeText}>{splitted[1]}</p>
        </div>
      )
    })}

  </div>)
}