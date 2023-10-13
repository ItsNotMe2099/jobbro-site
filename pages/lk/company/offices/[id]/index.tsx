import {getAuthServerSideProps} from '@/utils/auth'
import {ProfileType} from '@/data/enum/ProfileType'
import {LkCompanyPageLayout} from '@/components/for_pages/Lk/YourCompany/LkCompanyLayout'
import CompanyOfficeForm from '@/components/for_pages/Lk/YourCompany/Offices/CompanyOfficeForm'
import {OfficeOwnerWrapper} from '@/context/office_owner_state'
import {useRouter} from 'next/router'

interface Props {

}

const LkOfficeEditPageInner = (props: Props) => {
  return (
    <CompanyOfficeForm/>
  )
}


const LkOfficeEditPage = (props: Props) => {
  const router = useRouter()
  return <OfficeOwnerWrapper officeId={parseInt(router.query.id as string, 10)}>
    <LkOfficeEditPageInner {...props}/>
  </OfficeOwnerWrapper>
}

LkOfficeEditPage.getLayout = LkCompanyPageLayout
export default LkOfficeEditPage
export const getServerSideProps = getAuthServerSideProps(ProfileType.Employee)
