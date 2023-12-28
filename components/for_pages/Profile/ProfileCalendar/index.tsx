import styles from './index.module.scss'
import { ReactElement } from 'react'
import Layout from '@/components/layout/Layout'
import { MyEvents} from '../../Calendar/MyEvents'
import { useAppContext } from '@/context/state'

interface Props {
  children?: ReactElement | ReactElement[]
}

const ProfileCalendarInner = (props: Props) => {
  const {isTabletWidth} = useAppContext().size
  return (
    <Layout>
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
export default ProfileCalendarInner
export const ProfileCalendar = (page: ReactElement) => <ProfileCalendarInner>{page}</ProfileCalendarInner>
