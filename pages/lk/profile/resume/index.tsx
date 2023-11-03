import { getAuthServerSideProps } from '@/utils/auth'
import { ProfileType } from '@/data/enum/ProfileType'
import { ProfilePageLayout } from '@/components/for_pages/Profile/ProfileLayout'
import styles from 'pages/lk/profile/resume/index.module.scss'
import { ResumeCard } from '@/components/for_pages/Profile/Resume/ResumeCard'

interface Props {

}

const ProfileResumePage = (props: Props) => {

  const resumes = [
    {
      id: 1,
      name: 'Product Designer', updated: '05.08.2023 at 6:20 PM',
      stats: { jobs: '1 313', impressions: '9', invites: '2', views: '0' },

    }
  ]

  return (
    <div className={styles.root}>
      {resumes.map((i, index) =>
        <ResumeCard item={i} key={index} />
      )}
    </div>
  )
}

ProfileResumePage.getLayout = ProfilePageLayout
export default ProfileResumePage
export const getServerSideProps = getAuthServerSideProps(ProfileType.Employee)
