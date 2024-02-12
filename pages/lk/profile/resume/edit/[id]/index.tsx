import { getAuthServerSideProps } from '@/utils/auth'
import { ProfileType } from '@/data/enum/ProfileType'
import { ProfilePageLayout } from '@/components/for_pages/Profile/ProfileLayout'
import {CVOwnerWrapper, useCVOwnerContext} from 'context/cv_owner_state'
import {useRouter} from 'next/router'
import ContentLoader from '@/components/ui/ContentLoader'
import {DeepPartial} from '@/types/types'
import {ICV} from '@/data/interfaces/ICV'
import {Routes} from '@/types/routes'
import CvForm from '@/components/for_pages/Cv/CvForm'
import {useState} from 'react'

interface Props {

}

const ProfileResumeEditPageInner = (props: Props) => {
  const cvOwnerContext = useCVOwnerContext()
  const router = useRouter()
  const [preview, setPreview] = useState<boolean>(false)

  const handleSubmit = async (data: DeepPartial<ICV>) => {
    if (cvOwnerContext.cv) {
      await cvOwnerContext.update(data as DeepPartial<ICV>)
    } else {
      await cvOwnerContext.create(data as DeepPartial<ICV>)
    }
    router.push(Routes.profileResume)
  }
  return (cvOwnerContext.loading ? <ContentLoader isOpen={true}/> :
    <CvForm onSubmit={handleSubmit} loading={cvOwnerContext.editLoading} cv={cvOwnerContext.cv} cancelLink={Routes.profileResume} preview={preview} onPreview={() => setPreview(!preview)} />
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
