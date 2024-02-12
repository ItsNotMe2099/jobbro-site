import styles from './index.module.scss'
import { ReactElement } from 'react'
import PageTitle from '@/components/for_pages/Common/PageTitle'
import { nestLayout } from '@/utils/nestLayout'
import { LkPageHirerLayout } from '@/components/for_pages/Lk/components/LkLayout'
import Tabs from '@/components/ui/Tabs'
import { IOption } from '@/types/types'
import { Routes } from '@/types/routes'
import { useRouter } from 'next/router'
import { JobWidgetWrapper } from '@/context/job_widget_state'
import { ServiceCategoryListOwnerWrapper } from '@/context/service_category_list_state'
import { VacancyListOwnerWrapper } from '@/context/vacancy_owner_list_state'

enum TabKey {
  Settings = 'settings',
  Design = 'design',
  IncludedJobs = 'included-jobs',
}


interface Props {
  children: ReactElement
}
const JobConfigureWidgetPageLayoutInner = (props: Props) => {
  const router = useRouter()
  const options: IOption<TabKey>[] = [
    { label: 'Settings', value: TabKey.Settings, },
    { label: 'Design', value: TabKey.Design,},
    { label: 'Included Jobs', value: TabKey.IncludedJobs},
  ]

  const onClickTabHandler = (e: TabKey) => {
    router.replace({
      pathname: Routes.lkSettingsConfigWidget,
      query:  {
        page:e,
      },
    },undefined,{shallow: true})
  }
 
  return (
    <div className={styles.root}>
      <PageTitle title='Configure Widget' link={Routes.lkSettingsJobWidget} />
      <Tabs<TabKey> options={options} onClick={onClickTabHandler} value={router.query.page as TabKey||TabKey.Settings}/>
      {props.children}
    </div>
  )
}


export const JobConfigureWidgetPageLayoutWrapper = (props: Props) => {

  return (
    <JobConfigureWidgetPageLayoutInner>{props.children}</JobConfigureWidgetPageLayoutInner>
  )
}


export const JobWidgetSettingsPageLayout = nestLayout(LkPageHirerLayout, (page: ReactElement) => {
  return <JobConfigureWidgetPageLayoutWrapper>
        <JobWidgetWrapper>
      <ServiceCategoryListOwnerWrapper>
      <VacancyListOwnerWrapper>
        {page}
      </VacancyListOwnerWrapper>
      </ServiceCategoryListOwnerWrapper>
        </JobWidgetWrapper>
  </JobConfigureWidgetPageLayoutWrapper>
})
