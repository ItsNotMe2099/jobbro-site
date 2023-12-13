import styles from './index.module.scss'
import * as React from 'react'
import {ReactElement} from 'react'

interface Props {
  children: ReactElement | ReactElement[] | string
}

export default function StubEmpty(props: Props) {
  return (
    <div className={styles.root}>
      {props.children}
    </div>
  )
}
