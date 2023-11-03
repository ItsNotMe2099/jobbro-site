import { getAuthServerSideProps } from '@/utils/auth'
import { ProfileType } from '@/data/enum/ProfileType'
import { ProfilePageLayout } from '@/components/for_pages/Profile/ProfileLayout'
import styles from './index.module.scss'

interface Props {

}

const ChatAllPage = (props: Props) => {

  return (
    <div className={styles.root}>
      
    </div>
  )
}

ChatAllPage.getLayout = ProfilePageLayout
export default ChatAllPage
export const getServerSideProps = getAuthServerSideProps(ProfileType.Employee)
