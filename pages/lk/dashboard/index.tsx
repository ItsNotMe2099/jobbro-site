import {getAuthServerSideProps} from '@/utils/auth'
import {ProfileType} from '@/data/enum/ProfileType'
import {LkPageLayout} from '@/components/for_pages/Lk/components/LkLayout'


const DashBoardPage = () => {
  return null
}
DashBoardPage.getLayout = LkPageLayout

export default  DashBoardPage
export const getServerSideProps = getAuthServerSideProps(ProfileType.Employee)
