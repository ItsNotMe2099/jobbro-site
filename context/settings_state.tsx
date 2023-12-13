import { createContext, useContext, useState } from 'react'
import { useAppContext } from '@/context/state'

interface IState {
  paymentMethod: string
  history: any[]
}

const defaultValue: IState = {
  paymentMethod: '',
  history: []

}

const SettingsContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode,
}

export function SettingsWrapper(props: Props) {
  const appContext = useAppContext()
  const [paymentMethod, setPaymentMethod] = useState<string>('')
  const [history, setHistory] = useState<any[]>([])

  const value: IState = {
    ...defaultValue,
    paymentMethod,
    history
  }

  return (
    <SettingsContext.Provider value={value}>
      {props.children}
    </SettingsContext.Provider>
  )
}

export function useSettingsContext() {
  return useContext(SettingsContext)
}
