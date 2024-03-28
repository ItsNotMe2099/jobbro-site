import styles from './index.module.scss'
import {useAppContext} from 'context/state'
import { RefObject} from 'react'
import ContentLoader from '@/components/ui/ContentLoader'
import InfiniteScroll from 'react-infinite-scroll-component'
import Spacer from '@/components/ui/Spacer'
import ChatMessage from '@/components/for_pages/Chat/ChatDialog/ChatMessage'
import {ChatDisabledType, useChatDialogContext} from '@/context/chat_dialog_state'
import ChatSuggestionLogin from '@/components/for_pages/Chat/ChatDialog/ChatSuggestionLogin'
import classNames from 'classnames'

interface Props {
  styleType?: 'white' | 'transparent'
}

export default function ChatMessagesList(props: Props) {
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
  return (
    <div
    className={classNames(styles.root, {[styles[props.styleType ?? 'white']]: true})}
    id={'chat-messages'}
    ref={chatContext.scrollableTarget as RefObject<HTMLDivElement>}
    >
      {loading && <ContentLoader style={'block'} isOpen={true}/>}
      {!loading && !chatContext.disabled &&
        <InfiniteScroll
        dataLength={chatContext.messages.length}
        next={chatContext.fetchMore}
        scrollableTarget={'chat-messages'}
        inverse={true}
        style={{ overflow: 'inherit'}}
        className={styles.list}
        loader={chatContext.totalMessages > 0 ? <ContentLoader style={'infiniteScroll'} isOpen={true}/> : null}
        hasMore={chatContext.totalMessages > chatContext.messages.length}
        scrollThreshold={0.6}
        >
        {/* если убрать этот р, то будет баг, при котором не скроллится в модальном окне... */}
        <p className={styles.bugFix}>BugFix</p>
        {chatContext.messages.map((i, index) => {
          const previous = index > 0 ? chatContext.messages[index - 1] : null
          return (
            <div key={i.id ?? i.sid}>
              {previous && previous.profileId !== i.profileId && <Spacer basis={10}/>}
              <ChatMessage
              message={i}
              side={appContext.aboutMe?.id === i.profileId ? 'my' : 'other'}
              />
            </div>)
        })}
      </InfiniteScroll>}
      {!loading && renderChatSuggestion()}
    </div>
  )
}


