import { getAuthServerSideProps } from '@/utils/auth'
import { ProfileType } from '@/data/enum/ProfileType'
import { ProfilePageLayout } from '@/components/for_pages/Profile/ProfileLayout'
import ResumeEditForm from '@/components/for_pages/Profile/Resume/Edit/Form'
import {CVOwnerWrapper} from 'context/cv_owner_state'

interface Props {

}

const ProfileResumeEditPageInner = (props: Props) => {

  return (
    <ResumeEditForm />
  )
}


const ProfileResumeEditPage = (props: Props) => {
  return (<CVOwnerWrapper>
    <ProfileResumeEditPageInner {...props} />
    </CVOwnerWrapper>
  )
}

ProfileResumeEditPage.getLayout = ProfilePageLayout
export default ProfileResumeEditPage
export const getServerSideProps = getAuthServerSideProps(ProfileType.Employee)
