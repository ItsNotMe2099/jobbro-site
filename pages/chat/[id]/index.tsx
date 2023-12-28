import { getAuthServerSideProps } from '@/utils/auth'
import styles from './index.module.scss'
import Layout from '@/components/layout/Layout'
import ChatDialog from '@/components/for_pages/Chat/ChatDialog'
import {useRouter} from 'next/router'
import {Routes} from '@/types/routes'

interface Props {

}

const ChatPage = (props: Props) => {
  const router = useRouter()
  return (
    <Layout hideTabbar>
    <div className={styles.root}>
      <ChatDialog chatId={parseInt(router.query.id as string)} onBackClick={() => {router.replace(Routes.chat)}}/>
    </div>
    </Layout>
  )
}


export default ChatPage
export const getServerSideProps = getAuthServerSideProps()
