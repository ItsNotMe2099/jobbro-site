import styles from 'components/for_pages/Chat/ChatDialogList/index.module.scss'
import Card from '@/components/for_pages/Common/Card'
import ChatDialogCard from '@/components/for_pages/Chat/ChatDialogList/ChatDialogCard'
import {ChatWrapper, useChatContext} from '@/context/chat_state'
import InfiniteScroll from 'react-infinite-scroll-component'
import ContentLoader from '@/components/ui/ContentLoader'
import FlipMove from 'react-flip-move'
import PageTitle from '@/components/for_pages/Common/PageTitle'
import ChatDialogSearch from '@/components/for_pages/Chat/ChatDialogList/ChatDialogSearch'
import {debounce} from 'debounce'
import {InputValueType} from '@/components/fields/InputField'
import {ChatSocketWrapper} from '@/context/chat_socket_state'
import Tabs from '@/components/ui/Tabs'
import {IOption} from '@/types/types'
import {useState} from 'react'
enum TabKey{
  All = 'all',
  Invites = 'invites',
  NewMessages = 'newMessages'
}
interface Props {

}

const ChatDialogListInner = (props: Props) => {
  const chatContext = useChatContext()
  const [tab, setTab] = useState<TabKey>(TabKey.All)
  const debouncedSearchChange = debounce(async (search: InputValueType<string>) => {
    chatContext.setFilter({...chatContext.filter, search})
  }, 300)
  const tabs: IOption<TabKey>[] = [
    {label: 'All', value: TabKey.All},
    {label: 'Invites', value: TabKey.Invites},
    {label: 'New Messages', value: TabKey.NewMessages},
  ]
  const handleChangeTab = (tab: TabKey) => {
    setTab(tab)
    chatContext.setFilter({
      ...(tab === TabKey.Invites ? {filter: 'invites'} : {
      }),
      ...(tab === TabKey.NewMessages ? {filter: 'unread'} : {
      })
    })
  }
  return (<div className={styles.root}>
      <PageTitle title={'Chats'}/>
      <Card>
        <ChatDialogSearch onChange={(val) => debouncedSearchChange(val)}/>
      </Card>
      <div>
      <Tabs<TabKey> value={tab} onClick={handleChangeTab} options={tabs} />
      </div>
      <Card>
        <div className={styles.dialogs}>
          {!chatContext.loading && !chatContext.filterIsEmpty && chatContext.totalChats === 0 ?
            <div className={styles.empty}>
              По вашей запросу ничего не найдено
            </div> : <InfiniteScroll
              dataLength={chatContext.chats.length}
              next={chatContext.fetchMore}
              style={{overflow: 'inherit'}}
              loader={chatContext.totalChats > 0 ? <ContentLoader style={'infiniteScroll'} isOpen={true}/> : null}
              hasMore={chatContext.totalChats > chatContext.chats.length}
              scrollThreshold={0.6}>
              <div className={styles.list}>
                <FlipMove
                  staggerDurationBy="30"
                  duration={500}
                  enterAnimation={'accordionVertical'}
                  leaveAnimation={'accordionVertical'}
                >
                  {chatContext.chats.map((i, index) => <ChatDialogCard key={`${i.id}`}
                                                                       highlight={chatContext.filter?.search ?? ''}
                                                                       chat={i}
                  />)}
                </FlipMove>
              </div>
            </InfiniteScroll>}
        </div>
      </Card>
    </div>
  )
}

const ChatDialogList = (props: Props) => {
  return (<ChatSocketWrapper>
    <ChatWrapper>
      <ChatDialogListInner/>
    </ChatWrapper>
  </ChatSocketWrapper>)
}
export default ChatDialogList