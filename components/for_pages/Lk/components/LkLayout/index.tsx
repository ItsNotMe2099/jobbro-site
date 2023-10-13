import Menu from '../Menu'
import styles from './index.module.scss'
import {ReactElement} from 'react'
import Layout from '@/components/layout/Layout'

interface Props {
  children?: ReactElement | ReactElement[]
}

const LkPageLayoutInner = (props: Props) => {
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
export default LkPageLayoutInner
export const LkPageLayout = (page: ReactElement) => <LkPageLayoutInner>{page}</LkPageLayoutInner>
