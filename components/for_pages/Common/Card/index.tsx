import styles from './index.module.scss'
import { ReactElement } from 'react'
import classNames from 'classnames'

interface Props {
  title?: string | ReactElement
  children: ReactElement | ReactElement[] | boolean
  className?: string
}

export default function Card(props: Props) {

  return (
    <div className={classNames(styles.root, props.className)}>
      {props.title && <div className={styles.title}>
        {props.title}
      </div>}
      {props.children}
    </div>
  )
}
