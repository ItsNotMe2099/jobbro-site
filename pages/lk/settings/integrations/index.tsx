import { getAuthServerSideProps } from '@/utils/auth'
import { ProfileType } from '@/data/enum/ProfileType'
import { LkSettingsPageLayout } from '@/components/for_pages/Lk/Settings/LkSettingsyLayout'
import styles from './index.module.scss'
import IntegrationCard from '@/components/for_pages/Lk/Settings/Integrations/Card'

interface Props {

}

const LkSettingsIntegrationsPage = (props: Props) => {

  const profiles = [
    { label: 'LinkedIn', img: '/profiles/linkedin.png', desc: 'LinkedIn is a social network that focuses on professional networking and career development.' },
    { label: 'Xing', img: '/profiles/xing.png', desc: 'Xing is the biggest german social network for business professionals.' },
  ]

  const platforms = [
    { label: 'Greenhouse', img: '/profiles/greenhouse.png', desc: 'Greenhouse is the leading hiring software for growing companies.' },
  ]

  return (
    <div className={styles.root}>
      <div className={styles.section}>
        <div className={styles.title}>
          External Profiles
        </div>
        <div className={styles.cards}>
          {profiles.map((i, index) =>
            <IntegrationCard profile className={styles.card} item={i} key={index} />
          )}
        </div>
      </div>
      <div className={styles.section}>
        <div className={styles.title}>
          ATS Platforms
        </div>
        <div className={styles.cards}>
          {platforms.map((i, index) =>
            <IntegrationCard className={styles.card} item={i} key={index} />
          )}
        </div>
      </div>
    </div>
  )
}

LkSettingsIntegrationsPage.getLayout = LkSettingsPageLayout
export default LkSettingsIntegrationsPage
export const getServerSideProps = getAuthServerSideProps(ProfileType.Hirer)
