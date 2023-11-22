import styles from './index.module.scss'
import { ReactElement } from 'react'
import classNames from 'classnames'


interface Props {
  left?: ReactElement | ReactElement[]
  right?: ReactElement | ReactElement[]
}

export default function FilterToolbar(props: Props) {

  return (
    <div className={styles.root}>
      <div className={classNames(styles.left)}>
        {props.left}
      </div>
      <div className={classNames(styles.right)}>
        {props.right}
      </div>
    </div>
  )
}
