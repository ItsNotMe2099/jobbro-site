import { getAuthServerSideProps } from '@/utils/auth'
import { ProfileType } from '@/data/enum/ProfileType'
import { ProfilePageLayout } from '@/components/for_pages/Profile/ProfileLayout'
import {CVOwnerWrapper, useCVOwnerContext} from 'context/cv_owner_state'
import CvForm from '@/components/for_pages/Cv/CvForm'
import {useRouter} from 'next/router'
import {DeepPartial} from '@/types/types'
import {ICV} from '@/data/interfaces/ICV'
import {Routes} from '@/types/routes'
import showToast from '@/utils/showToast'
import useTranslation from 'next-translate/useTranslation'
import {useState} from 'react'

interface Props {

}

const ProfileResumeEditPageInner = (props: Props) => {
  const cvOwnerContext = useCVOwnerContext()
  const { t } = useTranslation()
  const router = useRouter()
  const [preview, setPreview] = useState<boolean>(false)

  const handleSubmit = async (data: DeepPartial<ICV>) => {
    if (cvOwnerContext.cv) {
      await cvOwnerContext.update(data as DeepPartial<ICV>)
    } else {
      await cvOwnerContext.create(data as DeepPartial<ICV>)
      showToast({title: t('toast_cv_edited_title'), text: t('toast_cv_edited_desc')})
    }
    router.push(Routes.profileResume)
  }
  return <CvForm onSubmit={handleSubmit} loading={cvOwnerContext.editLoading} cancelLink={Routes.profileResume} preview={preview} onPreview={() => setPreview(!preview)} />
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
