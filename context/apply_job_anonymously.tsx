import {createContext, useContext, useEffect, useRef, useState} from 'react'
import {Nullable, RequestError} from '@/types/types'
import {useAppContext} from '@/context/state'
import {SnackbarType} from '@/types/enums'
import AuthRepository from '@/data/repositories/AuthRepository'
import AiCvRequestRepository from '@/data/repositories/AiCvRequestRepository'
import {IAiCvRequest} from '@/data/interfaces/IAiCvRequest'
import {IPagination} from '@/data/interfaces/IPaginationRequest'
import useInterval from 'use-interval'
import {AiRequestStatusFinished} from '@/data/enum/AiRequestStatus'

export enum ApplyJobAnonymouslyStepKey {
  First = 'first',
  Confirm = 'confirm',
  Apply = 'apply'
}

export interface IApplyJobAnonymouslyFormData {
  cv: Nullable<File>,
  image: Nullable<File>
  name: Nullable<string>
  email: Nullable<string>
  code: Nullable<string>
}

interface IState {
  formData: Nullable<IApplyJobAnonymouslyFormData>
  request: Nullable<IAiCvRequest>
  sending: boolean
  loading: boolean
  stepKey: ApplyJobAnonymouslyStepKey,
  register: (data: IApplyJobAnonymouslyFormData) => Promise<void>
  confirm: (code: string) => Promise<void>
}

const defaultValue: IState = {
  formData: null,
  request: null,
  sending: false,
  loading: false,
  stepKey: ApplyJobAnonymouslyStepKey.First,
  register: async (data: IApplyJobAnonymouslyFormData) => {
  },
  confirm: async (code: string) => {
  }
}

const ApplyJobAnonymizeContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode,
  vacancyId: number
}

export function ApplyJobAnonymizeWrapper(props: Props) {
  const appContext = useAppContext()
  const [formData, setFormData] = useState<Nullable<IApplyJobAnonymouslyFormData>>(null)
  const [sending, setSending] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [stepKey, setStepKey] = useState<ApplyJobAnonymouslyStepKey>(ApplyJobAnonymouslyStepKey.First)
  const [request, setRequest] = useState<Nullable<IAiCvRequest>>(null)
  const requestRef = useRef<Nullable<IAiCvRequest>>(null)
  const updateAbortController = useRef<AbortController | null>(null)
  useEffect(() => {
    requestRef.current = request
  }, [request])
  useInterval(() => {
    updateAbortController.current = new AbortController()
    if(!requestRef.current || AiRequestStatusFinished.includes(requestRef.current!.status)){
    return
    }
    const ids = requestRef.current ? [requestRef.current!.id] : []
    if (!ids.length) {
      return
    }
    AiCvRequestRepository.fetch({ids}).then((requests) => {
      if((requests as IAiCvRequest[]).length > 0) {
        requestRef.current = (requests as IAiCvRequest[])[0]
        setRequest((requests as IAiCvRequest[])[0])
      }

    })
  }, 5000)

  const init = async () => {
    console.log('appContext.isLogged', appContext.isLogged)
    if(!appContext.isLogged){

      return
    }
    const res = await AiCvRequestRepository.fetch({
      page: 1,
      limit: 1,
    }) as IPagination<IAiCvRequest>
    setRequest(res.data?.length > 0 ? res.data[0] : null)
    setLoading(false)
  }
  useEffect(() => {
   init()
  }, [])
  useEffect(() => {
    if(appContext.isLogged){
      setStepKey(ApplyJobAnonymouslyStepKey.Apply)
    }else{
      setStepKey(ApplyJobAnonymouslyStepKey.First)

    }
  }, [appContext.isLogged])
  const register = async (data: IApplyJobAnonymouslyFormData) => {
    try {
      setSending(true)
      setFormData(data)
      const res = await AuthRepository.registerEmployee({name: data.name, email: data.email})
      setStepKey(ApplyJobAnonymouslyStepKey.Confirm)
    } catch (err) {
      if (err instanceof RequestError) {
        appContext.showSnackbar(err.message, SnackbarType.error)
      }
    }
    setSending(false)
  }

  const confirm = async (code: string) => {
    try {
      setSending(true)
      const res = await AuthRepository.emailConfirmation({email: formData!.email!, code})
      await appContext.setToken(res.accessToken)
      if(formData!.cv) {
        const request = await AiCvRequestRepository.create(formData!.cv!, {vacancyId: props.vacancyId})
        setRequest(request)
      }
      setStepKey(ApplyJobAnonymouslyStepKey.Confirm)
    } catch (err) {
      if (err instanceof RequestError) {
        appContext.showSnackbar(err.message, SnackbarType.error)
      }
    }
    setSending(false)
  }
  const value: IState = {
    ...defaultValue,
    formData,
    request,
    sending,
    loading,
    stepKey,
    register,
    confirm,
  }
  return (
    <ApplyJobAnonymizeContext.Provider value={value}>
      {props.children}
    </ApplyJobAnonymizeContext.Provider>
  )
}

export function useApplyJobAnonymize() {
  return useContext(ApplyJobAnonymizeContext)
}
