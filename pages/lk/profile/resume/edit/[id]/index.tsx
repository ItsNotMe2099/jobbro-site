import { getAuthServerSideProps } from '@/utils/auth'
import { ProfileType } from '@/data/enum/ProfileType'
import { ProfilePageLayout } from '@/components/for_pages/Profile/ProfileLayout'
import ResumeEditForm from '@/components/for_pages/Profile/Resume/Edit/Form'
import {CVOwnerWrapper, useCVOwnerContext} from 'context/cv_owner_state'
import {useRouter} from 'next/router'
import ContentLoader from '@/components/ui/ContentLoader'

interface Props {

}

const ProfileResumeEditPageInner = (props: Props) => {
  const cvOwnerContext = useCVOwnerContext()
  return (cvOwnerContext.loading ? <ContentLoader isOpen={true}/> :
    <ResumeEditForm />
  )
}


const ProfileResumeEditPage = (props: Props) => {
  const router = useRouter()
  return (<CVOwnerWrapper cvId={parseInt(router.query.id as string, 10)}>
    <ProfileResumeEditPageInner {...props} />
    </CVOwnerWrapper>
  )
}

ProfileResumeEditPage.getLayout = ProfilePageLayout
export default ProfileResumeEditPage
export const getServerSideProps = getAuthServerSideProps(ProfileType.Employee)
