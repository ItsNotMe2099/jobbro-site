import {getAuthServerSideProps} from '@/utils/auth'
import {ProfileType} from '@/data/enum/ProfileType'
import { LkSettingsPageLayout } from '@/components/for_pages/Lk/Settings/LkSettingsyLayout'
import styles from './index.module.scss'

interface Props {

}

const LkSettingsSocialSharingPage = (props: Props) => {
  
  return (
    <div className={styles.root}>

    </div>
  )
}

LkSettingsSocialSharingPage.getLayout = LkSettingsPageLayout
export default LkSettingsSocialSharingPage
export const getServerSideProps = getAuthServerSideProps(ProfileType.Employee)
