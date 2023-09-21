import styles from './index.module.scss'
import { ReactElement } from 'react'

interface Props {
  title: string | ReactElement
  children: ReactElement | ReactElement[]
}

export default function Card(props: Props) {

  return (
    <div className={styles.root}>
      <div className={styles.title}>
        {props.title}
      </div>
      {props.children}
    </div>
  )
}
