import styles from './index.module.scss'

import Menu from '../Menu'
import {ReactElement} from 'react'
import Layout from '@/components/layout/Layout'
import {useRouter} from 'next/router'

interface Props {
  children?: ReactElement | ReactElement[]
  hideTabbar?: boolean
}

const LkPageHirerLayoutInner = (props: Props) => {

  const router = useRouter()
  const vacancyId = parseInt(router.query.id as string, 10)
  return (
    <Layout hideTabbar={props.hideTabbar}>
      <div className={styles.root}>
        <Menu/>
        <div className={styles.container} >
          {props.children}
        </div>
      </div>
    </Layout>
  )
}
export default LkPageHirerLayoutInner
export const LkPageHirerLayout = (page: ReactElement) => <LkPageHirerLayoutInner>{page}</LkPageHirerLayoutInner>
