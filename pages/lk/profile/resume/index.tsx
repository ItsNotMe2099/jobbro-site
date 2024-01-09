import { getAuthServerSideProps } from '@/utils/auth'
import { ProfileType } from '@/data/enum/ProfileType'
import { ProfilePageLayout } from '@/components/for_pages/Profile/ProfileLayout'
import styles from 'pages/lk/profile/resume/index.module.scss'
import {CvOwnerCard} from '@/components/for_pages/Common/CvOwnerCard'
import {CVListOwnerWrapper, useCVListOwnerContext} from '@/context/cv_owner_list_state'
import {useEffectOnce} from '@/components/hooks/useEffectOnce'
import NoData from '@/components/for_pages/Common/NoData'
import ContentLoader from '@/components/ui/ContentLoader'
import useTranslation from 'next-translate/useTranslation'
import {Routes} from '@/types/routes'

interface Props {

}

const ProfileResumePageInner = (props: Props) => {
  const cvListContext = useCVListOwnerContext()
  const { t } = useTranslation()
  useEffectOnce(() => {
    cvListContext.reFetch()
  })

  return (
    <div className={styles.root}>
      {cvListContext.isLoaded && cvListContext.data.length === 0 &&
        <NoData
          title={t('stub_my_applies_title')}
          text={t('stub_my_applies_desc')}
          btn={t('stub_my_resume_button')}
          btnHref={Routes.profileResumeCreate}
        />
      }
      {!cvListContext.isLoaded && cvListContext.isLoading &&
        <ContentLoader style={'page'} isOpen={true}/>}

      {cvListContext.isLoaded && cvListContext.data.length > 0 && cvListContext.data.map((i, index) =>
        <CvOwnerCard cv={i} key={i.id} />
      )}
    </div>
  )
}

const ProfileResumePage = () => {
  return (<CVListOwnerWrapper>
    <ProfileResumePageInner/>
  </CVListOwnerWrapper>)
}
ProfileResumePage.getLayout = ProfilePageLayout
export default  ProfileResumePage
export const getServerSideProps = getAuthServerSideProps(ProfileType.Employee)
