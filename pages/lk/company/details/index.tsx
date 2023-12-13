import {getAuthServerSideProps} from '@/utils/auth'
import {ProfileType} from '@/data/enum/ProfileType'
import {LkCompanyPageLayout} from '@/components/for_pages/Lk/YourCompany/LkCompanyLayout'
import CompanyDetailsForm from '@/components/for_pages/Lk/YourCompany/DetailsForm'
import {useCompanyOwnerContext} from '@/context/company_owner_state'

interface Props {

}

const LkCompanyDetailsPage = (props: Props) => {
  const companyOwnerContext = useCompanyOwnerContext()
  return (
    companyOwnerContext.loading ? null : <CompanyDetailsForm/>
  )
}

LkCompanyDetailsPage.getLayout = LkCompanyPageLayout
export default LkCompanyDetailsPage
export const getServerSideProps = getAuthServerSideProps(ProfileType.Hirer)
