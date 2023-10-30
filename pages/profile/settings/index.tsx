import { getAuthServerSideProps } from '@/utils/auth'
import { ProfileType } from '@/data/enum/ProfileType'
import { ProfilePageLayout } from '@/components/for_pages/Profile/ProfileLayout'

interface Props {

}

const ProfileSettingsPage = (props: Props) => {

  return (
    <></>
  )
}

ProfileSettingsPage.getLayout = ProfilePageLayout
export default ProfileSettingsPage
export const getServerSideProps = getAuthServerSideProps(ProfileType.Employee)
