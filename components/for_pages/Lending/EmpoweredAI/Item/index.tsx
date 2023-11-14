import { ReactElement } from 'react'
import styles from './index.module.scss'

interface Props {
  icon: ReactElement
  text: ReactElement | string
}

export default function Item(props: Props) {

  return (
    <div className={styles.root}>
      {props.icon}
      <div className={styles.text}>
        {props.text}
      </div>
    </div>
  )
}
