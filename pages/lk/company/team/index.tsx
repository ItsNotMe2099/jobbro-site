import {getAuthServerSideProps} from '@/utils/auth'
import {ProfileType} from '@/data/enum/ProfileType'
import {LkCompanyPageLayout} from '@/components/for_pages/Lk/YourCompany/LkCompanyLayout'
import {OfficeOwnerWrapper} from '@/context/office_owner_state'
import TeamForm from '@/components/for_pages/Lk/YourCompany/TeamForm'

interface Props {

}

const LkTeamPageInner = (props: Props) => {
  return (
    <TeamForm/>
  )
}


const LkTeamPage = (props: Props) => {
  return <OfficeOwnerWrapper >
    <LkTeamPageInner {...props}/>
  </OfficeOwnerWrapper>
}

LkTeamPage.getLayout = LkCompanyPageLayout
export default LkTeamPage
export const getServerSideProps = getAuthServerSideProps(ProfileType.Employee)
