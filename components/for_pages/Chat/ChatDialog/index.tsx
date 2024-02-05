import styles from './index.module.scss'
import {useAppContext} from 'context/state'
import ContentLoader from 'components/ui/ContentLoader'
import {ChatDialogRoute, ChatDialogWrapper, ChatDisabledType, useChatDialogContext} from 'context/chat_dialog_state'
import {ReactElement} from 'react'
import classNames from 'classnames'
import ChatMessageForm from '@/components/for_pages/Chat/ChatMessageForm'
import ChatSuggestionLogin from '@/components/for_pages/Chat/ChatDialog/ChatSuggestionLogin'
import ChatHeader from '@/components/for_pages/Chat/ChatDialog/ChatHeader'
import {ChatSocketWrapper} from '@/context/chat_socket_state'
import PageTitle from '@/components/for_pages/Common/PageTitle'
import EventOwnerForm from '@/components/for_pages/Calendar/EventOwnerForm'
import EventSelectSlotForm from '@/components/for_pages/Calendar/EventSelectSlotForm'
import {Nullable} from '@/types/types'
import ChatMessagesList from '@/components/for_pages/Chat/ChatDialog/ChatMessagesList'
import { MyEvents } from '../../Calendar/MyEvents'

interface Props {
  className?: string
  chatId?: number | null
  vacancyId?: Nullable<number | undefined>
  cvId?: Nullable<number | undefined>
  title?: string | ReactElement | null
  hasBack?: boolean
  onBackClick?: () => void | undefined
  sellerId?: string | undefined | null
  showBothChatNames?: boolean | undefined
}

const ChatDialogInner = (props: Props) => {
  const appContext = useAppContext()
  const {isTabletWidth} = appContext.size
  const chatContext = useChatDialogContext()
  const loading = chatContext.loading || !appContext.aboutMeLoaded
  const renderChatSuggestion = () => {
    switch (chatContext.disabledType) {
      case ChatDisabledType.Auth:
        return <ChatSuggestionLogin/>
    }
    return null

  }
  return (
    <div className={classNames(styles.root, props.className)}>
      <div className={styles.container}>
        {chatContext.chat?.cv &&
          <PageTitle 
          className={styles.title} 
          title={chatContext.chat?.cv.name ?? chatContext.chat?.cv.title ?? ''}
          onBack={props.onBackClick}
          invertColors={isTabletWidth}
          />
        }
        <ChatHeader 
        hasBack={props.hasBack ?? false} 
        showBothChatNames={props.showBothChatNames}
        chat={chatContext.chat||undefined}
        title={props.title ?? null}
        />
        <ChatMessagesList/>
        <div className={styles.bottom}>
          <ChatMessageForm/>
        </div>
      </div>
      {!isTabletWidth &&
        <MyEvents/>
      }
    </div>
  )
}

const ChatDialogRouteWrapper = (props: Props) => {

  const chatContext = useChatDialogContext()
  const args = chatContext.routeArguments
  if (chatContext.loading) {
    return <ContentLoader isOpen={true} style={'page'}/>
  }
  switch (chatContext.route) {
    case ChatDialogRoute.CreateEvent:
      return <EventOwnerForm 
      cvId={args.cvId} vacancyId={args.vacancyId}
      onBack={() => chatContext.setRoute(ChatDialogRoute.Dialog)}
      onSubmit={() => chatContext.setRoute(ChatDialogRoute.Dialog)}
      />
    case ChatDialogRoute.SelectEventSlot:
      return <EventSelectSlotForm 
      eventId={args.eventId} 
      onBack={() => chatContext.setRoute(ChatDialogRoute.Dialog)}
      onSubmit={() => chatContext.setRoute(ChatDialogRoute.Dialog)}
      />
    case ChatDialogRoute.Dialog:
    default:
      return <ChatDialogInner {...props}/>
  }
}


export default function ChatDialog(props: Props) {
  return <ChatSocketWrapper>
    <ChatDialogWrapper chatId={props.chatId} vacancyId={props.vacancyId} cvId={props.cvId}>
      <ChatDialogRouteWrapper {...props}/>
    </ChatDialogWrapper>
  </ChatSocketWrapper>
}
