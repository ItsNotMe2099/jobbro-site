import {getAuthServerSideProps} from '@/utils/auth'
import {ProfileType} from '@/data/enum/ProfileType'
import {LkSettingsPageLayout} from '@/components/for_pages/Lk/Settings/LkSettingsyLayout'
import IntegrationOfficeForm from '@/components/for_pages/Lk/Settings/Integrations/IntegrationForm'
import {IntegrationOwnerWrapper} from '@/context/integration_owner_state'

interface Props {

}

const LkIntegrationCreatePageInner = (props: Props) => {
  return (
    <IntegrationOfficeForm/>
  )
}


const LkIntegrationCreatePage = (props: Props) => {
  return <IntegrationOwnerWrapper >
    <LkIntegrationCreatePageInner {...props}/>
  </IntegrationOwnerWrapper>
}

LkIntegrationCreatePage.getLayout = LkSettingsPageLayout
export default LkIntegrationCreatePage
export const getServerSideProps = getAuthServerSideProps(ProfileType.Hirer)
