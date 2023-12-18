import styles from './index.module.scss'
import Card from '@/components/for_pages/Common/Card'
import {useState} from 'react'
import {IDashboardGraphics, IDashBoardManager} from '@/data/interfaces/IDashboardResponse'
import {Nullable} from '@/types/types'
import {useEffectOnce} from '@/components/hooks/useEffectOnce'
import DashboardRepository from '@/data/repositories/DashboardRepository'
import ChipList from '@/components/ui/ChipList'
import DashboardChartCircle from '@/components/for_pages/Lk/Dashboard/LkDashboardLayout/DashboardChartCircle'
import DashboardChartBars from '@/components/for_pages/Lk/Dashboard/LkDashboardLayout/DashboardChartBars'
import DashboardChartLine from '@/components/for_pages/Lk/Dashboard/LkDashboardLayout/DashboardChartLine'
import DashBoardManagerCard from '@/components/for_pages/Lk/Dashboard/LkDashboardLayout/DashBoardManagerCard'
import {CardViewType} from '@/types/enums'
import CardsLayout from '@/components/ui/CardsLayout'

interface Props {

}

const LkDashboardTeamBoard = (props: Props) => {
  const [dashGraphics, setDashGraphics] = useState<Nullable<IDashboardGraphics>>(null)
  const [managers, setManagers] = useState<IDashBoardManager[]>([])
  const init = async () => {
    await  Promise.all([
      fetchGraphics(),
      fetchManagers()
    ])

  }
  const fetchManagers =  async () => {
    setManagers(await DashboardRepository.fetchManagers())
    }

  const fetchGraphics = async () => {
    setDashGraphics(await DashboardRepository.fetchTeamGraphics())
  }
  useEffectOnce(() => {
    init()
  })



  return (
    <div className={styles.root}>
      {dashGraphics && <Card >
        <ChipList>
          <DashboardChartCircle className={styles.chart} label={'New Candidates'} value={dashGraphics.newCandidates.applications_in_week + dashGraphics.newCandidates.proposals_in_week} progress={50} suffixType={'percent'} color={'#FB6F9E'}/>
          <DashboardChartBars className={styles.chart} label={'Processed Candidates'} value={dashGraphics.processedCandidates.applications_processed_in_week + dashGraphics.processedCandidates.proposals_processed_in_week} color={'#67C8FF'}/>
          {/*<DashboardChartCircle className={styles.chart} label={'Hiring Stage Conversion'}  value={0} progress={50} suffixType={'percent'}/>*/}
          <DashboardChartCircle className={styles.chart} label={'Average move time by hiring stage'}  value={`${dashGraphics.averageMoveTime.average_move_time_in_week}`} progress={50} suffixType={'minutes'} color={'#2E77E5'}/>
          <DashboardChartLine className={styles.chart} label={'Jobs being processed'}  value={dashGraphics.jobsBeingProcessed.manager_vacancies_published_in_week + dashGraphics.jobsBeingProcessed.total_vacancies_published_in_week} />
          <DashboardChartBars className={styles.chart} label={'Turnover During Probationary'}  value={75}  color={'#FF385D'}/>
        </ChipList>
      </Card>}
      {/* <div className={styles.cards}>
        {managers.map((i) => <DashBoardManagerCard key={i.id} manager={i} view={CardViewType.Card} />)}
      </div> */}
      <CardsLayout type='cards'>
        {managers.map((i) => <DashBoardManagerCard key={i.id} manager={i} view={CardViewType.Card} />)}
      </CardsLayout>

    </div>
  )
}

export default LkDashboardTeamBoard
