import { getAuthServerSideProps } from '@/utils/auth'
import { ProfileType } from '@/data/enum/ProfileType'
import { ProfilePageLayout } from '@/components/for_pages/Profile/ProfileLayout'
import styles from './index.module.scss'

interface Props {

}

const ChatInvitesPage = (props: Props) => {

  return (
    <div className={styles.root}>
      
    </div>
  )
}

ChatInvitesPage.getLayout = ProfilePageLayout
export default ChatInvitesPage
export const getServerSideProps = getAuthServerSideProps(ProfileType.Employee)
