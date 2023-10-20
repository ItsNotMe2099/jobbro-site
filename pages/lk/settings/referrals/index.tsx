import {getAuthServerSideProps} from '@/utils/auth'
import {ProfileType} from '@/data/enum/ProfileType'
import { LkSettingsPageLayout } from '@/components/for_pages/Lk/Settings/LkSettingsyLayout'
import styles from './index.module.scss'

interface Props {

}

const LkSettingsRefferalsPage = (props: Props) => {
  
  return (
    <div className={styles.root}>

    </div>
  )
}

LkSettingsRefferalsPage.getLayout = LkSettingsPageLayout
export default LkSettingsRefferalsPage
export const getServerSideProps = getAuthServerSideProps(ProfileType.Employee)
