import styles from './index.module.scss'
import { ReactElement } from 'react'
import Layout from '@/components/layout/Layout'
import {MyEvents} from '@/components/for_pages/Calendar/MyEvents'

interface Props {
  children?: ReactElement | ReactElement[]
}

const LayoutWithMyEvents = (props: Props) => {
  return (
    <Layout>
      <div className={styles.root}>
        <div className={styles.container}>
          {props.children}
        </div>
        <MyEvents />
      </div>
    </Layout>
  )
}
export default LayoutWithMyEvents
