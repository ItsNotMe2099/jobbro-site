import {createContext, RefObject, useContext, useEffect, useRef, useState} from 'react'
import IChat from 'data/interfaces/IChat'
import ChatRepository from 'data/repositories/ChatRepository'
import {debounce} from 'debounce'
import {useAppContext} from 'context/state'
import {useChatSocketContext} from 'context/chat_socket_state'
import useWindowFocus from 'use-window-focus'
import {IChatListRequest} from '@/data/interfaces/IChatListRequest'

interface IChatFilter extends IChatListRequest{


}
interface IState {
  chats: IChat[]
  currentChatId: number | null,
  totalChats: number
  fetchMore: () => void
  loading: boolean
  filter: IChatFilter
  filterIsEmpty: boolean,
  setFilter: (filter: IChatFilter) => void,
  decreaseUnreadCount: (chatId: number, total: number) => void
  setCurrentChatId: (chatId: number | null) => void,
  scrollableTarget: RefObject<HTMLElement> | null
}


const defaultValue: IState = {
  chats: [],
  totalChats: 0,
  currentChatId: 0,
  filter: {},
  filterIsEmpty: true,
  setFilter: (filter: IChatFilter) => null,
  fetchMore: () => null,
  loading: false,
  decreaseUnreadCount: (chatId: number, total: number) => null,
  setCurrentChatId: (chatId: number | null) => null,
  scrollableTarget: null
}

const ChatContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode
  receivingPointId?: number
}

export function ChatWrapper(props: Props) {
  const appContext = useAppContext()
  const chatSocket = useChatSocketContext()
  const abortControllerRef = useRef<AbortController | null>(null)
  const windowFocused = useWindowFocus()
  const isLogged = appContext.isLogged
  const isLoggedRef = useRef<boolean>(isLogged)
  const scrollableTarget = useRef<HTMLElement | null>(null)
  const [chats, setChats] = useState<IChat[]>([])
  const [currentChatId, setCurrentChatId] = useState<number | null>(0)
  const [totalChats, setTotalChats] = useState<number>(0)
  const [page, setPage] = useState<number>(1)
  const [loading, setLoading] = useState(true)
  const limit = 30
  const [filter, setFilter] = useState<IChatFilter>({page: 1, limit: limit ?? 30})
  const filterRef = useRef<IChatFilter>(filter)
  const windowFocusInit = useRef(false)

  const getFilterChatListRequest = (): IChatListRequest => {
    return {
      ...(filterRef.current ? {...filterRef.current} : {}),
    }
  }
  const checkIsFilterEmpty = (): boolean => {
    return !filterRef.current?.search && !filterRef.current?.filter
  }
  const debouncedReconnect = debounce(async () => {
    const data = await ChatRepository.fetchAll({page, limit: chats.length > limit ? chats.length : limit, ...getFilterChatListRequest()})
    setChats(data?.data ?? [])
    setTotalChats(data.total)
  }, 1000)
  const init = async () => {
    await loadChats(1)
    setLoading(false)
  }
  const loadChats = async (page: number) => {
    if (abortControllerRef.current) {
      abortControllerRef.current?.abort()
    }
    if(!isLoggedRef.current){
      return
    }
    abortControllerRef.current = new AbortController()


    try {
      const data = await ChatRepository.fetchAll({page, limit,
        ...getFilterChatListRequest()
      }, {signal: abortControllerRef.current?.signal!})

      abortControllerRef.current = null

      if (page === 1) {
        setChats(data.data)
      } else {
        setChats(i => [...i, ...data.data])
      }

      setTotalChats(data.total)
    } catch (e) {
      return
    }

  }
  useEffect(() => {
    isLoggedRef.current = isLogged
  }, [isLogged])

  useEffect(() => {
    filterRef.current = filter
  }, [filter])


  useEffect(() => {
    init()
  }, [])


  useEffect(() => {
    if(!currentChatId){
        return
    }
    const subscription = chatSocket.messageAllState$.subscribe((message) => {
      if (!checkIsFilterEmpty()) {
        return
      }
      if (chats.find(i => i.id === message.chatId)) {
        setChats(i => i.map(i => i.id === message.chatId ? {
          ...i,
          lastMessageAt: message.createdAt,
          lastMessage: message.message ?? '',
          totalUnread: message.chatId === currentChatId ? i.totalUnread : i.totalUnread + 1
        } : i)
          .sort(
            (objA, objB) => (new Date(objB.lastMessageAt)).getTime() - (new Date(objA.lastMessageAt)).getTime(),
          ))
      } else if (page === 1) {
        loadChats(1)
      }
    })

    const subscriptionChatUpdate = chatSocket.chatUpdateState$.subscribe((chat) => {
      if (!checkIsFilterEmpty()) {
        return
      }
      if (chats.find(i => i.id === chat.id)) {
        setChats(i => i.map(i => i.id === chat.id ? {
          ...i,
         ...chat
        } : i)
          .sort(
            (objA, objB) => (new Date(objB.lastMessageAt)).getTime() - (new Date(objA.lastMessageAt)).getTime(),
          ))
      } else if (page === 1) {
        loadChats(1)
      }
    })
    return () => {
      subscription.unsubscribe()
      subscriptionChatUpdate.unsubscribe()
    }

  }, [chats, currentChatId])

  useEffect(() => {
    const subscription = chatSocket.reconnectState$.subscribe(async (val) => {
      if (checkIsFilterEmpty()) {
        debouncedReconnect()
      }
    })
    return () => {
      subscription.unsubscribe()
    }

  }, [chats])
  useEffect(() => {
    if (!windowFocusInit.current) {
      windowFocusInit.current = true
      return
    }
    if (windowFocused && checkIsFilterEmpty()) {
      debouncedReconnect()
    }
  }, [windowFocused])
  const fetchMore = async () => {
    await loadChats(page + 1)
    setPage(page + 1)
  }

  const value: IState = {
    ...defaultValue,
    currentChatId,
    setCurrentChatId,
    chats,
    totalChats,
    loading,
    fetchMore,
    decreaseUnreadCount(chatId: number, total: number) {
      setChats(i => i.map(i => i.id === chatId ? {
        ...i,
        totalUnread: i.totalUnread - total < 0 ? 0 : i.totalUnread - total
      } : i))
    },
    scrollableTarget,
    filter,
    filterIsEmpty: checkIsFilterEmpty(),
    setFilter: (data) => {
      filterRef.current = data
      setFilter(data)
      loadChats(1)
    },

  }

  return (
    <ChatContext.Provider value={value}>
      {props.children}
    </ChatContext.Provider>
  )
}

export function useChatContext() {
  return useContext(ChatContext)
}
