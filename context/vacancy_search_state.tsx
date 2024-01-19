import { IVacancy } from '@/data/interfaces/IVacancy'
import { IVacancyFilterParams } from '@/data/interfaces/IVacancySearchParams'
import VacancyRepository from '@/data/repositories/VacancyRepository'
import {  MutableRefObject, createContext, useContext, useEffect, useRef, useState } from 'react'

interface IState {
  filters: MutableRefObject<Partial<IVacancyFilterParams>>
  vacancies: Map<number, IVacancy>
  setVacancies: (clear?: boolean) => void
  total: number,
  nextPage: () => void
}


const VacancySearchContext = createContext<Partial<IState>>({})

interface Props {
  children: React.ReactNode,
  filters?: IVacancyFilterParams
}

export function VacancySearchWrapper(props: Props) {
  const [vacancies, setVacanciesState] = useState<Map<number, IVacancy>>(new Map)
  const filters = useRef<IVacancyFilterParams>({...props.filters, page: 1, limit: 10}) as MutableRefObject<IVacancyFilterParams>
  const [total, setTotalState] = useState<number>(0)

  const setVacancies = (clear?: boolean) => {
    VacancyRepository.findVacancies(filters.current).then(res => {
      setTotalState(res?.total ?? 0)
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
    // не знаю почему он считает что filters может быть undefined, если вот он, вверху константой забит... бред
    // @ts-ignore
    filters.current.page = filters.current.page + 1
    setVacancies()
  }

  useEffect(()=>{
    setVacancies()
  }, [])

  const value: IState = {
    vacancies,
    setVacancies,
    filters: filters,
    total,
    nextPage
  }

  return (
    <VacancySearchContext.Provider value={value}>
      {props.children}
    </VacancySearchContext.Provider>
  )
}

export function useVacancySearchContext() {
  return useContext(VacancySearchContext)
}
