import { getAuthServerSideProps } from '@/utils/auth'
import { ProfileType } from '@/data/enum/ProfileType'
import WidgetSettingsForm from '@/components/for_pages/Lk/Settings/JobWidget/WidgetSettings/SettingsForm'
import {HirerRole} from '@/data/enum/HirerRole'

interface Props {

}

const ConfigWidgetSettingsPage = (props: Props) => {

  return (
    <WidgetSettingsForm />
  )
}

export default ConfigWidgetSettingsPage
export const getServerSideProps = getAuthServerSideProps(ProfileType.Hirer, HirerRole.Admin)
