import styles from './index.module.scss'
import {useAppContext} from 'context/state'
import ContentLoader from 'components/ui/ContentLoader'
import {ChatDialogRoute, ChatDialogWrapper, ChatDisabledType, useChatDialogContext} from 'context/chat_dialog_state'
import Spacer from 'components/ui/Spacer'
import {ReactElement, RefObject} from 'react'
import classNames from 'classnames'
import ChatMessageForm from '@/components/for_pages/Chat/ChatMessageForm'
import ChatMessage from '@/components/for_pages/Chat/ChatDialog/ChatMessage'
import ChatSuggestionLogin from '@/components/for_pages/Chat/ChatDialog/ChatSuggestionLogin'
import ChatHeader from '@/components/for_pages/Chat/ChatDialog/ChatHeader'
import {ChatSocketWrapper} from '@/context/chat_socket_state'
import PageTitle from '@/components/for_pages/Common/PageTitle'
import InfiniteScroll from 'react-infinite-scroll-component'
import EventOwnerForm from '@/components/for_pages/Calendar/EventOwnerForm'
import EventSelectSlotForm from '@/components/for_pages/Calendar/EventSelectSlotForm'

interface Props {
  className?: string
  chatId?: number | null
  title?: string | ReactElement | null
  receivingPointId?: number | undefined | null
  hasBack?: boolean
  onBackClick?: () => void | undefined
  sellerId?: string | undefined | null
  showBothChatNames?: boolean | undefined
}

const ChatDialogInner = (props: Props) => {
  const appContext = useAppContext()
  const chatContext = useChatDialogContext()
  const loading = chatContext.loading || !appContext.aboutMeLoaded
  const renderChatSuggestion = () => {
    switch (chatContext.disabledType) {
      case ChatDisabledType.Auth:
        return <ChatSuggestionLogin/>
    }
    return null

  }
  return (<div className={classNames(styles.root, props.className)}>
      {chatContext.chat?.cv &&
        <PageTitle className={styles.title} title={chatContext.chat?.cv.name ?? chatContext.chat?.cv.title ?? ''}
                   onBack={props.onBackClick}/>}
      {<ChatHeader hasBack={props.hasBack ?? false} showBothChatNames={props.showBothChatNames}
                   chat={chatContext.chat}
                   title={props.title ?? null}/>}
      <div className={styles.messages} id={'chat-messages'}
           ref={chatContext.scrollableTarget as RefObject<HTMLDivElement>}>
        {loading && <ContentLoader style={'block'} isOpen={true}/>}
        {!loading && !chatContext.disabled && <InfiniteScroll
          dataLength={chatContext.messages.length}
          next={chatContext.fetchMore}
          scrollableTarget={'chat-messages'}
          inverse
          style={{overflow: 'inherit'}}
          className={styles.list}
          loader={chatContext.totalMessages > 0 ? <ContentLoader style={'infiniteScroll'} isOpen={true}/> : null}
          hasMore={chatContext.totalMessages > chatContext.messages.length}
          scrollThreshold={0.6}>
          {chatContext.messages.map((i, index) => {
            const previous = index > 0 ? chatContext.messages[index - 1] : null
            return (<div key={i.id ?? i.sid}>
              {previous && previous.profileId !== i.profileId && <Spacer basis={10}/>}
              <ChatMessage side={appContext.aboutMe?.id === i.profileId ? 'my' : 'other'}
                           message={i}/></div>)
          })}
        </InfiniteScroll>}
        {!loading && renderChatSuggestion()}
      </div>
      <div className={styles.bottom}>
        <ChatMessageForm/>
      </div>
    </div>
  )
}

const ChatDialogRouteWrapper = (props: Props) => {

  const chatContext = useChatDialogContext()
  const args = chatContext.routeArguments
  if(chatContext.loading){
    return <ContentLoader isOpen={true} style={'page'}/>
  }
  switch (chatContext.route) {
    case ChatDialogRoute.CreateEvent:
      return <EventOwnerForm cvId={args.cvId} vacancyId={args.vacancyId} onBack={() => chatContext.setRoute(ChatDialogRoute.Dialog)}  onSubmit={() => chatContext.setRoute(ChatDialogRoute.Dialog)}/>
    case ChatDialogRoute.SelectEventSlot:
      return <EventSelectSlotForm eventId={args.eventId} onBack={() => chatContext.setRoute(ChatDialogRoute.Dialog)}  onSubmit={() => chatContext.setRoute(ChatDialogRoute.Dialog)}/>
    case ChatDialogRoute.Dialog:
    default:
      return <ChatDialogInner {...props}/>
  }
}


export default function ChatDialog(props: Props) {
  return <ChatSocketWrapper>
    <ChatDialogWrapper chatId={props.chatId}>
      <ChatDialogRouteWrapper {...props}/>
    </ChatDialogWrapper>
  </ChatSocketWrapper>
}
