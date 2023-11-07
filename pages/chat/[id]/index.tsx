import { getAuthServerSideProps } from '@/utils/auth'
import { ProfileType } from '@/data/enum/ProfileType'
import styles from './index.module.scss'
import { ChatPageLayout } from '@/components/for_pages/Chat/ChatLayout'

interface Props {

}

const ChatId = (props: Props) => {

  return (
    <div className={styles.root}>
      
    </div>
  )
}

ChatId.getLayout = ChatPageLayout
export default ChatId
export const getServerSideProps = getAuthServerSideProps(ProfileType.Hirer)
