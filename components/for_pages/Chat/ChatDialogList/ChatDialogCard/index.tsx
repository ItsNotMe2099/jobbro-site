import styles from 'components/for_pages/Chat/ChatDialogList/ChatDialogCard/index.module.scss'
import Link from 'next/link'
import {Routes} from '@/types/routes'
import IChat from '@/data/interfaces/IChat'
import {useMemo} from 'react'
import {useAppContext} from '@/context/state'
import {ProfileType} from '@/data/enum/ProfileType'
import DateUtils from '@/utils/DateUtils'
import NotificationBadge from '@/components/ui/NotificationBadge'
import AvatarCircular from '@/components/ui/AvatarCircular'
import Highlighter from 'react-highlight-words'
interface Props {
  chat: IChat
  highlight: string | null
}

export default function ChatDialogCard(props: Props) {
  const appContext = useAppContext()

  const lastMessage = props.chat.searchMessage ?? props.chat.lastMessage
  const lastMessageAt = props.chat.searchMessageAt ?? props.chat.lastMessageAt
  const hasUnAssignedBadge = appContext.aboutMe?.company && !props.chat.messages
  const hasNotificationBadge = !hasUnAssignedBadge && props.chat.totalUnread > 0
  const name = useMemo(() => {
    switch (appContext.aboutMe?.profileType){
      case ProfileType.Employee:
        return props.chat.vacancy?.company?.name
      case ProfileType.Hirer:
        return props.chat.cv?.name
    }
  }, [props.chat])
  const nameHighlighted = props.highlight && name ? props.highlight?.split(' ').some(i => name.toLowerCase().includes(i.toLowerCase())) : false
  const image = useMemo(() => {
    switch (appContext.aboutMe?.profileType){
      case ProfileType.Employee:
        return props.chat.vacancy?.company?.logo
      case ProfileType.Hirer:
        return props.chat.cv?.image
    }
  }, [props.chat])

  const initials = useMemo(() => {
    switch (appContext.aboutMe?.profileType){
      case ProfileType.Employee:
        return props.chat.vacancy?.company?.name?.charAt(0)
      case ProfileType.Hirer:
        return props.chat.cv?.name?.charAt(0)
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


  const centerTextHighlighted = useMemo(() => {
    switch (appContext.aboutMe?.profileType){
      case ProfileType.Employee:
        return  props.highlight && props.chat.searchMessage  ? props.highlight?.split(' ').some(i => props.chat.searchMessage!.toLowerCase().includes(i.toLowerCase())) : false
      case ProfileType.Hirer:
        return  props.highlight && props.chat.searchMessage  ? props.highlight?.split(' ').some(i => props.chat.searchMessage!.toLowerCase().includes(i.toLowerCase())) : false
    }
    }, [centerText])

  return (
    <Link href={Routes.chatId(props.chat.id)} className={styles.root}>
      <AvatarCircular file={image} initials={initials} className={styles.icon} size={68} />
      <div className={styles.content}>
        <div className={styles.main}>
          <div className={styles.name}>
            {name}
          </div>
        <div className={styles.message}>
            {authorName && <div className={styles.messenger}>
              {authorName}:
            </div>}
            <div className={styles.msg}>
              {centerTextHighlighted && <Highlighter
                highlightClassName={styles.highlighted}
                searchWords={props.highlight?.split(' ') || []}
                autoEscape={true}
                textToHighlight={centerText ?? ''}
              />}
              {!centerTextHighlighted && centerText}
            </div>
          </div>
        </div>
        <div className={styles.right}>
          {lastMessageAt && <div className={styles.date}>
            {DateUtils.formatDateRelativeShort(lastMessageAt)}
          </div>}

          {hasNotificationBadge && <NotificationBadge position={'static'} size={'large'} color={'green'} className={styles.badge} total={props.chat.totalUnread}/>}
        </div>
      </div>
    </Link>
  )
}
