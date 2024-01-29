import {createContext, useContext, useEffect, useMemo, useRef, useState} from 'react'
import {useAppContext} from 'context/state'
import {ProfileType} from '@/data/enum/ProfileType'
import {IAiCvRequest} from '@/data/interfaces/IAiCvRequest'
import IAboutMe from '@/data/interfaces/IAboutMe'
import {Nullable} from '@/types/types'
import AiCvRequestRepository from '@/data/repositories/AiCvRequestRepository'
import {IPagination} from '@/data/interfaces/IPaginationRequest'
import {AiRequestStatus} from '@/data/enum/AiRequestStatus'
import showToast from '@/utils/showToast'
import Spinner from '@/components/ui/Spinner'
import {Routes} from '@/types/routes'
import CloseToast from '@/components/ui/Toast/CloseToast'
import {toast} from 'react-toastify'

enum JobApplyFormToShow {
  FirstApply = 'firstApply',
  Chat = 'chat',
  Calendar = 'calendar'
}


interface IState {
  requests: IAiCvRequest[]
  initialLoaded: boolean
  isShowApplyForm: boolean
}

const defaultValue: IState = {
  requests: [],
  initialLoaded: false,
  isShowApplyForm: false

}

const EmployeeAiCvRequestsContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode
}

export function EmployeeAiCvRequestsWrapper(props: Props) {
  const appContext = useAppContext()
  const [requests, setRequests] = useState<IAiCvRequest[]>([])
  const [initialLoaded, setInitialLoaded] = useState<boolean>(false)
  const isLogged = appContext.isLogged
  const isLoggedRef = useRef<boolean>(isLogged)
  const aboutMeRef = useRef<Nullable<IAboutMe>>(null)
  const requestsRef = useRef<IAiCvRequest[]>([])
  const intervalRef = useRef<Nullable<NodeJS.Timeout>>(null)
  const abortFetchControllerRef = useRef<AbortController | null>(null)
  const showedToastsByIdStatus = useRef<string[]>([])
  useEffect(() => {
    const createSubscription = appContext.aiRequestCreateState$.subscribe((req) => {
      if (!requests.find(i => i.id === req.id)) {
        setRequests((a) => [req, ...a])
        processRequests([req, ...requestsRef.current])
      }
    })
    const updateSubscription = appContext.aiRequestUpdateState$.subscribe((req) => {
      setRequests(i => i.map(i => i.id == req.id ? ({...i, ...req}) : i))
    })

    const subscriptionCvUpdate = appContext.cvUpdateState$.subscribe((cv) => {
      setRequests(i =>  i.map(i => i.cv?.id == cv.id ? ({...i, cv: {...i.cv, ...cv}}) : i))
    })
    return () => {
      createSubscription.unsubscribe()
      updateSubscription.unsubscribe()
      subscriptionCvUpdate.unsubscribe()
    }
  }, [requests])
  useEffect(() => {
    requestsRef.current = requests

  }, [requests])

  useEffect(() => {
    console.log('US111', appContext.isLogged, appContext.aboutMe?.profileType)
    if (appContext.isLogged && appContext.aboutMe?.profileType === ProfileType.Employee) {
      startMonitor()
    } else {
      stopMonitor()
    }
    aboutMeRef.current = appContext.aboutMe
  }, [appContext.aboutMe?.profileType, appContext.isLogged])

  const startMonitor = () => {
    console.log('StartMonitor22')
    if (intervalRef.current) {
      clearInterval(intervalRef.current!)
    }
    fetch().then(i => {
      setTimeout(() => setInitialLoaded(true), 100)
      intervalRef.current = setInterval(fetch, 20000)
    })

  }
  const stopMonitor = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current!)
      intervalRef.current = null
      setRequests([])
      setInitialLoaded(false)
      if (abortFetchControllerRef.current) {
        abortFetchControllerRef.current?.abort()
      }
    }
  }
  const fetch = async () => {
    console.log('FetchRequests')
    if (abortFetchControllerRef.current) {
      abortFetchControllerRef.current?.abort()
    }
    abortFetchControllerRef.current = new AbortController()
    try {
      const res = await AiCvRequestRepository.fetch({
        limit: 10,
        page: 1
      })
      const newData = (res as IPagination<IAiCvRequest>).data

      setRequests(newData)
      processRequests(newData)
    } catch (e) {
      console.error('Erro1111', e)
    }
  }
  const processRequests = (requests: IAiCvRequest[]) => {
    const req = requests.length > 0 ? requests[0] : null
    console.log('ShowToastTry', req)
    if (req && req.status !== req.lastStatusRead) {
      console.log('ShowToast', req.status)
      showRequestStatusToast(requests[0])
    }
  }
  const sendRequestSetRead = async (request: IAiCvRequest) => {
    const newRequest = await AiCvRequestRepository.setReadLastStatus(request.id)
    appContext.aiRequestUpdateState$.next({
      status: newRequest.status,
      lastStatusRead: newRequest.lastStatusRead
    } as IAiCvRequest)
  }
  const showRequestStatusToast = (request: IAiCvRequest) => {
    const toastId = `ai-cv-request-${request.id}-${request.status}`
    if (showedToastsByIdStatus.current.includes(toastId)) {
      return
    }
    switch (request.status) {
      case AiRequestStatus.InProgress:
      case AiRequestStatus.InQueue:
      case AiRequestStatus.Finished:
        if (request.status === AiRequestStatus.Finished) {
           showToast({
            title: 'Resume is ready!',
            text: 'The resume is ready. You can view it right now.',
             linkName: 'Show now',
             link: Routes.profileResumeEdit(request.cv!.id!),
             linkOnClick: (e) => {
                sendRequestSetRead(request)
                toast.dismiss(toastId)
             }
          }, {
            data: request,
            toastId,
            autoClose: false,
            closeButton: <CloseToast onClickCustom={() => sendRequestSetRead(request)}/>
          })
        } else {
          showToast({title: 'Processing...', text: 'Your resume is being processed.', icon: <Spinner size={24}/>}, {
            data: request,
            toastId,
            autoClose: false,
            closeButton: <CloseToast onClickCustom={() => sendRequestSetRead(request)}/>
          })
        }
        showedToastsByIdStatus.current.push(toastId)
        break
      default:
        break
    }
  }


  const isShowApplyForm = useMemo<boolean>(() => {
    const request = requests.length > 0 ? requests[0] : null
    if(!appContext.allLoaded){
      return false
    }
    if(!appContext.isLogged){
      return true
    }

    if(!initialLoaded){
      return false
    }
    if(request){
      console.log('request.cv', request.cv)
        if(!([AiRequestStatus.Error] as AiRequestStatus[]).includes(request.status) && !request.cv?.isChecked){
          return true
        }
      return false
    }else{
      return false
    }

  }, [appContext.isLogged, appContext.allLoaded, requests, initialLoaded])

  const value: IState = {
    ...defaultValue,
    requests,
    initialLoaded,
    isShowApplyForm,
  }

  return (
    <EmployeeAiCvRequestsContext.Provider value={value}>
      {props.children}
    </EmployeeAiCvRequestsContext.Provider>
  )
}

export function useEmployeeAiCvRequestsContext() {
  return useContext(EmployeeAiCvRequestsContext)
}

