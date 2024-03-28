import styles from './index.module.scss'
import { ReactElement } from 'react'
import PageTitle from '@/components/for_pages/Common/PageTitle'
import { nestLayout } from '@/utils/nestLayout'
import { LkPageHirerLayout } from '@/components/for_pages/Lk/components/LkLayout'
import Tabs from '@/components/ui/Tabs'
import { IOption } from '@/types/types'
import { Routes } from '@/types/routes'
import useTranslation from 'next-translate/useTranslation'
import { JobWidgetWrapper } from '@/context/job_widget_state'

enum TabKey {
  Payments = 'payments',
  Integrations = 'integrations',
  Refferals = 'refferals',
  SocialSharing = 'social-sharing',
  JobWidget = 'job-widget',
  PricingPlans = 'pricing-plans'
}


interface Props {
  children: ReactElement
}
const LkSettingsPageLayoutInner = (props: Props) => {
  const { t } = useTranslation()
  const options: IOption<TabKey>[] = [
    //  { label: 'Payments', value: TabKey.Payments, href: Routes.lkSettingsPayments },
    { label: 'Integrations', value: TabKey.Integrations, href: Routes.lkSettingsIntegrations },
    //  { label: 'Refferals', value: TabKey.Refferals, href: Routes.lkSettingsReferrals },
    { label: t('settings_social_sharing'), value: TabKey.SocialSharing, href: Routes.lkSettingsSocialSharing },
    { label: t('settings_job_widget'), value: TabKey.JobWidget, href: Routes.lkSettingsJobWidget },
    { label: t('settings_pricing_plans'), value: TabKey.PricingPlans, href: Routes.lkSettingsPricingPlans },
  ]

  return (
    <div className={styles.root}>
      <PageTitle title={t('settings_title')} />
      <Tabs<TabKey> options={options} />
      {props.children}
    </div>
  )
}


const LkSettingsPageLayoutWrapper = (props: Props) => {

  return (
    <JobWidgetWrapper>
      <LkSettingsPageLayoutInner>{props.children}</LkSettingsPageLayoutInner>
    </JobWidgetWrapper>
  )
}


export const LkSettingsPageLayout = nestLayout(LkPageHirerLayout, (page: ReactElement) => <LkSettingsPageLayoutWrapper>{page}</LkSettingsPageLayoutWrapper>)
