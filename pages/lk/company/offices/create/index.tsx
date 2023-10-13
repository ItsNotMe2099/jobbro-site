import {getAuthServerSideProps} from '@/utils/auth'
import {ProfileType} from '@/data/enum/ProfileType'
import {LkCompanyPageLayout} from '@/components/for_pages/Lk/YourCompany/LkCompanyLayout'
import CompanyOfficeForm from '@/components/for_pages/Lk/YourCompany/Offices/CompanyOfficeForm'
import {OfficeOwnerWrapper} from '@/context/office_owner_state'

interface Props {

}

const LkOfficeCreatePageInner = (props: Props) => {
  return (
    <CompanyOfficeForm/>
  )
}


const LkOfficeCreatePage = (props: Props) => {
  return <OfficeOwnerWrapper >
    <LkOfficeCreatePageInner {...props}/>
  </OfficeOwnerWrapper>
}

LkOfficeCreatePage.getLayout = LkCompanyPageLayout
export default LkOfficeCreatePage
export const getServerSideProps = getAuthServerSideProps(ProfileType.Employee)
