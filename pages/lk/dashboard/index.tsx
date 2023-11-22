import {getAuthServerSideProps} from '@/utils/auth'
import {ProfileType} from '@/data/enum/ProfileType'
import {LkPageHirerLayout} from '@/components/for_pages/Lk/components/LkLayout'


const DashBoardPage = () => {
  return null
}
DashBoardPage.getLayout = LkPageHirerLayout

export default  DashBoardPage
export const getServerSideProps = getAuthServerSideProps(ProfileType.Hirer)
