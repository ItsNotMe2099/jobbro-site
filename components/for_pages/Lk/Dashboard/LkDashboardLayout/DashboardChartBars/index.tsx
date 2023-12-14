import styles from './index.module.scss'
import ChartBarSvg from '@/components/svg/ChartBarSvg'
import classNames from 'classnames'

interface Props {
  value: number
  label: string
  color: string
  className?: string
}
export default function DashboardChartBars(props: Props) {


  return (
    <div className={classNames(styles.root, props.className)}>
      <div className={styles.wrapper}>
        <div className={styles.value}>{props.value}</div>
        <ChartBarSvg color={props.color}/>
      </div>

      <div className={styles.label}>{props.label}</div>
    </div>
  )
}

