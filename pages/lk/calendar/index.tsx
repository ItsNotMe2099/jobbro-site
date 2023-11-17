import {getAuthServerSideProps} from '@/utils/auth'
import {LkPageLayout} from '@/components/for_pages/Lk/components/LkLayout'
import CreateMeeting from '@/components/for_pages/Calendar/CreateMeeting'


const DashBoardPage = () => {
  return <CreateMeeting/>
}
DashBoardPage.getLayout = LkPageLayout

export default  DashBoardPage
export const getServerSideProps = getAuthServerSideProps()
