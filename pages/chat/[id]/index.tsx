import styles from './index.module.scss'
import Layout from '@/components/layout/Layout'
import ChatDialog from '@/components/for_pages/Chat/ChatDialog'
import { useAppContext } from '@/context/state'
import { useRouter } from 'next/router'

interface Props {
  id?: number
}

const ChatPage = (props: Props) => {
  const {isTabletWidth} = useAppContext().size
  const router = useRouter()
  return (
    <Layout hideTabbar hideFooter={isTabletWidth} hideHeader={isTabletWidth}>
    <div className={styles.root}>
      <ChatDialog chatId={props.id} onBackClick={() => {router.back()}}/>
    </div>
    </Layout>
  )
}


export default ChatPage
