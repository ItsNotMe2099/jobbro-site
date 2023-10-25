import styles from './index.module.scss'
import { ReactElement } from 'react'
import PageTitle from '@/components/for_pages/Common/PageTitle'
import { nestLayout } from '@/utils/nestLayout'
import { LkPageLayout } from '@/components/for_pages/Lk/components/LkLayout'
import Tabs from '@/components/ui/Tabs'
import { IOption } from '@/types/types'
import { Routes } from '@/types/routes'

enum TabKey {
  Settings = 'settings',
  Design = 'design',
  IncludedJobs = 'included-jobs',
}


interface Props {
  children: ReactElement
}
const JobConfigureWidgetPageLayoutInner = (props: Props) => {
  const options: IOption<TabKey>[] = [
    { label: 'Settings', value: TabKey.Settings, href: Routes.lkSettingsConfigWidgetSettings },
    { label: 'Design', value: TabKey.Design, href: Routes.lkSettingsConfigWidgetDesign },
    { label: 'Included Jobs', value: TabKey.IncludedJobs, href: Routes.lkSettingsConfigWidgetIncludedJobs },
  ]

  return (
    <div className={styles.root}>
      <PageTitle title='Configure Widget' link={Routes.lkSettingsJobWidget} />
      <Tabs<TabKey> options={options} />
      {props.children}
    </div>
  )
}


const JobConfigureWidgetPageLayoutWrapper = (props: Props) => {

  return (
    <JobConfigureWidgetPageLayoutInner>{props.children}</JobConfigureWidgetPageLayoutInner>
  )
}


export const JobWidgetSettingsPageLayout = nestLayout(LkPageLayout, (page: ReactElement) => <JobConfigureWidgetPageLayoutWrapper>{page}</JobConfigureWidgetPageLayoutWrapper>)
