import {getAuthServerSideProps} from '@/utils/auth'
import {ProfileType} from '@/data/enum/ProfileType'
import {Routes} from '@/types/routes'


export default function ProfilePage() {

  return null
}
export const getServerSideProps = getAuthServerSideProps(ProfileType.Employee, async (context) => {
  return {
    redirect: {
      permanent: false,
      destination: Routes.profileResume,
    }
  }
})
