import {getAuthServerSideProps} from '@/utils/auth'
import {ProfileType} from '@/data/enum/ProfileType'
import {Routes} from '@/types/routes'


export default function DashboardPage() {

  return null
}
export const getServerSideProps = getAuthServerSideProps(ProfileType.Hirer, async (context) => {
  return {
    notFound: true
  }
  return {
    redirect: {
      permanent: false,
      destination: Routes.lkDashboardMyBoard,
    }
  }
})
