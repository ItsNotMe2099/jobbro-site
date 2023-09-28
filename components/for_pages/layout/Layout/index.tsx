import { ReactElement } from 'react'
import Header from '../Header'
import styles from './index.module.scss'
import Footer from '../Footer'

interface Props {
  children?: ReactElement | ReactElement[]
}

export default function Layout(props: Props) {

  return (
    <div className={styles.root}>
      <Header />
      <div className={styles.container}>
        {props.children}
      </div>
      <Footer />
    </div>
  )
}
