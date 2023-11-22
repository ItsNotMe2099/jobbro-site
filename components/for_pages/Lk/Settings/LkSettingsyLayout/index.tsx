import styles from './index.module.scss'
import { ReactElement } from 'react'
import PageTitle from '@/components/for_pages/Common/PageTitle'
import { nestLayout } from '@/utils/nestLayout'
import { LkPageHirerLayout } from '@/components/for_pages/Lk/components/LkLayout'
import Tabs from '@/components/ui/Tabs'
import { IOption } from '@/types/types'
import { Routes } from '@/types/routes'

enum TabKey {
  Payments = 'payments',
  Integrations = 'integrations',
  Refferals = 'refferals',
  SocialSharing = 'social-sharing',
  JobWidget = 'job-widget'
}


interface Props {
  children: ReactElement
}
const LkSettingsPageLayoutInner = (props: Props) => {
  const options: IOption<TabKey>[] = [
  //  { label: 'Payments', value: TabKey.Payments, href: Routes.lkSettingsPayments },
  //  { label: 'Integrations', value: TabKey.Integrations, href: Routes.lkSettingsIntegrations },
  //  { label: 'Refferals', value: TabKey.Refferals, href: Routes.lkSettingsReferrals },
    { label: 'Social Sharing', value: TabKey.SocialSharing, href: Routes.lkSettingsSocialSharing },
    { label: 'Job Widget', value: TabKey.JobWidget, href: Routes.lkSettingsJobWidget },
  ]

  return (
    <div className={styles.root}>
      <PageTitle title='Settings' />
      <Tabs<TabKey> options={options} />
      {props.children}
    </div>
  )
}


const LkSettingsPageLayoutWrapper = (props: Props) => {

  return (
    <LkSettingsPageLayoutInner>{props.children}</LkSettingsPageLayoutInner>
  )
}


export const LkSettingsPageLayout = nestLayout(LkPageHirerLayout, (page: ReactElement) => <LkSettingsPageLayoutWrapper>{page}</LkSettingsPageLayoutWrapper>)
