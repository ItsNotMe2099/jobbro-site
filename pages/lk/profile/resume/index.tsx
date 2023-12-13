import { getAuthServerSideProps } from '@/utils/auth'
import { ProfileType } from '@/data/enum/ProfileType'
import { ProfilePageLayout } from '@/components/for_pages/Profile/ProfileLayout'
import styles from 'pages/lk/profile/resume/index.module.scss'
import {CvOwnerCard} from '@/components/for_pages/Common/CvOwnerCard'
import {CVListOwnerWrapper, useCVListOwnerContext} from '@/context/cv_owner_list_state'
import {useEffectOnce} from '@/components/hooks/useEffectOnce'

interface Props {

}

const ProfileResumePageInner = (props: Props) => {
  const cvListContext = useCVListOwnerContext()
  useEffectOnce(() => {
    cvListContext.reFetch()
  })

  return (
    <div className={styles.root}>
      {cvListContext.data.map((i, index) =>
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
