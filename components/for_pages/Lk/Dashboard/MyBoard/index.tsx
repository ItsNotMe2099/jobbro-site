import styles from './index.module.scss'
import PersonalCard from '@/components/for_pages/Lk/Dashboard/LkDashboardLayout/PersonalCard'
import Card from '@/components/for_pages/Common/Card'
import { colors } from '@/styles/variables'
import CompletedSvg from '@/components/svg/CompletedSvg'
import SparksSmallSvg from '@/components/svg/SparksSmallSvg'
import CheckedSvg from '@/components/svg/CheckedSvg'
import StatisticCard from '@/components/for_pages/Lk/Dashboard/LkDashboardLayout/StatisitcCard'
import HotMarkers from '@/components/for_pages/Lk/Dashboard/LkDashboardLayout/HotMarkers'
import HiringStage from '@/components/for_pages/Lk/Dashboard/LkDashboardLayout/HiringStage'
import { useState} from 'react'
import {IDashboardGraphics, IDashboardStatistic} from '@/data/interfaces/IDashboardResponse'
import {Nullable} from '@/types/types'
import {useEffectOnce} from '@/components/hooks/useEffectOnce'
import DashboardRepository from '@/data/repositories/DashboardRepository'

interface Props {

}

const LkDashboardMyBoard = (props: Props) => {
  const [dashStatistic, setDashStatistic] = useState<Nullable<IDashboardStatistic>>(null)
  const [dashGraphics, setDashGraphics] = useState<Nullable<IDashboardGraphics>>(null)
  const init = async () => {
    await  Promise.all([
      fetchStatistic(),
      fetchGraphics()
    ])

  }
  const fetchStatistic = async () => {
    setDashStatistic(await DashboardRepository.fetchStatistic())
  }
  const fetchGraphics = async () => {
    setDashGraphics(await DashboardRepository.fetchGraphics())
  }
  useEffectOnce(() => {
    init()
  })

  const jobs = [
    { label: 'Senior Manager of Software Development and Engineering', candidates: '135', date: '25.07.2023', market: 'Market' },
    { label: 'Senior Manager of Software Development and Engineering', candidates: '135', date: '25.07.2023', market: 'Market' },
    { label: 'Senior Manager of Software Development and Engineering', candidates: '135', date: '25.07.2023', market: 'Market' },
    { label: 'Senior Manager of Software Development and Engineering', candidates: '135', date: '25.07.2023', market: 'Market' },
    { label: 'Senior Manager of Software Development and Engineering', candidates: '135', date: '25.07.2023', market: 'Market' },
    { label: 'Senior Manager of Software Development and Engineering', candidates: '135', date: '25.07.2023', market: 'Market' },
    { label: 'Senior Manager of Software Development and Engineering', candidates: '135', date: '25.07.2023', market: 'Market' },
  ]

  const conversion = [
    {label: 'Pre interview', percent: 100, total: 1216, secondPerc: 100},
    {label: 'Interview', percent: 60, total: 729, secondPerc: 60},
    {label: 'Tech Interview', percent: 50, total: 605, secondPerc: 83},
    {label: 'Awaiting Response', percent: 26, total: 315, secondPerc: 52},
    {label: 'Offer', percent: 16, total: 195, secondPerc: 62},
  ]

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
      <HiringStage data={conversion} />
      <HotMarkers data={jobs} />
    </div>
  )
}

export default LkDashboardMyBoard
