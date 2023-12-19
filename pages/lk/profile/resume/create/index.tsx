import { getAuthServerSideProps } from '@/utils/auth'
import { ProfileType } from '@/data/enum/ProfileType'
import { ProfilePageLayout } from '@/components/for_pages/Profile/ProfileLayout'
import {CVOwnerWrapper, useCVOwnerContext} from 'context/cv_owner_state'
import CvForm from '@/components/for_pages/Cv/CvForm'
import {useRouter} from 'next/router'
import {DeepPartial} from '@/types/types'
import {ICV} from '@/data/interfaces/ICV'
import {Routes} from '@/types/routes'

interface Props {

}

const ProfileResumeEditPageInner = (props: Props) => {
  const cvOwnerContext = useCVOwnerContext()
  const router = useRouter()
  const handleSubmit = async (data: DeepPartial<ICV>) => {
    if (cvOwnerContext.cv) {
      await cvOwnerContext.update(data as DeepPartial<ICV>)
    } else {
      await cvOwnerContext.create(data as DeepPartial<ICV>)
    }
    router.push(Routes.profileResume)
  }
  return <CvForm onSubmit={handleSubmit} loading={cvOwnerContext.editLoading} cancelLink={Routes.profileResume} />
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
