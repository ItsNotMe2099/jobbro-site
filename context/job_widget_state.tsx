import { IJobWidget } from '@/data/interfaces/JobWidgetType'
import {Dispatch, SetStateAction, createContext, useContext, useEffect, useState} from 'react'


interface IState {
  settings: Partial<IJobWidget>
  setSettings: Dispatch<SetStateAction<Partial<IJobWidget>>>
}

const JobWidgetContext = createContext<IState>({} as IState)

interface Props {
  children: React.ReactNode
}

export function JobWidgetWrapper(props: Props) {
  const [settings, setSettings] = useState<Partial<IJobWidget>>({})


  const value: IState = {
    settings,
    setSettings
  }

  useEffect(()=>{
    console.log(settings)
    
  
  }, [settings])


  return (
    <JobWidgetContext.Provider value={value as IState}>
      {props.children}
    </JobWidgetContext.Provider>
  )
}

export function useJobWidgetContext() {
  return useContext(JobWidgetContext)
}
