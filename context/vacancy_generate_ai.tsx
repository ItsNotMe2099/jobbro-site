import {createContext, useContext, useEffect, useRef, useState} from 'react'
import {Subject} from 'rxjs'
import io, {Socket} from 'socket.io-client'
import {runtimeConfig} from 'config/runtimeConfig'
import Cookies from 'js-cookie'
import {CookiesType, SnackbarType} from 'types/enums'
import {useAppContext} from 'context/state'
import IAiVacancyGenRequestUpdate from '@/data/interfaces/IAiVacancy'
import AiVacancyGenRequestRepository from '@/data/repositories/AiRequestRepository'
import IAiVacancyGenRequest from '@/data/interfaces/IAiVacancy'
import {Nullable, RequestError} from '@/types/types'
import {debounce} from 'debounce'
import useWindowFocus from 'use-window-focus'
import {AiRequestStatus} from '@/data/enum/AiRequestStatus'
interface IState {
  reconnectState$: Subject<boolean>,
  requestUpdateState$: Subject<IAiVacancyGenRequestUpdate>,
  join: (chatId: number) => void,
  leave: (chatId: number) => void,
  request: Nullable<IAiVacancyGenRequest>
  create: (message: string) => void
  loading: boolean
  sending: boolean
}
const reconnectState$ = new Subject<boolean>()
const requestUpdateState$ = new Subject<IAiVacancyGenRequest>()
const requestRawUpdateState$ = new Subject<IAiVacancyGenRequest>()

const defaultValue: IState = {
  reconnectState$,
  requestUpdateState$,
  join: () => null,
  leave: () => null,
  request: null,
  create: (message: string) => null,
  loading: false,
  sending: false
}

const VacancyGenerateAiContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode
}

export function VacancyGenerateAiWrapper(props: Props) {
  const appContext = useAppContext()
  const reconnectCountRef = useRef<number>(0)
  const windowFocused = useWindowFocus()
  const [socket, setSocket] = useState<Socket | null>(null)
  const [request, setRequest] = useState<Nullable<IAiVacancyGenRequest>>(null)
  const [sending, setSending] = useState<boolean>(false)
  const reconnectRef = useRef<boolean>(false)
  const windowFocusInit = useRef(false)
  const requestRef = useRef<Nullable<IAiVacancyGenRequest>>(null)
  const debouncedReconnect = debounce(async () => {
    if (!reconnectRef.current) {
      return
    }
    fetch()
  }, 1000)
  useEffect(() => {
    requestRef.current = request
  }, [request])
  useEffect(() => {

    if (!windowFocusInit.current) {
      windowFocusInit.current = true
      return
    }
    if (windowFocused) {
      reconnectRef.current = true
      debouncedReconnect()
    }
  }, [windowFocused])
  useEffect(() => {
    if(!appContext.isLogged){
      return
    }
    console.log('ChatSocket11')
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


  const fetch = () => {
    if(!requestRef.current  || ([AiRequestStatus.Finished, AiRequestStatus.Error] as AiRequestStatus[]).includes(requestRef.current?.status as AiRequestStatus)){
      return
    }
    AiVacancyGenRequestRepository.fetchById(requestRef.current!.id).then(i => setRequest(i))
  }
  const create = async (message: string) => {
    try {
      setSending(true)
      const request = await AiVacancyGenRequestRepository.create(message)
      setRequest(request)
    } catch (err) {
      if (err instanceof RequestError) {
        appContext.showSnackbar(err.message, SnackbarType.error)
      }
    }

    setSending(false)
  }

  useEffect(() => {
    if (!socket) {
      return
    }

    const onConnect = () => {
      console.log('SocketOneConnect')
      reconnectCountRef.current += 1
      if(  reconnectCountRef.current  > 1){
        reconnectState$.next(true)
      }
      socket.emit('vacancy-gen:join')
    }
    const onRecConnect = () => {
     onConnect()
      }
    const onDisConnect = () => {
      socket.once('reconnect', () => {
        setSocket(socket)
      })
    }
    const onRequest = (data: IAiVacancyGenRequestUpdate) => {
      requestRawUpdateState$.next(data)
    }


    socket.on('connect', onConnect)
    socket.on('reconnect', onRecConnect)
    socket.on('disconnect', onDisConnect)
    socket.on('request' , onRequest)
    const subscription = reconnectState$.subscribe(async (message) => {
      reconnectRef.current = true
      debouncedReconnect()
    })
    return () => {
      socket.off('connect', onConnect)
      socket.off('reconnect', onRecConnect)
      socket.off('disconnect', onDisConnect)
      socket.off('request', onRequest)
      subscription.unsubscribe()
    }
  }, [socket])
  useEffect(() => {
    const subscriptionUpdate = requestRawUpdateState$.subscribe((request: IAiVacancyGenRequest) => {
      console.log('subscriptionUpdate', request, requestRef.current, request?.id === requestRef.current?.id || !requestRef.current?.id)
      if(request?.id === requestRef.current?.id || !requestRef.current?.id) {
        setRequest(request)
        requestUpdateState$.next(request)
      }
    })
    return () => {
      subscriptionUpdate.unsubscribe()
    }
  }, [request])

  const value: IState = {
    ...defaultValue,
    join: () => {
      socket?.emit('vacancy-gen:join')
    },
    leave: () => {
      socket?.emit('vacancy-gen:leave')
    },
    create,
    request,
    loading: !!request && !([AiRequestStatus.Finished, AiRequestStatus.Error] as AiRequestStatus[]).includes(request.status as AiRequestStatus),
    sending
  }

  return (
    <VacancyGenerateAiContext.Provider value={value}>
      {props.children}
    </VacancyGenerateAiContext.Provider>
  )
}

export function useVacancyGenerateAiContext() {
  return useContext(VacancyGenerateAiContext)
}
