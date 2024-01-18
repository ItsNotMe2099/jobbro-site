import styles from './index.module.scss'
import {Form, FormikProvider, useFormik} from 'formik'
import {useRef, useState} from 'react'
import {useAppContext} from '@/context/state'
import Button from '@/components/ui/Button'
import {JobInviteSidePanelArguments} from '@/types/side_panel_arguments'
import { RequestError} from '@/types/types'
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
import Validator from '@/utils/validator'
import useTranslation from 'next-translate/useTranslation'
import showToast from '@/utils/showToast'
import {IVacancy} from '@/data/interfaces/IVacancy'

interface Props {

}

export interface IFormData {
  vacancies: IVacancy[]
}
const CvCard = ({cv}: {cv: ICV}) => {

  return (<div className={styles.candidate}>
    <AvatarCircular size={48}  className={styles.avatar} initials={cv?.name?.charAt(0)} file={cv?.image ?? cv?.profile?.image ?? null} />

    <div className={styles.info}>
      <div className={styles.name}>
        {UserUtils.getName(cv)}
      </div>
      {cv && (cv.salaryMin !== '0'|| cv.salaryMax !== '0') && <div className={styles.salary}>
        {VacancyUtils.formatSalary(cv)}
      </div>}
    </div>
  </div>)
}
export default function JobInviteSidePanel(props: Props) {
  const appContext = useAppContext()
  const { t } = useTranslation()
  const args = appContext.panelArguments as JobInviteSidePanelArguments
  const cv = args.cv
  const [loading, setLoading] = useState<boolean>(false)
  let ref = useRef<HTMLFormElement | null>(null)
  const handleSubmit = async (data: IFormData) => {
    setLoading(true)
    try {
        await ProposalRepository.createMulti({
          vacanciesIds: data.vacancies.map(i => i.id),
          ...(args.appliedVacancyId ? {appliedVacancyId: args.appliedVacancyId} : {}),
          ...(!args.allCandidateBase && !args.allAppliesToVacancy && args.cv ? {cvIds: [args.cv.id]} : {}),
          ...(!args.allCandidateBase && !args.allAppliesToVacancy && args.cvs ? {cvIds: args.cvs.map(i => i.id)} : {}),
          allCandidateBase: args.allCandidateBase ?? false,
          allAppliesToVacancy: args.allAppliesToVacancy ?? false })

      Analytics.goal(Goal.JobInviteCv)
      showToast({title: t('toast_invited_to_vacancy_title'), text: t('toast_invited_to_vacancy_desc')})
    } catch (err) {
      if (err instanceof RequestError) {
        appContext.showSnackbar(err.message, SnackbarType.error)
      }
    }

    appContext.hidePanel()
    setLoading(false)
  }

  const initialValues = {
    vacancies: []
  }

  const formik = useFormik<IFormData>({
    initialValues,
    onSubmit: handleSubmit
  })

  console.log('CVs111', args.cvs)


  return (
    <SidePanelLayout>
      <FormikProvider value={formik}>
        <Form className={styles.form}>
          <SidePanelHeader title={t('job_invite_title')}/>
          <SidePanelBody fixed>
            <div className={styles.fields}>
              <div className={styles.cvList}>
              {args.cv && <CvCard cv={args.cv}/>}
              {args.cvs && args.cvs.map(i => <CvCard cv={i}/>)}
                {args.isMulti && (args.allAppliesToVacancy || args.allAppliesToVacancy) && args.total! > 3 && <div className={styles.multiLabel}> and {args.total! - 3} more candidates</div>}
              </div>
             <div className={styles.field}>
                <JobWithSearchField name={'vacancies'} validate={Validator.required}/>
              </div>
            </div>
          </SidePanelBody>
          <SidePanelFooter>
            <div className={styles.buttons}>
              <Button spinner={loading} type='submit' className={styles.apply} styleType='large' color='green'>
                {t('job_invite_button_sent')}
              </Button>
              <Button onClick={appContext.hidePanel} className={styles.btn} styleType='large' color='white'>
                {t('job_invite_button_cancel')}
              </Button>
            </div>
          </SidePanelFooter>
        </Form>
      </FormikProvider>
    </SidePanelLayout>

  )
}
