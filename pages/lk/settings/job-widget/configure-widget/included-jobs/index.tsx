import {getAuthServerSideProps} from '@/utils/auth'
import {ProfileType} from '@/data/enum/ProfileType'
import { JobWidgetSettingsPageLayout } from '@/components/for_pages/Lk/Settings/JobWidget/WidgetSettings/JobWidgetSettingsyLayout'

interface Props {

}

const ConfigWidgetIncludedJobsPage = (props: Props) => {

  return (
    <></>
  )
}

ConfigWidgetIncludedJobsPage.getLayout = JobWidgetSettingsPageLayout
export default ConfigWidgetIncludedJobsPage
export const getServerSideProps = getAuthServerSideProps(ProfileType.Employee)
