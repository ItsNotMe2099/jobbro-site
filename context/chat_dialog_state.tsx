import {createContext, RefObject, useContext, useEffect, useRef, useState} from 'react'
import IChat from 'data/interfaces/IChat'
import IChatMessage from 'data/interfaces/IChatMessage'
import {useAppContext} from 'context/state'
import {useChatSocketContext} from 'context/chat_socket_state'
import {v4 as uuidv4} from 'uuid'
import {debounce} from 'debounce'
import {useChatContext} from 'context/chat_state'
import useWindowFocus from 'use-window-focus'
import ChatRepository from '@/data/repositories/ChatRepository'
import ChatMessageRepository from '@/data/repositories/ChatMessageRepository'
import {Nullable} from '@/types/types'
import {IChatMessageCreateRequest} from '@/data/interfaces/IChatMessageCreateRequest'

const chatIds: number[] = []
const markReadList: number[] = []
export enum ChatDisabledType {
  OtherManager = 'otherManager',
  Auth = 'auth',
  ReceivingPoint = 'receivingPoint'

}
interface IState {
  chat: IChat | null,
  messages: IChatMessage[]
  totalMessages: number
  fetchMore: () => void
  loading: boolean
  sendMessage: (data: IChatMessageCreateRequest) => void
  markRead: (messageId: number) => void
  markReadMulti: (messageIds: number[]) => void,
  scrollableTarget: RefObject<HTMLElement> | null
  isDisabledByOtherManager: boolean
  disabledType: Nullable<any>,
  disabled: boolean
}


const defaultValue: IState = {
  chat: null,
  messages: [],
  totalMessages: 0,
  fetchMore: () => null,
  loading: false,
  sendMessage: (data) => null,
  markRead: (messageId: number) => null,
  markReadMulti: (messageIds: number[]) => null,
  scrollableTarget: null,
  isDisabledByOtherManager: false,
  disabled: false,
  disabledType: ChatDisabledType
}

const ChatDialogContext = createContext<IState>(defaultValue)

interface Props {
  chat?: IChat
  chatId?: number | null
  children: React.ReactNode
  vacancyId?: Nullable<number | undefined>
}

