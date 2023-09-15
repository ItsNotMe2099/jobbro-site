import { ReactElement } from 'react'
import Header from '../Header'
import styles from './index.module.scss'
import { useRouter } from 'next/router'
import { Routes } from '@/types/routes'
import Footer from '../Footer'

interface Props {
  children?: ReactElement | ReactElement[]
}

export default function Layout(props: Props) {

  const router = useRouter()

  return (
    <div className={styles.root}>
      <Header />
      {props.children}
      {!router.asPath.includes(Routes.lk) && <Footer />}
    </div>
  )
}
