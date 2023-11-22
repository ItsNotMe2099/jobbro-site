import Menu from '../Menu'
import styles from './index.module.scss'
import {ReactElement} from 'react'
import Layout from '@/components/layout/Layout'

interface Props {
  children?: ReactElement | ReactElement[]
}

const LkPageHirerLayoutInner = (props: Props) => {
  return (
    <Layout>
      <div className={styles.root}>
        <Menu/>
        <div className={styles.container}>
          {props.children}
        </div>
      </div>
    </Layout>
  )
}
export default LkPageHirerLayoutInner
export const LkPageHirerLayout = (page: ReactElement) => <LkPageHirerLayoutInner>{page}</LkPageHirerLayoutInner>
