import { getAuthServerSideProps } from '@/utils/auth'
import { ProfileType } from '@/data/enum/ProfileType'
import { LkDashboardPageLayout } from '@/components/for_pages/Lk/Dashboard/LkDashboardLayout'
import LkDashboardMyBoard from '@/components/for_pages/Lk/Dashboard/MyBoard'

interface Props {

}

const LkDashboardMyBoardPage = (props: Props) => {
  return (<LkDashboardMyBoard/>
  )
}

LkDashboardMyBoardPage.getLayout = LkDashboardPageLayout
export default LkDashboardMyBoardPage
export const getServerSideProps = getAuthServerSideProps(ProfileType.Hirer)
