import { SidePanelType, SnackbarType } from '@/types/enums'
import { SnackbarData } from '@/types/types'
import { createContext, useContext, useState } from 'react'

interface IState {
  isMobile: boolean
  isDesktop: boolean
  isLogged: boolean
  isNotLogged: boolean
  snackbar: SnackbarData | null
  showSnackbar: (text: string, type: SnackbarType) => void
  sidePanel: SidePanelType | null
  panelArguments: any
  showSidePanel: (type: SidePanelType, args?: any) => void
  hidePanel: () => void
}

const defaultValue: IState = {
  isMobile: false,
  isLogged: false,
  isNotLogged: true,
  isDesktop: true,
  snackbar: null,
  sidePanel: null,
  panelArguments: null,
  showSidePanel: (type) => null,
  showSnackbar: (text, type) => null,
  hidePanel: () => null,
}

const AppContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode
  isMobile: boolean
  token?: string
}

export function AppWrapper(props: Props) {
  const [snackbar, setSnackbar] = useState<SnackbarData | null>(null)
  const [token, setToken] = useState<string | null>(props.token ?? null)
  const [sidePanel, setSidePanel] = useState<SidePanelType | null>(null)
  const [panelArguments, setPanelArguments] = useState<any>(null)

  const showSnackbar = (text: string, type: SnackbarType) => {
    setSnackbar({ text, type })
    setTimeout(() => {
      setSnackbar(null)
    }, 2000)
  }

  const showSidePanel = (type: SidePanelType, args?: any) => {
    setPanelArguments(args)
    setSidePanel(type)
  }

  const hidePanel = () => {
    setSidePanel(null)
    setPanelArguments(null)
  }

  const value: IState = {
    ...defaultValue,
    isLogged: !!token,
    isNotLogged: !token,
    isMobile: props.isMobile,
    isDesktop: !props.isMobile,
    snackbar,
    showSnackbar,
    sidePanel,
    panelArguments,
    showSidePanel,
    hidePanel,
  }

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext)
}
