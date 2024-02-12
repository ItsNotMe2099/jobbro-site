import { createContext, useContext, useState, useEffect} from 'react'
import {IVacancyShareSettings} from '@/data/interfaces/IVacancyShareSettings'
import VacancySharingSettingsRepository from '@/data/repositories/VacancySharingSettingsRepository'
import {Nullable, RequestError} from '@/types/types'
import {SnackbarType} from '@/types/enums'
import {useAppContext} from '@/context/state'


interface IState {
  settings: Partial<IVacancyShareSettings>|undefined|null
  saveSettings: (data: Partial<IVacancyShareSettings>) => void
  fetch: () => Promise<IVacancyShareSettings | null>
  loading: boolean
  editLoading: boolean,
}

const VacancyShareSettingsContext = createContext<IState>({} as IState)

interface Props {
  children: React.ReactNode
}

export function VacancyShareSettingsWrapper(props: Props) {
  const appContext = useAppContext()
  const [settings, setSettings] = useState<Nullable<IVacancyShareSettings>>(null)
  const [editLoading, setEditLoading] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)

  const saveSettings = async (data: Partial<IVacancyShareSettings>) => {
    setEditLoading(true)
    try {
      await VacancySharingSettingsRepository.update(data)
      setSettings((i) => ({...i, ...data} as IVacancyShareSettings))

    } catch (err) {
      if (err instanceof RequestError) {
        appContext.showSnackbar(err.message, SnackbarType.error)
      }
    }
    setEditLoading(false)
  }

  const fetch = async () => {
    const res = await VacancySharingSettingsRepository.fetch()
    setSettings(res)
    setLoading(false)
    return res
  }

  useEffect(() => {
    fetch()
  }, [])
  const value: IState = {
    settings,
    saveSettings,
    fetch,
    loading,
    editLoading
  }

  return (
    <VacancyShareSettingsContext.Provider value={value as IState}>
      {props.children}
    </VacancyShareSettingsContext.Provider>
  )
}

export function useVacancyShareSettingsContext() {
  return useContext(VacancyShareSettingsContext)
}
