import { ReactElement } from 'react'
import styles from './index.module.scss'
import classNames from 'classnames'

interface Props {
  icon: ReactElement
  title: string
  text: string
  last?: boolean
}

export default function Item(props: Props) {

  return (
    <div className={styles.root}>
      <div className={styles.top}>
        {props.icon}
        <div className={styles.title}>{props.title}</div>
      </div>
      <div className={styles.bottom}>
        <div className={classNames(styles.line, { [styles.visibility]: props.last })} />
        <div className={styles.text}>{props.text}</div>
      </div>
    </div >
  )
}
