import { IPagination } from '@/data/interfaces/IPaginationRequest'
import { IVacancy } from '@/data/interfaces/IVacancy'
import { IJobWidget } from '@/data/interfaces/JobWidgetType'
import JobWidgetRepository from '@/data/repositories/JobWidgetRepository'
import {Dispatch, SetStateAction, createContext, useContext, useEffect, useState} from 'react'
import {RequestError} from '@/types/types'
import {SnackbarType} from '@/types/enums'
import {useAppContext} from '@/context/state'
import {useRouter} from 'next/router'
import {Routes} from '@/types/routes'


interface IState {
  settings: Partial<IJobWidget>|undefined
  setSettings: Dispatch<SetStateAction<Partial<IJobWidget>|undefined>>
  saveSettings: (data?: Partial<IJobWidget>) => void
  getWidget: () => void
  token: string
  vacancies: Map<number, IVacancy[]>
  total: number
  page: number
  setPage: (p: number) => void
  loading: boolean
  editLoading: boolean
}

const JobWidgetContext = createContext<IState>({} as IState)

interface Props {
  children: React.ReactNode
  initialVacancies?: IPagination<IVacancy> | null
  settings?: Partial<IJobWidget>
}

export function JobWidgetWrapper(props: Props) {
  const appContext = useAppContext()
  const router = useRouter()
  const [settings, setSettings] = useState<Partial<IJobWidget>|undefined>(props.settings||undefined)
  const [vacancies, setVacancies] = useState<Map<number, IVacancy[]>>(props.initialVacancies? new Map([[1, props.initialVacancies.data]]) : new Map())
  const [token, setToken] = useState<string>(props.settings?.token||'')
  const [page, setPageState] = useState<number>(1)
  const [total, setTotal] = useState<number>(props?.initialVacancies?.total||0)
  const [loading, setLoading] = useState<boolean>(false)
  const [editLoading, setEditLoading] = useState<boolean>(false)
  const saveSettings = async (data?: Partial<IJobWidget>) => {
    setEditLoading(true)
    const dataToSave:Partial<IJobWidget> = {
      ...settings,
      categoriesIds: settings?.categories?.map(c=>c.id),
      locationIds: settings?.location?.map(l=>l.geonameid),
    }
    try{
     const res = await JobWidgetRepository.updateWidget(dataToSave)
      router.push(Routes.lkSettingsJobWidget)
      }catch (err) {
      if (err instanceof RequestError) {
        appContext.showSnackbar(err.message, SnackbarType.error)
      }
    }
    setEditLoading(false)

  }

  const getWidget = () => {
    setLoading(true)
    JobWidgetRepository.getWidgetSettings()
    .then(res => {
      if(res) {
        setSettings(res)
        setToken(res.token)
      }
      setLoading(false)
    })
  }

  const setPage = (p: number|undefined, refresh?: boolean) => {
    if(!p) {
      return
    }
    if(vacancies.has(p) && !refresh) {
      setPageState(p)
      return
    }
    setLoading(true)
    JobWidgetRepository.getVacanciesForWidget(token, p, settings?.jobsPerPage||2)
    .then(res => {
      if(res) {
        setVacancies(state=> {
          refresh && state.clear()
          state.set(p, res.data)
          return new Map(state)
        })
      }
      setPageState(p)
      setLoading(false)
    })
  }

  useEffect(()=>{
    if(vacancies.has(page)) {
      return
    }
    if(token && !props.initialVacancies && !props.settings) {
      setLoading(true)
      JobWidgetRepository.getVacanciesForWidget(token, page, settings?.jobsPerPage||2)
      .then(res => {
        if(res) {
          setTotal(res.total)
          setVacancies(state=> {
            state.set(page, res.data)
            return new Map(state)
          })
        }
        setLoading(false)
      })
    }

  }, [token])

  useEffect(()=>{
    if(settings?.jobsPerPage) {
      setPage(1, true)
    }
  }, [settings?.jobsPerPage])


  const value: IState = {
    settings,
    setSettings,
    saveSettings,
    getWidget,
    token,
    vacancies,
    total,
    page,
    setPage,
    loading,
    editLoading
  }

  return (
    <JobWidgetContext.Provider value={value as IState}>
      {props.children}
    </JobWidgetContext.Provider>
  )
}

export function useJobWidgetContext() {
  return useContext(JobWidgetContext)
}
