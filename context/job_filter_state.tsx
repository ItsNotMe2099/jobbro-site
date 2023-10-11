import { createContext, useContext, useState } from 'react'

interface IState {
  published: boolean
  draft: boolean
  paused: boolean
  market: boolean
  mobileApp: boolean
  showClosed: boolean
  date: string,
  projectName: string
  setPublished: (val: boolean) => void
  setPaused: (val: boolean) => void
  setDraft: (val: boolean) => void
  setMarket: (val: boolean) => void
  setMobileApp: (val: boolean) => void
  setShowClosed: (val: boolean) => void
  setDate: (val: string) => void
  setProjectName: (val: string) => void
}

const defaultValue: IState = {
  published: false,
  draft: false,
  paused: false,
  market: false,
  mobileApp: false,
  showClosed: false,
  date: '',
  projectName: '',
  setPublished: (val) => null,
  setPaused: (val) => null,
  setDraft: (val) => null,
  setMarket: (val) => null,
  setMobileApp: (val) => null,
  setShowClosed: (val) => null,
  setDate: (val) => null,
  setProjectName: (val) => null,
}

const JobFilterContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode
}

export function JobFilterWrapper(props: Props) {

  const [published, setPublished] = useState<boolean>(false)
  const [draft, setDraft] = useState<boolean>(false)
  const [paused, setPaused] = useState<boolean>(false)
  const [market, setMarket] = useState<boolean>(false)
  const [mobileApp, setMobileApp] = useState<boolean>(false)
  const [showClosed, setShowClosed] = useState<boolean>(false)
  const [date, setDate] = useState<string>('')
  const [projectName, setProjectName] = useState<string>('')

  const value: IState = {
    ...defaultValue,
    published,
    draft,
    paused,
    market,
    mobileApp,
    showClosed,
    date,
    projectName,
    setPublished: (val) => {
      setPublished(val)
    },
    setPaused: (val) => {
      setPaused(val)
    },
    setDraft: (val) => {
      setDraft(val)
    },
    setMarket: (val) => {
      setMarket(val)
    },
    setMobileApp: (val) => {
      setMobileApp(val)
    },
    setShowClosed: (val) => {
      setShowClosed(val)
    },
    setDate: (val) => {
      setDate(val)
    },
    setProjectName: (val) => {
      setProjectName(val)
    },
  }

  return (
    <JobFilterContext.Provider value={value}>
      {props.children}
    </JobFilterContext.Provider>
  )
}

export function useJobFilterContext() {
  return useContext(JobFilterContext)
}
