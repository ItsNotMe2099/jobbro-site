import styles from './index.module.scss'
import { ReactElement } from 'react'
import PageTitle from '@/components/for_pages/Common/PageTitle'
import { nestLayout } from '@/utils/nestLayout'
import { Routes } from '@/types/routes'
import { ProfileCalendar } from '../../Profile/ProfileCalendar'
import { useRouter } from 'next/router'

enum TabKey {
  Resume = 'resume',
  Settings = 'settings',
  All = 'all',
  Invites = 'invites',
  RequirementsAnswer = 'requirementsAnswer'
}


interface Props {
  children: ReactElement
  chatName?: string
}
const ChatPageLayoutInner = (props: Props) => {

  return (
    <div className={styles.root}>
      <PageTitle title={props.chatName as string}
        link={Routes.chat} />
      {props.children}
    </div>
  )
}


const ChatPageLayoutWrapper = (props: Props) => {

  const router = useRouter()

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

  const chat = chats.find(i => i.id.toString() === router.query.id)

  return (
    <ChatPageLayoutInner chatName={chat?.name}>{props.children}</ChatPageLayoutInner>
  )
}


export const ChatPageLayout = nestLayout(ProfileCalendar, (page: ReactElement) => <ChatPageLayoutWrapper>{page}</ChatPageLayoutWrapper>)
