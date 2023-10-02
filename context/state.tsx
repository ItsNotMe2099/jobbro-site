import { SidePanelType, SnackbarType } from '@/types/enums'
import { SnackbarData } from '@/types/types'
import { createContext, useContext, useState } from 'react'
import { Subject } from 'rxjs'

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
  fileUploadingState$: Subject<boolean>
  setIsFilesUploading: (value: boolean) => void
  isFilesUploading: boolean
}

const fileUploadingState$ = new Subject<boolean>()

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
  setIsFilesUploading: (value) => null,
  isFilesUploading: false,
  fileUploadingState$,
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
  const [isFilesUploading, setIsFilesUploading] = useState<boolean>(false)

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
    isFilesUploading,
    setIsFilesUploading: (value) => {
      setIsFilesUploading(value)
      fileUploadingState$.next(value)
    }
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
