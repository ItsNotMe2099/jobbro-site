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

interface Props {

}

const LkDashboardMyBoardPage = (props: Props) => {

  const data = { firstName: 'Lynn', lastName: 'Wolfsmith-Granderfa', position: 'Lead HR', location: 'Indonesia' }

  const statistic = [
    {val: '120', up: true},
    {val: '95', up: true},
    {val: '2', up: false},
    {val: '32', up: false},
    {val: '95', up: true},
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
    </div>
  )
}

LkDashboardMyBoardPage.getLayout = LkDashboardPageLayout
export default LkDashboardMyBoardPage
export const getServerSideProps = getAuthServerSideProps(ProfileType.Hirer)
