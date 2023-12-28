import { getAuthServerSideProps } from '@/utils/auth'
import { ProfileType } from '@/data/enum/ProfileType'
import { LkDashboardPageLayout } from '@/components/for_pages/Lk/Dashboard/LkDashboardLayout'
import LkDashboardMyBoard from '@/components/for_pages/Lk/Dashboard/MyBoard'
import {useRouter} from 'next/router'
import {HirerRole} from '@/data/enum/HirerRole'
import {useEffectOnce} from '@/components/hooks/useEffectOnce'
import Analytics from '@/utils/goals'
import {Goal} from '@/types/enums'

interface Props {

}

const LkDashboardManagerBoardPage = (props: Props) => {
  const router = useRouter()
  useEffectOnce(() => {
    Analytics.goal(Goal.DashboardManagerView)
  })
  return (<LkDashboardMyBoard managerId={parseInt(router.query.id as string, 10)}/>
  )
}

LkDashboardManagerBoardPage.getLayout = LkDashboardPageLayout
export default LkDashboardManagerBoardPage
export const getServerSideProps = getAuthServerSideProps(ProfileType.Hirer, HirerRole.Admin)
