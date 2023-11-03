import { getAuthServerSideProps } from '@/utils/auth'
import { ProfileType } from '@/data/enum/ProfileType'
import { ProfilePageLayout } from '@/components/for_pages/Profile/ProfileLayout'
import styles from './index.module.scss'

interface Props {

}

const ChatRequirementsAnswerPage = (props: Props) => {

  return (
    <div className={styles.root}>
      
    </div>
  )
}

ChatRequirementsAnswerPage.getLayout = ProfilePageLayout
export default ChatRequirementsAnswerPage
export const getServerSideProps = getAuthServerSideProps(ProfileType.Employee)
