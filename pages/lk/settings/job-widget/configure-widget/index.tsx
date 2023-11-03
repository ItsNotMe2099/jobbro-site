import {getAuthServerSideProps} from '@/utils/auth'
import {ProfileType} from '@/data/enum/ProfileType'
import {Routes} from '@/types/routes'


export default function ConfigWidgetPage() {

  return null
}
export const getServerSideProps = getAuthServerSideProps(ProfileType.Hirer, async (context) => {
  return {
    redirect: {
      permanent: false,
      destination: Routes.lkSettingsConfigWidgetSettings,
    }
  }
})
