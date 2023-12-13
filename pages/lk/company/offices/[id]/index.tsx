import {getAuthServerSideProps} from '@/utils/auth'
import {ProfileType} from '@/data/enum/ProfileType'
import {LkCompanyPageLayout} from '@/components/for_pages/Lk/YourCompany/LkCompanyLayout'
import CompanyOfficeForm from '@/components/for_pages/Lk/YourCompany/Offices/CompanyOfficeForm'
import {OfficeOwnerWrapper, useOfficeOwnerContext} from '@/context/office_owner_state'
import {useRouter} from 'next/router'
import ContentLoader from '@/components/ui/ContentLoader'

interface Props {

}

const LkOfficeEditPageInner = (props: Props) => {
  const officeOwnerContext = useOfficeOwnerContext()

  return (
    officeOwnerContext.loading ? <ContentLoader style={'block'} isOpen={true}/> :  <CompanyOfficeForm/>
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
export const getServerSideProps = getAuthServerSideProps(ProfileType.Hirer)
