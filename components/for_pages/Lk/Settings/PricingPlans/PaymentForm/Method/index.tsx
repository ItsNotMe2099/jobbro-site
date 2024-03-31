import { ReactElement } from 'react'
import styles from './index.module.scss'
import classNames from 'classnames'


interface Props {
  icon: ReactElement
  name: string
  active: boolean
  onClick: () => void
}

export default function Method(props: Props) {

  return (
    <div onClick={props.onClick} className={classNames(styles.root, { [styles.active]: props.active })}>
      {props.icon}
      <div className={styles.name}>{props.name}</div>
    </div>
  )
}
