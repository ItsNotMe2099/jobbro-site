import styles from './index.module.scss'
import { ReactElement } from 'react'
import Layout from '@/components/layout/Layout'
import { MyEvents} from '../../Calendar/MyEvents'

interface Props {
  children?: ReactElement | ReactElement[]
}

const ProfileCalendarInner = (props: Props) => {
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
export default ProfileCalendarInner
export const ProfileCalendar = (page: ReactElement) => <ProfileCalendarInner>{page}</ProfileCalendarInner>
