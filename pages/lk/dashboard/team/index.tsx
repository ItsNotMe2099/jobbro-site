import { getAuthServerSideProps } from '@/utils/auth'
import { ProfileType } from '@/data/enum/ProfileType'
import styles from './index.module.scss'
import { LkDashboardPageLayout } from '@/components/for_pages/Lk/Dashboard/LkDashboardLayout'

interface Props {

}

const LkDashboardTeamPage = (props: Props) => {


  return (
    <div className={styles.root}>
      
    </div>
  )
}

LkDashboardTeamPage.getLayout = LkDashboardPageLayout
export default LkDashboardTeamPage
export const getServerSideProps = getAuthServerSideProps(ProfileType.Hirer)
