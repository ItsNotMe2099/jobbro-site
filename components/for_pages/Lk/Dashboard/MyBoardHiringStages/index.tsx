import styles from './index.module.scss'
import { useState} from 'react'
import {useEffectOnce} from '@/components/hooks/useEffectOnce'
import DashboardRepository from '@/data/repositories/DashboardRepository'
import { IVacancyWithHiringStagesForDashBoard} from '@/data/interfaces/IVacancy'
import VacancyHiringStageCard from '@/components/for_pages/Lk/Dashboard/LkDashboardLayout/VacancyHiringStageCard'

interface Props {

}

const MyBoardHiringStages = (props: Props) => {
  const [vacancies, setVacancies] = useState<IVacancyWithHiringStagesForDashBoard[]>([])
  const init = async () => {
    fetch()
  }

  const fetch =  async () => {
    const res = await DashboardRepository.fetchHiringStageConversion({})
    setVacancies(res)
  }
  useEffectOnce(() => {
    init()
  })



  return (
    <div className={styles.root}>
      {vacancies.map(i =>  <VacancyHiringStageCard key={i.id} vacancy={i} />)}
    </div>
  )
}

export default MyBoardHiringStages
