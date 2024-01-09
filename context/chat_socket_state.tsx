import {createContext, useContext, useEffect, useRef, useState} from 'react'
import {Subject} from 'rxjs'
import io, {Socket} from 'socket.io-client'
import {runtimeConfig} from 'config/runtimeConfig'
import IChatMessage from 'data/interfaces/IChatMessage'
import Cookies from 'js-cookie'
import {CookiesType} from 'types/enums'
import {useAppContext} from 'context/state'
import IChat from '@/data/interfaces/IChat'
const chatIds: number[] = []
const receivingPointIds: number[] = []
interface IState {
  reconnectState$: Subject<boolean>,
  messageState$: Subject<IChatMessage>,
  messageAllState$: Subject<IChatMessage>,
  chatUpdateState$: Subject<IChat>,
  chatCreateState$: Subject<IChat>,
  join: (chatId: number) => void,
  leave: (chatId: number) => void
}
const reconnectState$ = new Subject<boolean>()
const messageState$ = new Subject<IChatMessage>()
const messageAllState$ = new Subject<IChatMessage>()
const chatUpdateState$ = new Subject<IChat>()
const chatCreateState$ = new Subject<IChat>()

const defaultValue: IState = {
  reconnectState$,
  messageState$,
  messageAllState$,
  chatUpdateState$,
  chatCreateState$,
  join: (chatId: number) => null,
  leave: (chatId: number) => null
}

const ChatSocketContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode
}

export function ChatSocketWrapper(props: Props) {
  const appContext = useAppContext()
  const reconnectCountRef = useRef<number>(0)
  const [socket, setSocket] = useState<Socket | null>(null)
  useEffect(() => {
    if(!appContext.isLogged){
      return
    }
    const s = io(runtimeConfig.HOST, {
      path: '/api/chat-socket',
      reconnectionDelayMax: 10000,
      reconnection: true,
      transports: ['websocket'],
      query: {
        token: Cookies.get(CookiesType.accessToken),
      },
    })
    setSocket(s)
    return () => {
      if (socket && socket.connected) {
        socket.disconnect()
      }
    }
  }, [appContext.isLogged])



  useEffect(() => {
    if (!socket) {
      return
    }
    const onConnect = () => {
      reconnectCountRef.current += 1
      if(  reconnectCountRef.current  > 1){
        reconnectState$.next(true)
      }
      for(const chatId of chatIds){
        socket.emit('chat:join', {chatId})
      }
    }
    const onRecConnect = () => {
     onConnect()
      }
    const onDisConnect = () => {
      socket.once('reconnect', () => {
        setSocket(socket)
      })
    }
    const onChatMessage = ({message}: {message: IChatMessage}) => {
      messageState$.next(message)
    }
    const onChatMessageAll = ({message}: {message: IChatMessage}) => {
      messageAllState$.next(message)
    }
    const onChatUpdated = (chat: IChat) => {
      chatUpdateState$.next(chat)
    }
    const onChatCreated = (chat: IChat) => {
      chatCreateState$.next(chat)
    }

    socket.on('connect', onConnect)
    socket.on('reconnect', onRecConnect)
    socket.on('disconnect', onDisConnect)
    socket.on('chat:message' , onChatMessage)
    socket.on('chat:message:all' , onChatMessageAll)
    socket.on('chat:updated' , onChatUpdated)
    socket.on('chat:created' , onChatCreated)
    return () => {
      socket.off('connect', onConnect)
      socket.off('reconnect', onRecConnect)
      socket.off('disconnect', onDisConnect)
      socket.off('chat:message', onChatMessage)
      socket.off('chat:message:all', onChatMessageAll)
      socket.off('chat:updated' , onChatUpdated)
      socket.off('chat:created' , onChatCreated)
    }
  }, [socket])


  const value: IState = {
    ...defaultValue,
    join: (chatId: number) => {
      if(!chatIds.includes(chatId)) {
        chatIds.push(chatId)
      }
      socket?.emit('chat:join', {chatId})

    },
    leave: (chatId: number) => {
      const index = chatIds.findIndex(i => i === chatId)
      if(index >= 0) {
        chatIds.splice(index, 1)
      }
      socket?.emit('chat:leave', {chatId})
    }
  }

  return (
    <ChatSocketContext.Provider value={value}>
      {props.children}
    </ChatSocketContext.Provider>
  )
}

export function useChatSocketContext() {
  return useContext(ChatSocketContext)
}
