import { IGeoName } from '@/data/interfaces/ILocation'
import { IVacancy } from '@/data/interfaces/IVacancy'
import { IVacancyFilterParams } from '@/data/interfaces/IVacancySearchParams'
import VacancyRepository from '@/data/repositories/VacancyRepository'
import { useRouter } from 'next/router'
import {  Dispatch, MutableRefObject, SetStateAction, createContext, useContext, useEffect, useRef, useState } from 'react'

export interface IVacancySearchStateProps {
  filters: MutableRefObject<Partial<IVacancyFilterParams>>
  vacancies: Map<number, IVacancy>
  setVacancies: (clear?: boolean) => void
  total: number,
  nextPage: () => void
  clearQuery: (link?: string) => void
  loading: boolean
  fullCities: Map<number, IGeoName>
  setFullCities: Dispatch<SetStateAction<Map<number, IGeoName>>>
  fullCountries: Map<number, IGeoName>
  setFullCountries: Dispatch<SetStateAction<Map<number, IGeoName>>>
}


const VacancySearchContext = createContext<IVacancySearchStateProps>({} as IVacancySearchStateProps)

interface Props {
  children: React.ReactNode,
  filters?: IVacancyFilterParams
}

export function VacancySearchWrapper(props: Props) {

  const [vacancies, setVacanciesState] = useState<Map<number, IVacancy>>(new Map)
  const filters = useRef<IVacancyFilterParams>({...props.filters, page: 1, limit: 10})
  const [loading, setLoading] = useState<boolean>(true)
  const [total, setTotalState] = useState<number>(0)
  const [fullCities, setFullCities] = useState<Map<number, IGeoName>>(new Map)
  const [fullCountries, setFullCountries] = useState<Map<number, IGeoName>>(new Map)

  const router = useRouter()

  const setVacancies = (clear?: boolean) => {
    setLoading(true)
    VacancyRepository.findVacancies(filters.current).then(res => {
      setTotalState(res?.total ?? 0)
      setLoading(false)
      setVacanciesState(state => {
        clear&&state.clear()
        res?.data.forEach(i => {
          state.set(i.id, i)
        })
        return new Map(state)
      })
    })
  }

  const nextPage = () => {
    filters.current.page = (filters?.current?.page||1) + 1
    setVacancies()
  }


  const clearQuery = () => {
    router.replace(router.pathname, undefined, { shallow: true })
  }

  useEffect(()=>{
    setVacancies()
    clearQuery()
  }, [])

  const value: IVacancySearchStateProps = {
    vacancies,
    setVacancies,
    filters: filters,
    total,
    nextPage,
    clearQuery,
    loading,
    fullCities,
    setFullCities,
    fullCountries,
    setFullCountries
  } as IVacancySearchStateProps

  return (
    <VacancySearchContext.Provider value={value}>
      {props.children}
    </VacancySearchContext.Provider>
  )
}

export function useVacancySearchContext() {
  return useContext(VacancySearchContext)
}
