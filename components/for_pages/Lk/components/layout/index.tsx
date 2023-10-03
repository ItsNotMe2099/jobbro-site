import Menu from '../Menu'
import styles from './index.module.scss'
import {ReactElement} from 'react'

interface Props {
  children?: ReactElement | ReactElement[]
}

export default function LkLayout(props: Props) {
  return (
    <div className={styles.root}>
      <Menu/>
      <div className={styles.container}>
      {props.children}
      </div>
    </div>
  )
}
