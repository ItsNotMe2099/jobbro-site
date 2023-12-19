import styles from './index.module.scss'
import {Form, FormikProvider, useFormik} from 'formik'
import {useRef, useState} from 'react'
import {useAppContext} from '@/context/state'
import Button from '@/components/ui/Button'
import {JobInviteSidePanelArguments} from '@/types/side_panel_arguments'
import {Nullable, RequestError} from '@/types/types'
import SidePanelFooter from '@/components/layout/SidePanel/SidePanelFooter'
import SidePanelBody from '@/components/layout/SidePanel/SidePanelBody'
import SidePanelHeader from '@/components/layout/SidePanel/SidePanelHeader'
import SidePanelLayout from '@/components/layout/SidePanel/SidePanelLayout'
import JobWithSearchField from '@/components/fields/JobWithSearchField'
import AvatarCircular from '@/components/ui/AvatarCircular'
import UserUtils from '@/utils/UserUtils'
import VacancyUtils from '@/utils/VacancyUtils'
import {ICV} from '@/data/interfaces/ICV'
import {Goal, SnackbarType} from '@/types/enums'
import ProposalRepository from '@/data/repositories/ProposalRepository'
import Analytics from '@/utils/goals'

interface Props {

}

export interface IFormData {
  vacancyId: Nullable<number>
}
const CvCard = ({cv}: {cv: ICV}) => {

  return (<div className={styles.candidate}>
    <AvatarCircular size={32}  className={styles.avatar} initials={cv?.name?.charAt(0)} file={cv?.image ?? cv?.profile?.image ?? null} />

    <div className={styles.info}>
      <div className={styles.name}>
        {UserUtils.getName(cv)}
      </div>
      <div className={styles.salary}>
        {cv && VacancyUtils.formatSalary(cv)}
      </div>
    </div>
  </div>)
}
export default function JobInviteSidePanel(props: Props) {
  const appContext = useAppContext()
  const args = appContext.panelArguments as JobInviteSidePanelArguments
  const cv = args.cv
  const [loading, setLoading] = useState<boolean>(false)
  let ref = useRef<HTMLFormElement | null>(null)
  const handleSubmit = async (data: IFormData) => {
    setLoading(true)
    try {
      await ProposalRepository.create({vacancyId: data.vacancyId!, cvId: args.cv.id})
      Analytics.goal(Goal.JobInviteCv)
    } catch (err) {
      if (err instanceof RequestError) {
        appContext.showSnackbar(err.message, SnackbarType.error)
      }
    }

    appContext.hidePanel()
    setLoading(false)
  }

  const initialValues = {
    vacancyId:null
  }

  const formik = useFormik<IFormData>({
    initialValues,
    onSubmit: handleSubmit
  })

  console.log(formik)


  return (
    <SidePanelLayout>
      <FormikProvider value={formik}>
        <Form className={styles.form}>
          <SidePanelHeader title={'Inviting to job'}/>
          <SidePanelBody fixed>
            <div className={styles.fields}>
              {args.cv && <CvCard cv={args.cv}/>}
              <div className={styles.field}>
                <JobWithSearchField name={'vacancyId'}/>
              </div>
            </div>
          </SidePanelBody>
          <SidePanelFooter>
            <div className={styles.buttons}>
              <Button spinner={loading} type='submit' className={styles.apply} styleType='large' color='green'>
                Send Invite
              </Button>
              <Button onClick={appContext.hidePanel} className={styles.btn} styleType='large' color='white'>
                Cancel
              </Button>
            </div>
          </SidePanelFooter>
        </Form>
      </FormikProvider>
    </SidePanelLayout>

  )
}
