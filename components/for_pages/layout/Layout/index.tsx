import { ReactElement } from 'react'
import Header from '../Header'
import styles from './index.module.scss'

interface Props {
  children?: ReactElement | ReactElement[]
}

export default function Layout(props: Props) {

  return (
    <div className={styles.root}>
      <Header />
      {props.children}
    </div>
  )
}
