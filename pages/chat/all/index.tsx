import { getAuthServerSideProps } from '@/utils/auth'
import { ProfileType } from '@/data/enum/ProfileType'
import { ProfilePageLayout } from '@/components/for_pages/Profile/ProfileLayout'
import styles from './index.module.scss'
import Card from '@/components/for_pages/Common/Card'
import SocialNetworkCard from '@/components/for_pages/Chat/SocilaNetworkCard'

interface Props {

}

const ChatAllPage = (props: Props) => {

  const chats = [
    {
      id: 1,
      icon: '/profiles/linkedin.svg', name: 'LinkedIn',
      lastMsg: { name: 'Roise', msg: 'Senior Manager of Software Development and Engineering', date: '11:53' }, unreadMsgs: 1
    },
    {
      id: 2, icon: '/profiles/greenhouse.svg', name: 'Greenhouse',
      lastMsg: { name: 'Emeli:', msg: 'Senior Manager of Software Development and Engineering', date: '10:18' }, unreadMsgs: 100
    },
    {
      id: 3, icon: '/profiles/xing.svg', name: 'Xing',
      lastMsg: { name: 'Josef:', msg: 'Senior Manager of Software Development and Engineering', date: '9:46' }, unreadMsgs: 23
    },
  ]

  return (
    <div className={styles.root}>
      <Card>
        <div className={styles.socials}>
          {chats.map((i, index) =>
            <SocialNetworkCard item={i} key={index} />
          )}
        </div>
      </Card>
    </div>
  )
}

ChatAllPage.getLayout = ProfilePageLayout
export default ChatAllPage
export const getServerSideProps = getAuthServerSideProps(ProfileType.Hirer)
