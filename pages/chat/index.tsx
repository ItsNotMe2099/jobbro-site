import {getAuthServerSideProps} from '@/utils/auth'
import ChatDialogList from '@/components/for_pages/Chat/ChatDialogList'
import LkPageHirerLayoutInner from '@/components/for_pages/Lk/components/LkLayout'
import {useAppContext} from '@/context/state'
import {ProfileType} from '@/data/enum/ProfileType'
import Layout from '@/components/layout/Layout'
import ContentLoader from '@/components/ui/ContentLoader'
import LayoutWithMyEvents from '@/components/layout/LayoutWithMyEvents'

interface Props {

}

const ChatPage = (props: Props) => {
  const appContext = useAppContext()
  if(!appContext.allLoaded){
    return <Layout>
      <ContentLoader isOpen={true} style={'page'}/>
    </Layout>
  }
  if(appContext.aboutMe?.profileType === ProfileType.Hirer){
    return (<LkPageHirerLayoutInner><ChatDialogList/></LkPageHirerLayoutInner>)

  }else{
    return (<LayoutWithMyEvents>
      <ChatDialogList/>
    </LayoutWithMyEvents>)
  }
}
export default ChatPage

export const getServerSideProps = getAuthServerSideProps()
