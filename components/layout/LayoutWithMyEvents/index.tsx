import styles from './index.module.scss'
import { ReactElement } from 'react'
import Layout from '@/components/layout/Layout'
import {MyEvents} from '@/components/for_pages/Calendar/MyEvents'
import { useAppContext } from '@/context/state'

interface Props {
  children?: ReactElement | ReactElement[]
  hideTabbar?: boolean
}

const LayoutWithMyEvents = (props: Props) => {
  const appContext = useAppContext()
  const {isTabletWidth} = appContext.size
  return (
    <Layout hideTabbar={props.hideTabbar}>
      <div className={styles.root}>
        <div className={styles.container}>
          {props.children}
        </div>
        {!isTabletWidth &&
          <MyEvents />
        }
      </div>
    </Layout>
  )
}
export default LayoutWithMyEvents
