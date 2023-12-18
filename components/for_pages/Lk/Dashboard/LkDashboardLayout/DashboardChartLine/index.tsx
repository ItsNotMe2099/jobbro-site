import styles from './index.module.scss'
import Image from 'next/image'
import classNames from 'classnames'

interface Props {
  value: number
  label: string
  className?: string
}
export default function DashboardChartLine(props: Props) {


  return (
    <div className={classNames(styles.root, props.className)}>
      <div className={styles.wrapper}>
        <div className={styles.value}>{props.value}</div>
        <Image className={styles.img} width={135} height={84} src={'/img/icons/dashboard-line-chart.png'} alt=''  />
      </div>

      <div className={styles.label}>{props.label}</div>
    </div>
  )
}

