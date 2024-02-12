import {getAuthServerSideProps} from '@/utils/auth'
import {LkPageHirerLayout} from '@/components/for_pages/Lk/components/LkLayout'
import CreateMeeting from '@/components/for_pages/Calendar/EventOwnerForm'
import { useRouter } from 'next/navigation'
import { useAppContext } from '@/context/state'


const DashBoardPage = () => {
  const router = useRouter()
  const appContext = useAppContext()
  const {isTabletWidth} = appContext.size
  return <CreateMeeting onBack={isTabletWidth?router.back: undefined}/>
}
DashBoardPage.getLayout = LkPageHirerLayout

export default  DashBoardPage
export const getServerSideProps = getAuthServerSideProps()
