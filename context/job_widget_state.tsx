import { IJobWidget } from '@/data/interfaces/JobWidgetType'
import JobWidgetRepository from '@/data/repositories/JobWidgetRepository'
import {Dispatch, SetStateAction, createContext, useContext, useState} from 'react'


interface IState {
  settings: Partial<IJobWidget>
  setSettings: Dispatch<SetStateAction<Partial<IJobWidget>>>
  saveSettings: (data?: Partial<IJobWidget>) => void
  getWidget: () => void
  token: string
}

const JobWidgetContext = createContext<IState>({} as IState)

interface Props {
  children: React.ReactNode
}

export function JobWidgetWrapper(props: Props) {
  const [settings, setSettings] = useState<Partial<IJobWidget>>({})
  const [token, setToken] = useState<string>('')

  const saveSettings = (data?: Partial<IJobWidget>) => {
    const dataToSave:Partial<IJobWidget> = {
      ...settings,
      categoriesIds: settings?.category?.map(c=>c.id),
      locationIds: settings?.location?.map(l=>l.geonameid),
    }
    JobWidgetRepository.updateWidget(dataToSave)
    .then(res=> {
      debugger
    })
  }

  const getWidget = () => {
    JobWidgetRepository.getWidgetSettings()
    .then(res => {
      if(res) {
        setSettings(res)
        setToken(res.token)
      }
    })
  }


  const value: IState = {
    settings,
    setSettings,
    saveSettings,
    getWidget,
    token
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
