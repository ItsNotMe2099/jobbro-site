import styles from './index.module.scss'
import PersonalCard from '@/components/for_pages/Lk/Dashboard/LkDashboardLayout/PersonalCard'
import Card from '@/components/for_pages/Common/Card'
import { colors } from '@/styles/variables'
import CompletedSvg from '@/components/svg/CompletedSvg'
import SparksSmallSvg from '@/components/svg/SparksSmallSvg'
import CheckedSvg from '@/components/svg/CheckedSvg'
import StatisticCard from '@/components/for_pages/Lk/Dashboard/LkDashboardLayout/StatisitcCard'
import HotMarkers from '@/components/for_pages/Lk/Dashboard/LkDashboardLayout/HotMarkers'
import { useState} from 'react'
import {IDashboardGraphics, IDashboardStatistic} from '@/data/interfaces/IDashboardResponse'
import {Nullable} from '@/types/types'
import {useEffectOnce} from '@/components/hooks/useEffectOnce'
import DashboardRepository from '@/data/repositories/DashboardRepository'
import { IVacancyWithHiringStagesForDashBoard} from '@/data/interfaces/IVacancy'
import VacancyHiringStageCard from '@/components/for_pages/Lk/Dashboard/LkDashboardLayout/VacancyHiringStageCard'
import DashboardChartLine from '@/components/for_pages/Lk/Dashboard/LkDashboardLayout/DashboardChartLine'
import DashboardChartCircle from '@/components/for_pages/Lk/Dashboard/LkDashboardLayout/DashboardChartCircle'
import DashboardChartBars from '@/components/for_pages/Lk/Dashboard/LkDashboardLayout/DashboardChartBars'
import ChipList from '@/components/ui/ChipList'
import Analytics from '@/utils/goals'
import {Goal} from '@/types/enums'

interface Props {

}

const LkDashboardMyBoard = (props: Props) => {
  const [dashStatistic, setDashStatistic] = useState<Nullable<IDashboardStatistic>>(null)
  const [dashGraphics, setDashGraphics] = useState<Nullable<IDashboardGraphics>>(null)
  const [vacancyForHiringStage, setVacancyForHiringStage] = useState<Nullable<IVacancyWithHiringStagesForDashBoard>>(null)
  const init = async () => {
    await  Promise.all([
      fetchStatistic(),
      fetchGraphics(),
      fetchHiringStage()
    ])
  }

  useEffectOnce(() => {
      Analytics.goal(Goal.DashboardMyView)
  })

  const fetchHiringStage =  async () => {
    const res = await DashboardRepository.fetchHiringStageConversion({page: 1, limit: 1})
    setVacancyForHiringStage(res?.length > 0 ? res[0] : null)
  }
  const fetchStatistic = async () => {
    setDashStatistic(await DashboardRepository.fetchStatistic({}))
  }
  const fetchGraphics = async () => {
    setDashGraphics(await DashboardRepository.fetchGraphics({}))
  }
  useEffectOnce(() => {
    init()
  })



  return (
    <div className={styles.root}>
      <div className={styles.top}>
        <div className={styles.left}>
          <PersonalCard  />
          <Card className={styles.stats}>
            <div className={styles.item}>
              <div className={styles.leftSide}>
                <SparksSmallSvg color={colors.textSecondary} />
                <div className={styles.label}>Saved time with AI</div>
              </div>
              <div className={styles.right}>
                {dashStatistic?.savedTimeWithAi ?? ''}
              </div>
            </div>
            <div className={styles.item}>
              <div className={styles.leftSide}>
                <CompletedSvg color={colors.textSecondary} />
                <div className={styles.label}>Сompleted jobs</div>
              </div>
              <div className={styles.right}>
                {dashStatistic?.completedJobs ?? ''}
              </div>
            </div>
            <div className={styles.item}>
              <div className={styles.leftSide}>
                <CheckedSvg color={colors.textSecondary} />
                <div className={styles.label}>Checked CV per day</div>
              </div>
              <div className={styles.right}>
                {dashStatistic?.checkedCVPerDay ?? ''}
              </div>
            </div>
          </Card>
        </div>
        {dashStatistic && <StatisticCard statistic={dashStatistic} />}
      </div>
      {dashGraphics && <Card >
        <ChipList>
        <DashboardChartCircle className={styles.chart} label={'New Candidates'} value={dashGraphics.newCandidates.applications_in_week + dashGraphics.newCandidates.proposals_in_week} progress={50} color={'#FB6F9E'} suffixType={'percent'}/>
        <DashboardChartBars className={styles.chart} label={'Processed Candidates'} value={dashGraphics.processedCandidates.applications_processed_in_week + dashGraphics.processedCandidates?.proposals_processed_in_week} color={'#67C8FF'}/>
          {/*<DashboardChartCircle className={styles.chart} label={'Hiring Stage Conversion'}  value={0} progress={50} suffixType={'percent'}/>*/}
        <DashboardChartCircle className={styles.chart} label={'Average move time by hiring stage'}  value={`${dashGraphics.averageMoveTime.average_move_time_in_week}`} progress={50} suffixType={'minutes'} color={'#2E77E5'}/>
        <DashboardChartLine className={styles.chart} label={'Jobs being processed'}  value={dashGraphics.jobsBeingProcessed.manager_vacancies_published_in_week + dashGraphics.jobsBeingProcessed.total_vacancies_published_in_week} />
        <DashboardChartBars className={styles.chart} label={'Turnover During Probationary'}  value={75}  color={'#FF385D'}/>
        </ChipList>
      </Card>}
      <>
      {vacancyForHiringStage &&  <VacancyHiringStageCard vacancy={vacancyForHiringStage} onMain={true}/>}
      </>
      <HotMarkers  />
    </div>
  )
}

export default LkDashboardMyBoard
