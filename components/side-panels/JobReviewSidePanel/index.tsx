import styles from 'components/side-panels/JobsFilterSidePanel/index.module.scss'
import {Form, FormikProvider, useFormik} from 'formik'
import {useRef, useState} from 'react'
import {useAppContext} from '@/context/state'
import Button from '@/components/ui/Button'
import {JobReviewSidePanelArguments} from '@/types/side_panel_arguments'
import {Nullable, RequestError} from '@/types/types'
import SidePanelFooter from '@/components/layout/SidePanel/SidePanelFooter'
import SidePanelBody from '@/components/layout/SidePanel/SidePanelBody'
import SidePanelHeader from '@/components/layout/SidePanel/SidePanelHeader'
import SidePanelLayout from '@/components/layout/SidePanel/SidePanelLayout'
import StarRatingsField from '@/components/fields/StarRatingsField'
import TextAreaField from '@/components/fields/TextAreaField'
import {Goal, SnackbarType} from '@/types/enums'
import FeedbackRepository from '@/data/repositories/FeedbackRepository'
import FieldLabel from '@/components/fields/FieldLabel'
import Analytics from '@/utils/goals'
import useTranslation from 'next-translate/useTranslation'
import showToast from '@/utils/showToast'

interface Props {

}

export interface IFormData {
  markCandidateSelection: number,
  reviewCandidateSelection: Nullable<string>
  markPlatform: number
  reviewPlatform: Nullable<string>
}

export default function JobReviewSidePanel(props: Props) {
  const appContext = useAppContext()
  const { t } = useTranslation()
  const args = appContext.panelArguments as JobReviewSidePanelArguments
  const [loading, setLoading] = useState<boolean>(false)
  let ref = useRef<HTMLFormElement | null>(null)
  const handleSubmit = async (data: IFormData) => {
    setLoading(true)
    try {
      await FeedbackRepository.create({...data, vacancyId: args.vacancyId})
      Analytics.goal(Goal.JobFeedbackCreate, {...data, vacancyId: args.vacancyId})
      appContext.hidePanel()
      showToast({title: t('toast_vacancy_review_created_title'), text: t('toast_vacancy_review_created_desc')})
    } catch (err) {
      if (err instanceof RequestError) {
        appContext.showSnackbar(err.message, SnackbarType.error)
      }
    }

    setLoading(false)
  }

  const initialValues = {
    markCandidateSelection: 0,
    reviewCandidateSelection: null,
    markPlatform: 0,
    reviewPlatform: null
  }

  const formik = useFormik<IFormData>({
    initialValues,
    onSubmit: handleSubmit
  })



  return (
    <SidePanelLayout>
      <FormikProvider value={formik}>
        <Form className={styles.form}>
          <SidePanelHeader title={t('job_review_title')}/>
          <SidePanelBody fixed>
            <div className={styles.fields}>
              <div className={styles.field}>
                <FieldLabel label={t('job_review_field_mark_candidate_selection')} styleType={'large'}/>
                <StarRatingsField name={'markCandidateSelection'}/>
                <TextAreaField name={'reviewCandidateSelection'} label={t('job_review_field_review_candidate_selection')}/>
              </div>
              <div className={styles.field}>

                <FieldLabel label={t('job_review_field_mark_platform')} styleType={'large'}/>
                <StarRatingsField name={'markPlatform'}/>
                <TextAreaField name={'reviewPlatform'} label={t('job_review_field_review_platform')}/>
              </div>
            </div>
          </SidePanelBody>
          <SidePanelFooter>
            <div className={styles.buttons}>
              <Button spinner={loading} type='submit' className={styles.apply} styleType='large' color='green'>
                {t('job_review_button_sent')}
              </Button>
              <Button disabled={loading} onClick={appContext.hidePanel} className={styles.btn} styleType='large'
                      color='white'>
                {t('job_review_button_cancel')}
              </Button>
            </div>
          </SidePanelFooter>
        </Form>
      </FormikProvider>
    </SidePanelLayout>

  )
}
