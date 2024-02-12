import {createContext, useContext, useEffect, useState} from 'react'
import {useAppContext} from '@/context/state'
import {IPagination} from '@/data/interfaces/IPaginationRequest'
import {IVacancy} from '@/data/interfaces/IVacancy'
import VacancyRepository from '@/data/repositories/VacancyRepository'
import {IVacanciesByLocation} from '@/data/interfaces/IVacanciesByLocation'
import StatsRepository from '@/data/repositories/StatsRepository'
import {IStatsResponse} from '@/data/interfaces/IStats'
import {Nullable} from '@/types/types'

interface IState {
  vacanciesByLocation: IVacanciesByLocation
  vacanciesCurrentDay: IPagination<IVacancy>
  stats: Nullable<IStatsResponse>,
  vacanciesByLocationLoading: boolean
  vacanciesCurrentDayLoading: boolean
  statsLoading: boolean
  allLoaded: boolean
}

const defaultValue: IState = {
  vacanciesByLocation: {data: [], total: 0, location: null, searchBy: null},
  vacanciesCurrentDay: {data: [], total: 0},
  stats: null,
  vacanciesByLocationLoading: false,
  vacanciesCurrentDayLoading: false,
  statsLoading: false,
  allLoaded: false
}

const FindJobsMainContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode
  limit?: number
}

export function FindJobsMainWrapper(props: Props) {
  const appContext = useAppContext()

  const [vacanciesByLocation, setVacanciesByLocation] = useState<IVacanciesByLocation>({data: [], total: 0, location: null, searchBy: null})
  const [vacanciesCurrentDay, setVacanciesCurrentDay] = useState<IPagination<IVacancy>>({data: [], total: 0})
  const [stats, setStats] = useState<Nullable<IStatsResponse>>(null)
  const [vacanciesByLocationLoading, setVacanciesByLocationLoading] = useState(true)
  const [statsLoading, setStatsLoading] = useState(true)
  const [vacanciesCurrentDayLoading, setVacanciesCurrentDayLoading] = useState(true)
  const [allLoaded, setAllLoaded] = useState(false)

  useEffect(() => {
   Promise.all([VacancyRepository.findVacanciesNearByIp({nearMeByIp: true, page: 1, limit: 3}).then(vacancies => {
      setVacanciesByLocation(vacancies)
      setVacanciesByLocationLoading(false)
    }),
    VacancyRepository.findVacanciesCurrentDay({page: 1, limit: 3}).then(vacancies => {
      setVacanciesCurrentDay(vacancies)
      setVacanciesCurrentDayLoading(false)
    }),
     StatsRepository.fetchStats().then(i => {
       setStats(i)
       setStatsLoading(false)
     })
   ]).then(i => setAllLoaded(true))
  }, [])
  const value: IState = {
    ...defaultValue,
    vacanciesByLocation,
    vacanciesCurrentDay,
    stats,
    vacanciesByLocationLoading,
    vacanciesCurrentDayLoading,
    statsLoading,
    allLoaded
  }


  return (
    <FindJobsMainContext.Provider value={value}>
      {props.children}
    </FindJobsMainContext.Provider>
  )
}

export function useFindJobsMainContext() {
  return useContext(FindJobsMainContext)
}
