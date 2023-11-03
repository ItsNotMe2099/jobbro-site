import { getAuthServerSideProps } from '@/utils/auth'
import { ProfileType } from '@/data/enum/ProfileType'
import { JobWidgetSettingsPageLayout } from '@/components/for_pages/Lk/Settings/JobWidget/WidgetSettings/JobWidgetSettingsyLayout'
import IncludedJobsForm from '@/components/for_pages/Lk/Settings/JobWidget/WidgetSettings/IncludedJobsForm'

interface Props {

}

const ConfigWidgetIncludedJobsPage = (props: Props) => {

  return (
    <IncludedJobsForm />
  )
}

ConfigWidgetIncludedJobsPage.getLayout = JobWidgetSettingsPageLayout
export default ConfigWidgetIncludedJobsPage
export const getServerSideProps = getAuthServerSideProps(ProfileType.Hirer)
