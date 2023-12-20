import { getAuthServerSideProps } from '@/utils/auth'
import { ProfileType } from '@/data/enum/ProfileType'
import { LkDashboardPageLayout } from '@/components/for_pages/Lk/Dashboard/LkDashboardLayout'
import LkDashboardMyBoard from '@/components/for_pages/Lk/Dashboard/MyBoard'
import {useRouter} from 'next/router'

interface Props {

}

const LkDashboardManagerBoardPage = (props: Props) => {
  const router = useRouter()
  return (<LkDashboardMyBoard managerId={parseInt(router.query.id as string, 10)}/>
  )
}

LkDashboardManagerBoardPage.getLayout = LkDashboardPageLayout
export default LkDashboardManagerBoardPage
export const getServerSideProps = getAuthServerSideProps(ProfileType.Hirer)
