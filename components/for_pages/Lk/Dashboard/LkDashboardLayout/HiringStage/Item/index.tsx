import styles from './index.module.scss'
import Card from '@/components/for_pages/Common/Card'
import GraphicSvg from '@/components/svg/GraphicSvg'
import Link from 'next/link'


interface Props {
  percent: number
  total: number
  label: string
  secondPerc: number
}

export default function Item(props: Props) {

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <div className={styles.rect} style={{ height: `${props.percent}px` }} />
      </div>
      <div className={styles.percent}>
        <div className={styles.number}>
          {props.percent}
        </div>
        <div className={styles.sign}>
          %
        </div>
      </div>
      <div className={styles.label}>
        {props.label}
      </div>
      <div className={styles.separator} />
      <div className={styles.bottom}>
        <div className={styles.total}>{props.total}</div>
        <div className={styles.percent}>{props.secondPerc}%</div>
      </div>
    </div>
  )
}
