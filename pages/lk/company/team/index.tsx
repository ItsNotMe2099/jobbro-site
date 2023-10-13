import styles from './index.module.scss'
import {getAuthServerSideProps} from '@/utils/auth'
import {ProfileType} from '@/data/enum/ProfileType'
import {LkCompanyPageLayout} from '@/components/for_pages/Lk/YourCompany/LkCompanyLayout'
import TeamForm from '@/components/for_pages/Lk/YourCompany/TeamForm'
import {ManagerListOwnerWrapper, useManagerListOwnerContext} from '@/context/manager_owner_list_state'
import ManagerCard from '@/components/for_pages/Lk/YourCompany/ManagerCard'
import Card from '@/components/for_pages/Common/Card'
import {useEffectOnce} from '@/components/hooks/useEffectOnce'
import ContentLoader from '@/components/ui/ContentLoader'

interface Props {

}

const LkTeamPageInner = (props: Props) => {
  const managerListContext = useManagerListOwnerContext()
  useEffectOnce(() => {
    managerListContext.reFetch()
  })
  return (
    <div className={styles.root}>
    <TeamForm/>
      <Card title='Team members'>
        <>
        {!managerListContext.isLoaded &&  managerListContext.isLoading ? <ContentLoader style={'block'} isOpen={true}/> : <></>}
        {managerListContext.isLoaded && <div className={styles.list}>
        {managerListContext.data.data.map((i) => <ManagerCard manager={i}/>)}
        </div>}
        </>
      </Card>
    </div>

  )
}


const LkTeamPage = (props: Props) => {
  return <ManagerListOwnerWrapper >
    <LkTeamPageInner {...props}/>
  </ManagerListOwnerWrapper>
}

LkTeamPage.getLayout = LkCompanyPageLayout
export default LkTeamPage
export const getServerSideProps = getAuthServerSideProps(ProfileType.Employee)
