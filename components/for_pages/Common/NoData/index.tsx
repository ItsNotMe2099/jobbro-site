import NoDataSvg from '@/components/svg/NoDataSvg'
import styles from './index.module.scss'
import { ReactElement } from 'react'
import Button from '@/components/ui/Button'

interface Props {
  title: string
  text: string | ReactElement
  btn?: ReactElement | string
  btnHref?: string
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
        <div>{typeof props.btn === 'string' ? <Button href={props.btnHref ?? '#'}  styleType='large' color='green'>
          {props.btn}
        </Button>: props.btn}</div>
      </div>
    </div>
  )
}
