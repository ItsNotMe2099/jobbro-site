import { getAuthServerSideProps } from '@/utils/auth'
import { ProfileType } from '@/data/enum/ProfileType'
import IncludedJobsForm from '@/components/for_pages/Lk/Settings/JobWidget/WidgetSettings/IncludedJobsForm'
import {HirerRole} from '@/data/enum/HirerRole'

interface Props {

}

const ConfigWidgetIncludedJobsPage = (props: Props) => {

  return (
    <IncludedJobsForm />
  )
}

export default ConfigWidgetIncludedJobsPage
export const getServerSideProps = getAuthServerSideProps(ProfileType.Hirer, HirerRole.Admin)
