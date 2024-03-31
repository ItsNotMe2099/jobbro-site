import { getAuthServerSideProps } from '@/utils/auth'
import { ProfileType } from '@/data/enum/ProfileType'
import { LkSettingsPageLayout } from '@/components/for_pages/Lk/Settings/LkSettingsyLayout'
import styles from './index.module.scss'
import { HirerRole } from '@/data/enum/HirerRole'
import { PricingPlanSettingsWrapper } from '@/context/pricing_plan_settings_state'
import { PlanType } from '@/data/enum/PlanType'
import PricingPlanCard from '@/components/for_pages/Lk/Settings/PricingPlans/Card'
import PricingPlanTable from '@/components/for_pages/Lk/Settings/PricingPlans/Table'

interface Props {

}

const LkSettingsPricingPlansPageInner = (props: Props) => {

  const items = [
    { type: PlanType.Free, price: '0', jobsPosted: '2 Jobs posted', users: '3 Users', accounts: '100 accounts', monthly: '' },
    { type: PlanType.Professional, price: '99', jobsPosted: '25 Jobs posted', users: '5 Users', accounts: '10 000 accounts', monthly: '$100' },
    { type: PlanType.Enterprise, price: '119', jobsPosted: 'Unlimited', users: 'Unlimited', accounts: 'Unlimited accounts', monthly: '$150' },
  ]


  return (
    <div className={styles.root}>
      <div className={styles.items}>
        {items.map((i, index) =>
          <PricingPlanCard plan={i} key={index} best={i.type === PlanType.Professional} />
        )}
      </div>
      <PricingPlanTable />
    </div>
  )
}
function LkSettingsPricingPlansPage(props: Props) {
  return <PricingPlanSettingsWrapper>
    <LkSettingsPricingPlansPageInner />
  </PricingPlanSettingsWrapper>
}
LkSettingsPricingPlansPage.getLayout = LkSettingsPageLayout
export default LkSettingsPricingPlansPage
export const getServerSideProps = getAuthServerSideProps(ProfileType.Hirer, HirerRole.Admin)
