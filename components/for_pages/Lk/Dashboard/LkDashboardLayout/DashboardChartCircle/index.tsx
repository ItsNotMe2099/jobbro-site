import styles from './index.module.scss'
import {buildStyles, CircularProgressbar} from 'react-circular-progressbar'
import {colors} from '@/styles/variables'
import classNames from 'classnames'

interface Props {
  progress: number
  value: number | string
  label: string
  color: string
  suffixType: 'percent' | 'minutes'
  className?: string
}

export default function DashboardChartCircle(props: Props) {
  console.log(props.value)


  return (
    <div className={classNames(styles.root, props.className)}>
      <div className={styles.wrapper}>
        <CircularProgressbar value={props.progress}
                             styles={buildStyles({
                               rotation: 0,
                               strokeLinecap: 'round',
                               pathTransitionDuration: 0.5,
                               pathColor: props.color,
                               trailColor: colors.backgroundSecondary,
                               backgroundColor: 'transparent',
                             })}
        />
        <div className={classNames(styles.value, {[styles.vert]: props.suffixType === 'minutes', [styles.hor]: props.suffixType === 'percent'})}>
          {props.value} {props.suffixType === 'percent' && <span className={styles.percentSuffix}>%</span>}
          {props.suffixType === 'minutes' && <div className={styles.minutesSuffix}>minutes</div>}
        </div>
      </div>

      <div className={styles.label}>{props.label}</div>
    </div>
  )
}

