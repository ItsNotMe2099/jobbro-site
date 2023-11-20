import styles from './index.module.scss'
import {useEffect, useRef, useState} from 'react'
import ChatRepository from '@/data/repositories/ChatRepository'
import IChat from '@/data/interfaces/IChat'
import ChatDialogNotificationCard from '@/components/for_pages/Chat/ChatDialogList/ChatDialogNotificationCard'
import Link from 'next/link'
import {Routes} from '@/types/routes'

interface Props {
  isOpen: boolean
}

export default function HeaderMenuChat(props: Props) {
  const [chats, setChats] = useState<IChat[]>([])
  const initOpenRef = useRef<boolean>(false)
  useEffect(() => {
    if(!props.isOpen){
      return
    }
    if(!initOpenRef.current) {
      initOpenRef.current = true
    }
    ChatRepository.fetchAll({filter: 'unread', page: 1, limit: 3}).then(i => setChats(i.data))
  }, [props.isOpen])
  return (
   <div className={styles.root}>
     <div className={styles.title}>New Messages</div>
     <div className={styles.chats}>
       {chats.map(chat => <ChatDialogNotificationCard chat={chat}/>)}
     </div>

     <Link href={Routes.chat} className={styles.viewMore}>View more</Link>
   </div>
  )
}

