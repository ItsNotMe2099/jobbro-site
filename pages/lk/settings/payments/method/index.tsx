import { getAuthServerSideProps } from '@/utils/auth'
import { ProfileType } from '@/data/enum/ProfileType'
import styles from './index.module.scss'
import { useSettingsContext } from '@/context/settings_state'
import PaymentMethodForm from '@/components/for_pages/Lk/Settings/Payments/Form'
import PageTitle from '@/components/for_pages/Common/PageTitle'
import { Routes } from '@/types/routes'
import { LkPageLayout } from '@/components/for_pages/Lk/components/LkLayout'

interface Props {

}

const LkSettingsPaymentsMethodPage = (props: Props) => {

  const settingsContext = useSettingsContext()

  return (
    <div className={styles.root}>
      <PageTitle title={'Adding Payment method'} link={Routes.lkSettings} />
      <PaymentMethodForm />
    </div>
  )
}

LkSettingsPaymentsMethodPage.getLayout = LkPageLayout
export default LkSettingsPaymentsMethodPage
export const getServerSideProps = getAuthServerSideProps(ProfileType.Hirer)
