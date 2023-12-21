import styles from './index.module.scss'
import { getAuthServerSideProps } from '@/utils/auth'
import { ProfileType } from '@/data/enum/ProfileType'
import PageTitle from '@/components/for_pages/Common/PageTitle'
import {Routes} from '@/types/routes'
import MyBoardHiringStages from '@/components/for_pages/Lk/Dashboard/MyBoardHiringStages'
import {LkPageHirerLayout} from '@/components/for_pages/Lk/components/LkLayout'
import {useEffectOnce} from '@/components/hooks/useEffectOnce'
import Analytics from '@/utils/goals'
import {Goal} from '@/types/enums'

interface Props {

}

const LkDashboardMyBoardPage = (props: Props) => {
  useEffectOnce(() => {
    Analytics.goal(Goal.DashboardHiringBoardsSeeAll)
  })
  return (<div className={styles.root}>
      <PageTitle title={'Hiring Stage Conversion'} link={Routes.lkDashboardMyBoard}/>
      <MyBoardHiringStages/>
    </div>
  )
}

LkDashboardMyBoardPage.getLayout = LkPageHirerLayout
export default LkDashboardMyBoardPage
export const getServerSideProps = getAuthServerSideProps(ProfileType.Hirer)
