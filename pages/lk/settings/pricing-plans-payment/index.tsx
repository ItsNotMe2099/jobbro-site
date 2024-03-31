import { getAuthServerSideProps } from '@/utils/auth'
import { ProfileType } from '@/data/enum/ProfileType'
import { LkSettingsPageLayout } from '@/components/for_pages/Lk/Settings/LkSettingsyLayout'
import styles from './index.module.scss'
import { HirerRole } from '@/data/enum/HirerRole'
import { PricingPlanSettingsWrapper, usePricingPlanSettingsContext } from '@/context/pricing_plan_settings_state'
import PaymentForm from '@/components/for_pages/Lk/Settings/PricingPlans/PaymentForm'

interface Props {

}

const LkSettingsPricingPlansPaymentPageInner = (props: Props) => {

  const pricingPlanSettingsContext = usePricingPlanSettingsContext()

  console.log(pricingPlanSettingsContext.plan)

  return (
    <div className={styles.root}>
      <div className={styles.title}>Payment</div>
      <PaymentForm />
    </div>
  )

}
function LkSettingsPricingPlansPaymentPage(props: Props) {
  return <PricingPlanSettingsWrapper>
    <LkSettingsPricingPlansPaymentPageInner />
  </PricingPlanSettingsWrapper>
}
LkSettingsPricingPlansPaymentPage.getLayout = LkSettingsPageLayout
export default LkSettingsPricingPlansPaymentPage
export const getServerSideProps = getAuthServerSideProps(ProfileType.Hirer, HirerRole.Admin)
