import styles from './index.module.scss'
import {useAppContext} from 'context/state'
import ContentLoader from 'components/ui/ContentLoader'
import {ChatDialogRoute, ChatDialogWrapper, ChatDisabledType, useChatDialogContext} from 'context/chat_dialog_state'
import {ReactElement, useEffect} from 'react'
import classNames from 'classnames'
import ChatMessageForm from '@/components/for_pages/Chat/ChatMessageForm'
import ChatSuggestionLogin from '@/components/for_pages/Chat/ChatDialog/ChatSuggestionLogin'
import {ChatSocketWrapper} from '@/context/chat_socket_state'
import EventOwnerForm from '@/components/for_pages/Calendar/EventOwnerForm'
import EventSelectSlotForm from '@/components/for_pages/Calendar/EventSelectSlotForm'
import {Nullable} from '@/types/types'
import ChatMessagesList from '@/components/for_pages/Chat/ChatDialog/ChatMessagesList'
import ChatSvg from '@/components/svg/ChatSvg'
import { colors } from '@/styles/variables'
import { useRouter } from 'next/router'

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
  simpleType?: boolean
  replace?: boolean
}

const ChatDialogWidgetInner = (props: Props) => {
  const appContext = useAppContext()
  const chatContext = useChatDialogContext()
  const {isTabletWidth} = appContext.size
  const router = useRouter()

  const loading = chatContext.loading || !appContext.aboutMeLoaded
  const renderChatSuggestion = () => {
    switch (chatContext.disabledType) {
      case ChatDisabledType.Auth:
        return <ChatSuggestionLogin/>
    }
    return null

  }

  useEffect(()=>{
    if(isTabletWidth && chatContext.chat) {
      router.push(`/chat/${chatContext.chat.id}`)
      appContext.hideModal()
    }
  }, [chatContext.chat, props.replace])

  if(isTabletWidth || props.replace) {
    return( null
      // <div className={classNames(styles.root, props.className)}>
      //   <div className={styles.container}>
      //     {chatContext.chat?.cv && isTabletWidth &&
      //       <PageTitle 
      //       className={styles.title} 
      //       title={chatContext.chat?.cv.name ?? chatContext.chat?.cv.title ?? ''}
      //       onBack={()=>{isTabletWidth&&props.onBackClick?.()}}
      //       invertColors={isTabletWidth}
      //       />
      //     }
      //     <ChatHeader 
      //     hasBack={isTabletWidth} 
      //     showBothChatNames={props.showBothChatNames}
      //     chat={chatContext.chat||undefined}
      //     title={props.title ?? null}
      //     />
      //     <ChatMessagesList/>
      //     <div className={styles.bottom}>
      //       <ChatMessageForm/>
      //     </div>
      //   </div>
      // </div>
    )
  }

  else  if(!isTabletWidth && !props.replace) {
    return (<div className={classNames(styles.root, props.className)}>
      <div className={styles.chatWrapper}>
        <div className={styles.header}>
          <div className={styles.chatIcon}><ChatSvg color={colors.white}/></div>
          <div className={styles.title}>Chat</div>
        </div>
        <ChatMessagesList/>
      </div>
      <div className={styles.bottom}>
        <ChatMessageForm/>
      </div>
    </div>
    )
  }
}

const ChatDialogWidgetRouteWrapper = (props: Props) => {
  const chatContext = useChatDialogContext()
  const args = chatContext.routeArguments
  if(chatContext.loading){
    return <ContentLoader isOpen={true} style={'page'}/>
  }
  switch (chatContext.route) {
    case ChatDialogRoute.CreateEvent:
      return <EventOwnerForm cvId={args.cvId} vacancyId={args.vacancyId} onBack={() => chatContext.setRoute(ChatDialogRoute.Dialog)}  onSubmit={() => chatContext.setRoute(ChatDialogRoute.Dialog)}/>
    case ChatDialogRoute.SelectEventSlot:
      return <EventSelectSlotForm simpleType={props.simpleType} eventId={args.eventId} onBack={() => chatContext.setRoute(ChatDialogRoute.Dialog)}  onSubmit={() => chatContext.setRoute(ChatDialogRoute.Dialog)}/>
    case ChatDialogRoute.Dialog:
    default:
      return <ChatDialogWidgetInner {...props}/>
  }
}


export default function ChatDialogWidget(props: Props) {
  return <ChatSocketWrapper>
    <ChatDialogWrapper chatId={props.chatId} vacancyId={props.vacancyId} cvId={props.cvId}>
      <ChatDialogWidgetRouteWrapper {...props}/>
    </ChatDialogWrapper>
  </ChatSocketWrapper>
}
