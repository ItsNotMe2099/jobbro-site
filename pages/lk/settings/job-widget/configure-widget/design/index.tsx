import {getAuthServerSideProps} from '@/utils/auth'
import {ProfileType} from '@/data/enum/ProfileType'
import { JobWidgetSettingsPageLayout } from '@/components/for_pages/Lk/Settings/JobWidget/WidgetSettings/JobWidgetSettingsyLayout'

interface Props {

}

const ConfigWidgetDesignPage = (props: Props) => {

  return (
    <></>
  )
}

ConfigWidgetDesignPage.getLayout = JobWidgetSettingsPageLayout
export default ConfigWidgetDesignPage
export const getServerSideProps = getAuthServerSideProps(ProfileType.Employee)
