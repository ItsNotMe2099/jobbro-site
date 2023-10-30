import { getAuthServerSideProps } from '@/utils/auth'
import { ProfileType } from '@/data/enum/ProfileType'
import { ProfilePageLayout } from '@/components/for_pages/Profile/ProfileLayout'

interface Props {

}

const ProfileResumePage = (props: Props) => {

  return (
    <></>
  )
}

ProfileResumePage.getLayout = ProfilePageLayout
export default ProfileResumePage
export const getServerSideProps = getAuthServerSideProps(ProfileType.Employee)
