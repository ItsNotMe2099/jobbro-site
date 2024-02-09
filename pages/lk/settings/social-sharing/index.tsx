import { getAuthServerSideProps } from '@/utils/auth'
import { ProfileType } from '@/data/enum/ProfileType'
import { LkSettingsPageLayout } from '@/components/for_pages/Lk/Settings/LkSettingsyLayout'
import styles from './index.module.scss'
import SocialSharingForm from '@/components/for_pages/Lk/Settings/SocialSharing/Form'
import {HirerRole} from '@/data/enum/HirerRole'
import {useVacancyShareSettingsContext, VacancyShareSettingsWrapper} from '@/context/vacancy_sharing_settings_state'
import ContentLoader from '@/components/ui/ContentLoader'

interface Props {

}

const LkSettingsSocialSharingPageInner = (props: Props) => {
  const vacancyShareSettingsContext = useVacancyShareSettingsContext()

  return (
    <div className={styles.root}>
      {vacancyShareSettingsContext.loading ? <ContentLoader style={'page'} isOpen={true}/> : <SocialSharingForm  />}
    </div>
  )
}
function LkSettingsSocialSharingPage(props: Props) {
  return <VacancyShareSettingsWrapper>
    <LkSettingsSocialSharingPageInner/>
  </VacancyShareSettingsWrapper>
}
LkSettingsSocialSharingPage.getLayout = LkSettingsPageLayout
export default LkSettingsSocialSharingPage
export const getServerSideProps = getAuthServerSideProps(ProfileType.Hirer, HirerRole.Admin)