export function ChatDialogWrapper(props: Props) {
  const appContext = useAppContext()
  const chatSocket = useChatSocketContext()
  const chatContext = useChatContext()
  const windowFocused = useWindowFocus()
  const isLogged = appContext.isLogged
  const isLoggedRef = useRef<boolean>(isLogged)
  const reconnectRef = useRef<boolean>(false)

  const scrollableTarget = useRef<HTMLElement | null>(null)
  const messagesRef = useRef<IChatMessage[]>([])
  const [messages, setMessages] = useState<IChatMessage[]>([])
  const [totalMessages, setTotalMessages] = useState<number>(100000000)
  const [page, setPage] = useState<number>(1)
  const [chat, setChat] = useState<IChat | null>(props.chat ?? null)
  const [error, setError] = useState(null)
  const[disabled, setIsDisabled] = useState(false)
  const[disabledType, setDisabledType] = useState<ChatDisabledType | null>(null)
  const [loading, setLoading] = useState(false)
  const windowFocusInit = useRef(false)
  const chatIdRef = useRef<number | null>(null)
  const vacancyIdRef = useRef<number | null | undefined>(props.vacancyId)
  const chatRef = useRef<Nullable<IChat>>(null)
  const limit = 30

  useEffect(() => {
    isLoggedRef.current = isLogged
  }, [isLogged])
  useEffect(() => {
    messagesRef.current = messages
  }, [messages])
  useEffect(() => {
    chatIdRef.current = props.chatId ?? null
  }, [props.chatId])
  useEffect(() => {
    vacancyIdRef.current = props.vacancyId ?? null
  }, [props.vacancyId])
  useEffect(() => {
    chatRef.current = chat
  }, [chat])
  useEffect(() => {
    const isDisabled = false
    setIsDisabled(isDisabled)
    if(isDisabled){
      setDisabledType(ChatDisabledType.OtherManager)
      return
    }
  }, [chat, appContext.aboutMe])
  const init = async () => {
   let _chat: IChat | null = null

    if (!props.chatId) {
      console.log('Init0')
      if (appContext.aboutMe && props.vacancyId && (chat?.vacancyId !== props.vacancyId)) {

        console.log('Init1')
        setLoading(true)
        const _chat = await ChatRepository.fetchChatBySellerIdAndReceivingPointId({
          vacancyId: props.vacancyId!,
          profileId: appContext.aboutMe.id!
        })
        setChat(_chat)
        if(_chat) {
          console.log('SetCurrentChatId', _chat.id)
          chatContext.setCurrentChatId(_chat.id)
        }
        if (_chat?.messages) {
          processLoadedMessages(_chat!.messages!.data, _chat!.messages!.total, true)
        } else if (_chat) {
          await loadMessages()
        } else {
          processLoadedMessages([], 0, true)
        }
        setLoading(false)
      } else {
        setChat(null)
        setLoading(false)
        setMessages([])
        setTotalMessages(0)
      }

      return
    }
    setLoading(true)
    if (!chat || chat.id !== props.chatId) {
      _chat = props.chatId ? await ChatRepository.fetchChatById(props.chatId) : null
      setChat(_chat)
    }

    setMessages([])
    setTotalMessages(100000000)
    if (_chat?.messages) {
      processLoadedMessages(_chat!.messages!.data, _chat!.messages!.total)
    } else {
      await loadMessages()
    }
    setLoading(false)
  }
  const markRead = (messageId: number) => {
    markReadList.push(messageId)
    debouncedMarkRead()
  }
  const markReadMulti = (messageIds: number[]) => {
    for (const id of messageIds) {
      if (!markReadList.includes(id)) {
        markReadList.push(id)
      }
    }
    debouncedMarkRead()
  }
  const processLoadedMessages = (data: IChatMessage[], total: number | null, fromInit: boolean = false) => {
    console.log('processLoadedMessages', total)
    if (total === 0) {
      setTotalMessages(messages.length)
    }
    const readIds: number[] = (data ?? []).filter(i => i.id && i.profileStates?.some(i => !i.read)).map(i => i.id!)
    if (readIds.length > 0) {
      chatContext.decreaseUnreadCount(props.chatId!, readIds.length)
      markReadMulti(readIds)
    }
    setMessages(i => fromInit ? data : [...i, ...data])
  }
  const loadMessages = async (lastCreatedAt?: string) => {
    const data = await ChatMessageRepository.fetchAll(props.chatId!, lastCreatedAt, limit)
    processLoadedMessages(data.data, data.total)
  }
  const fetchMore = async () => {
    if (!props.chatId) {
      return
    }
    await loadMessages(messages[messages.length - 1]?.createdAt)
    setPage(page + 1)
  }

  const sendMessage = async (data: IChatMessageCreateRequest) => {
    if (!appContext.aboutMe) {
      return
    }
    const sid = uuidv4()
    setTotalMessages(i => i + 1)
    setMessages((i) => [{
      ...data as IChatMessage,
      sid,
      id: 0,
      profileId: appContext.aboutMe?.id,
      createdAt: (new Date()).toISOString(),
    }, ...i])
    if ((props.vacancyId) && !chat?.id) {
      const chat = await ChatRepository.createChat({
        vacancyId: props.vacancyId,
        profileId: appContext.aboutMe?.id!
      })
      setChat(chat)

      ChatMessageRepository.create({...data, chatId: chat!.id, sid, userId: appContext.aboutMe?.id})
    } else {
      ChatMessageRepository.create({...data, chatId: chat!.id, sid, userId: appContext.aboutMe?.id})
    }

  }
  const debouncedMarkRead = debounce(async () => {
    if (isLoggedRef.current && markReadList.length > 0) {
      const ids = [...markReadList]
      try {
        await ChatMessageRepository.setReadIds(markReadList)
        markReadList.length = 0
      } catch (e) {
        console.error('ErrorMarkRead', e)
      }
    }
  }, 500)
  const debouncedScroll = debounce(async () => {
    if (!scrollableTarget?.current) {
      return
    }
    scrollableTarget?.current?.scroll({
      top: scrollableTarget?.current?.scrollHeight,
      behavior: 'smooth',
    })
  }, 500)
  const debouncedReconnect = debounce(async () => {
    if (!reconnectRef.current) {
      return
    }

    if(chatIdRef.current){
      chatSocket.join(chatIdRef.current!)
    }

    if(chatIdRef.current){
      const data = await ChatMessageRepository.fetchAll(props.chatId!, null, limit)

      if (!reconnectRef.current) {
        return
      }
      const lastIds = data.data.map(i => i.id)
      const currentIds = messagesRef.current.map(i => i.id)
      const existsIds = currentIds.filter(i => lastIds.includes(i))
      const newIds = lastIds.filter(i => !existsIds.includes(i))
      if (newIds.length > 0) {
        setMessages(i => ([...lastIds.map(a => data.data.find(i => i.id === a)).filter(i => !!i) as IChatMessage[], ...i]))
        debouncedScroll()
      }
    }

  }, 1000)
  useEffect(() => {
    if (chat) {
      chatSocket.join(chat.id)
    }
    return () => {
      if (chat) {
        chatSocket.leave(chat.id)
      }
    }
  }, [chat])


  useEffect(() => {
    reconnectRef.current = false
    if (props.chatId) {
      chatContext.setCurrentChatId(props.chatId)
    }
    console.log('useEffect11', appContext.aboutMeLoaded, appContext.aboutMe)
    if (appContext.aboutMeLoaded && appContext.aboutMe) {
      init()
    }else{
      if(appContext.aboutMeLoaded) {
        setIsDisabled(true)
        setDisabledType(ChatDisabledType.Auth)
      }
      setLoading(false)
    }
  }, [props.vacancyId, appContext.aboutMeLoaded, props.chatId])
  useEffect(() => {

    const subscription = chatSocket.messageState$.subscribe((message) => {
      if (chat && message.chatId === chat.id && !messages.find(i => i.id === message.id)) {
        markRead(message.id!)

        if (message.sid && messages.find(i => i.sid === message.sid)) {
          setMessages(i => i.map(i => i.sid === message.sid ? {...i, ...message} : i))
        } else {
          setMessages(i => [message, ...i])
          setTotalMessages(i => i + 1)
        }
        if (message.profileId === appContext.aboutMe!.id || (scrollableTarget.current?.scrollTop ?? 0) < 50) {
          debouncedScroll()
        }


      }
    })

    const subscriptionChatUpdate = chatSocket.chatUpdateState$.subscribe((updated) => {

      console.log('chatUpdateState$', updated, chat)
      if (chat && chat.id === updated.id) {
        setChat((i) => ({...i,...updated}))
      }
    })
    const subscriptionChatCreated = chatSocket.chatCreateState$.subscribe((created) => {
      console.log('subscriptionChatCreated', created, props)
      if (!chat && props.vacancyId && props.vacancyId === created.vacancyId && appContext.aboutMe?.id === created.profileId) {
        init()
      }
    })
    return () => {
      subscription.unsubscribe()
      subscriptionChatUpdate.unsubscribe()
      subscriptionChatCreated.unsubscribe()
    }
  }, [chat, messages])


  useEffect(() => {

    if (!props.chatId) {
      return
    }
    const subscription = chatSocket.reconnectState$.subscribe(async (message) => {
      reconnectRef.current = true
      debouncedReconnect()
    })
    return () => {
      subscription.unsubscribe()
    }

  }, [messages, props.chatId])
  useEffect(() => {
    if (!chatIdRef?.current) {
      return
    }
    if (!windowFocusInit.current) {
      windowFocusInit.current = true
      return
    }
    if (windowFocused) {
      reconnectRef.current = true
      debouncedReconnect()
    }
  }, [windowFocused])
  const value: IState = {
    ...defaultValue,
    chat,
    messages,
    totalMessages,
    fetchMore,
    loading,
    sendMessage,
    markRead,
    markReadMulti,
    scrollableTarget,
    disabled,
    disabledType
  }

  return (
    <ChatDialogContext.Provider value={value}>
      {props.children}
    </ChatDialogContext.Provider>
  )
}

export function useChatDialogContext() {
  return useContext(ChatDialogContext)
}
