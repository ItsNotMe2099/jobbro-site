import { getAuthServerSideProps } from '@/utils/auth'
import { ProfileType } from '@/data/enum/ProfileType'
import { ProfilePageLayout } from '@/components/for_pages/Profile/ProfileLayout'
import styles from 'pages/lk/profile/settings/index.module.scss'
import SettingsForm from '@/components/for_pages/Profile/Settings/Form'

interface Props {

}

const ProfileSettingsPage = (props: Props) => {

  return (
    <div className={styles.root}>
      <SettingsForm />
    </div>
  )
}

ProfileSettingsPage.getLayout = ProfilePageLayout
export default ProfileSettingsPage
export const getServerSideProps = getAuthServerSideProps(ProfileType.Employee)
