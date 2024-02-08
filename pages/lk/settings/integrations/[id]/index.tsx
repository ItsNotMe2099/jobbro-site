import {getAuthServerSideProps} from '@/utils/auth'
import {ProfileType} from '@/data/enum/ProfileType'
import {useRouter} from 'next/router'
import ContentLoader from '@/components/ui/ContentLoader'
import {IntegrationOwnerWrapper, useIntegrationOwnerContext} from '@/context/integration_owner_state'
import {LkSettingsPageLayout} from '@/components/for_pages/Lk/Settings/LkSettingsyLayout'
import IntegrationOfficeForm from '@/components/for_pages/Lk/Settings/Integrations/IntegrationForm'

interface Props {

}

const LkIntegrationEditPageInner = (props: Props) => {
  const integrationOwnerContext = useIntegrationOwnerContext()

  return (
    integrationOwnerContext.loading ? <ContentLoader style={'block'} isOpen={true}/> :  <IntegrationOfficeForm/>
  )
}


const LkIntegrationEditPage = (props: Props) => {
  const router = useRouter()
  return <IntegrationOwnerWrapper integrationId={parseInt(router.query.id as string, 10)}>
    <LkIntegrationEditPageInner {...props}/>
  </IntegrationOwnerWrapper>
}

LkIntegrationEditPage.getLayout = LkSettingsPageLayout
export default LkIntegrationEditPage
export const getServerSideProps = getAuthServerSideProps(ProfileType.Hirer)
