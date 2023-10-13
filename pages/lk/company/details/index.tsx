import {getAuthServerSideProps} from '@/utils/auth'
import {ProfileType} from '@/data/enum/ProfileType'
import {LkCompanyPageLayout} from '@/components/for_pages/Lk/YourCompany/LkCompanyLayout'
import CompanyDetailsForm from '@/components/for_pages/Lk/YourCompany/DetailsForm'

interface Props {

}

const LkCompanyDetailsPage = (props: Props) => {
  return (
    <CompanyDetailsForm/>
  )
}

LkCompanyDetailsPage.getLayout = LkCompanyPageLayout
export default LkCompanyDetailsPage
export const getServerSideProps = getAuthServerSideProps(ProfileType.Employee)
