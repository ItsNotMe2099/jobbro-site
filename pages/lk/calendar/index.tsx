import {getAuthServerSideProps} from '@/utils/auth'
import {LkPageHirerLayout} from '@/components/for_pages/Lk/components/LkLayout'
import CreateMeeting from '@/components/for_pages/Calendar/EventOwnerForm'


const DashBoardPage = () => {
  return <CreateMeeting/>
}
DashBoardPage.getLayout = LkPageHirerLayout

export default  DashBoardPage
export const getServerSideProps = getAuthServerSideProps()
