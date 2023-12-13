import { getAuthServerSideProps } from '@/utils/auth'
import { ProfileType } from '@/data/enum/ProfileType'
import styles from './index.module.scss'
import { LkDashboardPageLayout } from '@/components/for_pages/Lk/Dashboard/LkDashboardLayout'
import PersonalCard from '@/components/for_pages/Lk/Dashboard/LkDashboardLayout/PersonalCard'
import Card from '@/components/for_pages/Common/Card'
import { colors } from '@/styles/variables'
import CompletedSvg from '@/components/svg/CompletedSvg'
import SparksSmallSvg from '@/components/svg/SparksSmallSvg'
import CheckedSvg from '@/components/svg/CheckedSvg'
import StatisticCard from '@/components/for_pages/Lk/Dashboard/LkDashboardLayout/StatisitcCard'
import HotMarkers from '@/components/for_pages/Lk/Dashboard/LkDashboardLayout/HotMarkers'
import HiringStage from '@/components/for_pages/Lk/Dashboard/LkDashboardLayout/HiringStage'

interface Props {

}

const LkDashboardMyBoardPage = (props: Props) => {

  const data = { firstName: 'Lynn', lastName: 'Wolfsmith-Granderfa', position: 'Lead HR', location: 'Indonesia' }

  const statistic = [
    { val: '120', up: true },
    { val: '95', up: true },
    { val: '2', up: false },
    { val: '32', up: false },
    { val: '95', up: true },
  ]

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
          <PersonalCard data={data} />
          <Card className={styles.stats}>
            <div className={styles.item}>
              <div className={styles.leftSide}>
                <SparksSmallSvg color={colors.textSecondary} />
                <div className={styles.label}>Saved time with AI</div>
              </div>
              <div className={styles.right}>
                86 hour
              </div>
            </div>
            <div className={styles.item}>
              <div className={styles.leftSide}>
                <CompletedSvg color={colors.textSecondary} />
                <div className={styles.label}>Сompleted jobs</div>
              </div>
              <div className={styles.right}>
                25
              </div>
            </div>
            <div className={styles.item}>
              <div className={styles.leftSide}>
                <CheckedSvg color={colors.textSecondary} />
                <div className={styles.label}>Checked CV per day</div>
              </div>
              <div className={styles.right}>
                1 500
              </div>
            </div>
          </Card>
        </div>
        <StatisticCard data={statistic} />
      </div>
      <HiringStage data={conversion} />
      <HotMarkers data={jobs} />
    </div>
  )
}

LkDashboardMyBoardPage.getLayout = LkDashboardPageLayout
export default LkDashboardMyBoardPage
export const getServerSideProps = getAuthServerSideProps(ProfileType.Hirer)
