import {getAuthServerSideProps} from '@/utils/auth'
import {ProfileType} from '@/data/enum/ProfileType'
import {LkCompanyPageLayout} from '@/components/for_pages/Lk/YourCompany/LkCompanyLayout'
import CompanyCareerForm from '@/components/for_pages/Lk/YourCompany/CareerForm'

interface Props {

}

const LkCompanyCareerPage = (props: Props) => {
  return (
    <CompanyCareerForm/>
  )
}

LkCompanyCareerPage.getLayout = LkCompanyPageLayout
export default LkCompanyCareerPage
export const getServerSideProps = getAuthServerSideProps(ProfileType.Hirer)
