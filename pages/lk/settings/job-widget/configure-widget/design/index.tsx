import { getAuthServerSideProps } from '@/utils/auth'
import { ProfileType } from '@/data/enum/ProfileType'
import { JobWidgetSettingsPageLayout } from '@/components/for_pages/Lk/Settings/JobWidget/WidgetSettings/JobWidgetSettingsyLayout'
import WidgetDesignForm from '@/components/for_pages/Lk/Settings/JobWidget/WidgetSettings/DesignForm'
import {HirerRole} from '@/data/enum/HirerRole'

interface Props {

}

const ConfigWidgetDesignPage = (props: Props) => {

  return (
    <WidgetDesignForm />
  )
}

ConfigWidgetDesignPage.getLayout = JobWidgetSettingsPageLayout
export default ConfigWidgetDesignPage
export const getServerSideProps = getAuthServerSideProps(ProfileType.Hirer, HirerRole.Admin)
