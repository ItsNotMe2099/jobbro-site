import NoDataSvg from '@/components/svg/NoDataSvg'
import styles from './index.module.scss'
import { ReactElement } from 'react'

interface Props {
  title: string
  text: string | ReactElement
  btn: ReactElement
}

export default function NoData(props: Props) {

  return (
    <div className={styles.root}>
      <NoDataSvg />
      <div className={styles.left}>
        <div className={styles.title}>
          {props.title}
        </div>
        <div className={styles.text}>
          {props.text}
        </div>
        {props.btn}
      </div>
    </div>
  )
}
