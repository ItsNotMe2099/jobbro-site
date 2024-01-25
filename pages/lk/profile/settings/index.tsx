import { getAuthServerSideProps } from '@/utils/auth'
import { ProfileType } from '@/data/enum/ProfileType'
import { ProfilePageLayout } from '@/components/for_pages/Profile/ProfileLayout'
import styles from 'pages/lk/profile/settings/index.module.scss'
import SettingsForm from '@/components/for_pages/Profile/Settings/Form'
import {useAppContext} from '@/context/state'
import ContentLoader from '@/components/ui/ContentLoader'

interface Props {

}

const ProfileSettingsPage = (props: Props) => {
  const appContext = useAppContext()
  return (
    <div className={styles.root}>
      {appContext.allLoaded ? <SettingsForm /> : <ContentLoader style={'block'} isOpen={true}/>}
    </div>
  )
}

ProfileSettingsPage.getLayout = ProfilePageLayout
export default ProfileSettingsPage
export const getServerSideProps = getAuthServerSideProps(ProfileType.Employee)
