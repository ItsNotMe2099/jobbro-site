import {getAuthServerSideProps} from '@/utils/auth'
import {ProfileType} from '@/data/enum/ProfileType'
import {LkDashboardPageLayout} from '@/components/for_pages/Lk/Dashboard/LkDashboardLayout'
import LkDashboardTeamBoard from '@/components/for_pages/Lk/Dashboard/TeamBoard'
import {useEffectOnce} from '@/components/hooks/useEffectOnce'
import Analytics from '@/utils/goals'
import {Goal} from '@/types/enums'
import {HirerRole} from '@/data/enum/HirerRole'

interface Props {

}

const LkDashboardTeamPage = (props: Props) => {
  useEffectOnce(() => {
    Analytics.goal(Goal.DashboardTeamView)
  })
  return (
    <LkDashboardTeamBoard/>
  )
}

LkDashboardTeamPage.getLayout = LkDashboardPageLayout
export default LkDashboardTeamPage
export const getServerSideProps = getAuthServerSideProps(ProfileType.Hirer, HirerRole.Admin)
