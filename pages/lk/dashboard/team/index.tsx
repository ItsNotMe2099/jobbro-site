import { getAuthServerSideProps } from '@/utils/auth'
import { ProfileType } from '@/data/enum/ProfileType'
import { LkDashboardPageLayout } from '@/components/for_pages/Lk/Dashboard/LkDashboardLayout'
import LkDashboardTeamBoard from '@/components/for_pages/Lk/Dashboard/TeamBoard'

interface Props {

}

const LkDashboardTeamPage = (props: Props) => {
  return (
    <LkDashboardTeamBoard/>
  )
}

LkDashboardTeamPage.getLayout = LkDashboardPageLayout
export default LkDashboardTeamPage
export const getServerSideProps = getAuthServerSideProps(ProfileType.Hirer)
