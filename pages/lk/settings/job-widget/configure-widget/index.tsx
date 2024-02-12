import {getAuthServerSideProps} from '@/utils/auth'
import {ProfileType} from '@/data/enum/ProfileType'
// import {Routes} from '@/types/routes'
import {HirerRole} from '@/data/enum/HirerRole'
import { JobWidgetSettingsPageLayout } from '@/components/for_pages/Lk/Settings/JobWidget/WidgetSettings/JobWidgetSettingsyLayout'
import WidgetSettingsForm from '@/components/for_pages/Lk/Settings/JobWidget/WidgetSettings/SettingsForm'
import ConfigWidgetDesignPage from './design'
import IncludedJobsForm from '@/components/for_pages/Lk/Settings/JobWidget/WidgetSettings/IncludedJobsForm'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useServiceCategoryListOwnerContext } from '@/context/service_category_list_state'
import { useVacancyListOwnerContext } from '@/context/vacancy_owner_list_state'
import { useEffectOnce } from '@/components/hooks/useEffectOnce'
import { useJobWidgetContext } from '@/context/job_widget_state'

type PageType = 'settings'|'design'|'included-jobs'
interface Query {
  page: PageType
}

interface Props extends Query {}


export const getServerSideProps = getAuthServerSideProps(ProfileType.Hirer, HirerRole.Admin,
  async (context) => {
    return {props: {page: context.query?.page||'settings'}}
  }
)

const ConfigWidgetSettingsPage = (props: Props) => {

  const [currentPage, setCurrentPage] = useState<PageType>(props.page)
  const serviceCategoryListContext = useServiceCategoryListOwnerContext()
  const jobWidgetContext = useJobWidgetContext()
  const vacancyListContext = useVacancyListOwnerContext()

  useEffectOnce(() => {
    vacancyListContext.reFetch()
  })

  const router = useRouter()

  useEffect(()=>{
    serviceCategoryListContext.reFetch()
    jobWidgetContext.getWidget()
  }, [])

  useEffect(()=>{
    setCurrentPage(router.query.page as PageType)
  }, [router.query])

  const getComponent = () => {
    switch(currentPage) {
      case 'design': return <ConfigWidgetDesignPage />
      case 'included-jobs': return <IncludedJobsForm />
      case 'settings': return <WidgetSettingsForm />
      default: return <WidgetSettingsForm />
    }
  }
  return (
    getComponent()
  )
}

ConfigWidgetSettingsPage.getLayout = JobWidgetSettingsPageLayout
export default ConfigWidgetSettingsPage


