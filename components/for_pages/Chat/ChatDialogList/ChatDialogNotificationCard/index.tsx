import styles from 'components/for_pages/Chat/ChatDialogList/ChatDialogCard/index.module.scss'
import Link from 'next/link'
import {Routes} from '@/types/routes'
import IChat from '@/data/interfaces/IChat'
import {useMemo} from 'react'
import {useAppContext} from '@/context/state'
import {ProfileType} from '@/data/enum/ProfileType'
interface Props {
  chat: IChat
}

export default function ChatDialogNotificationCard(props: Props) {
  const appContext = useAppContext()
  const lastMessage = props.chat.searchMessage ?? props.chat.lastMessage
  const name = useMemo(() => {
    switch (appContext.aboutMe?.profileType){
      case ProfileType.Employee:
        return props.chat.vacancy?.company?.name
      case ProfileType.Hirer:
        return props.chat.cv?.name
    }
  }, [props.chat])

  const authorName = useMemo(() => {
    switch (appContext.aboutMe?.profileType){
      case ProfileType.Employee:
        return null
      case ProfileType.Hirer:
        return props.chat.cv?.name
    }
  }, [props.chat])


  const centerText = useMemo(() => {
    switch (appContext.aboutMe?.profileType){
      case ProfileType.Employee:
        return props.chat.vacancy?.name
      case ProfileType.Hirer:
        return lastMessage
    }
  }, [props.chat, lastMessage])

  return (
    <Link href={Routes.chatId(props.chat.id)} className={styles.root}>
         <div className={styles.name}>
            {name}
          </div>
        <div className={styles.message}>
              {authorName && <span className={styles.messenger}>
                {authorName}:
              </span>}
              {centerText}
          </div>
    </Link>
  )
}
