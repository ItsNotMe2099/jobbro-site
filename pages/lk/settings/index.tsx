import {getAuthServerSideProps} from '@/utils/auth'
import {ProfileType} from '@/data/enum/ProfileType'
import {Routes} from '@/types/routes'
import {HirerRole} from '@/data/enum/HirerRole'


export default function SettingsPage() {

  return null
}
export const getServerSideProps = getAuthServerSideProps(ProfileType.Hirer, HirerRole.Admin, async (context) => {
  return {
    redirect: {
      permanent: false,
      destination: Routes.lkSettingsSocialSharing,
    }
  }
})
