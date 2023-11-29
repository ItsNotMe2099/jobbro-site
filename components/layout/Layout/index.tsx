import { ReactElement } from 'react'
import Header from 'components/layout/Header'
import styles from 'components/layout/Layout/index.module.scss'
import Footer from 'components/layout/Footer'
import { useAppContext } from '@/context/state'

interface Props {
  children?: ReactElement | ReactElement[]
}

export default function Layout(props: Props) {

  const appContext = useAppContext()

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
