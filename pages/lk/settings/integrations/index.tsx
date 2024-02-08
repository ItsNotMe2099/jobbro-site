import { getAuthServerSideProps } from '@/utils/auth'
import { ProfileType } from '@/data/enum/ProfileType'
import { LkSettingsPageLayout } from '@/components/for_pages/Lk/Settings/LkSettingsyLayout'
import styles from './index.module.scss'
import IntegrationCard from '@/components/for_pages/Lk/Settings/Integrations/Card'
import {HirerRole} from '@/data/enum/HirerRole'
import {IntegrationListOwnerWrapper, useIntegrationListOwnerContext} from '@/context/integration_owner_list_state'
import useTranslation from 'next-translate/useTranslation'
import Dictionary from '@/utils/Dictionary'
import {IntegrationPlatform} from '@/data/enum/IntegrationPlatform'
import {useEffectOnce} from '@/components/hooks/useEffectOnce'
import ContentLoader from '@/components/ui/ContentLoader'
import CardsLayout from '@/components/ui/CardsLayout'

interface Props {

}

const LkSettingsIntegrationsPageInner = (props: Props) => {
  const integrationOwnerListContext = useIntegrationListOwnerContext()
  const {t} = useTranslation()
  const platforms = Object.keys(Dictionary.getIntegrationPlatformNames()).map(i => i as IntegrationPlatform)
  useEffectOnce(() => {
    integrationOwnerListContext.reFetch()
  })
  console.log('Platforms', platforms)
  return (
    <div className={styles.root}>
      <div className={styles.section}>
        <div className={styles.title}>
          {t('integrations_title')}
        </div>
        {integrationOwnerListContext.isLoading && <ContentLoader isOpen={true} style={'page'}/>}
        {integrationOwnerListContext.isLoaded &&    <CardsLayout type={'cards'}>

        {platforms.map(platform => <IntegrationCard platform={platform}  integration={integrationOwnerListContext.data.find(i => i.platform === platform)} key={platform} />)}
        </CardsLayout>}
      </div>
    </div>
  )
}

const  LkSettingsIntegrationsPage = () => {
  return <IntegrationListOwnerWrapper>
    <LkSettingsIntegrationsPageInner/>
  </IntegrationListOwnerWrapper>
}
LkSettingsIntegrationsPage.getLayout = LkSettingsPageLayout
export default LkSettingsIntegrationsPage
export const getServerSideProps = getAuthServerSideProps(ProfileType.Hirer, HirerRole.Admin)
