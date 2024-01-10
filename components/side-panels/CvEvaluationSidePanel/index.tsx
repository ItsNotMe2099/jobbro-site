import styles from 'components/side-panels/JobsFilterSidePanel/index.module.scss'
import {Form, FormikProvider, useFormik} from 'formik'
import {useRef, useState} from 'react'
import {useAppContext} from '@/context/state'
import Button from '@/components/ui/Button'
import {JobReviewSidePanelArguments} from '@/types/side_panel_arguments'
import { RequestError} from '@/types/types'
import SidePanelFooter from '@/components/layout/SidePanel/SidePanelFooter'
import SidePanelBody from '@/components/layout/SidePanel/SidePanelBody'
import SidePanelHeader from '@/components/layout/SidePanel/SidePanelHeader'
import SidePanelLayout from '@/components/layout/SidePanel/SidePanelLayout'
import {Goal, SnackbarType} from '@/types/enums'
import FeedbackRepository from '@/data/repositories/FeedbackRepository'
import Analytics from '@/utils/goals'
import useTranslation from 'next-translate/useTranslation'
import showToast from '@/utils/showToast'

interface Props {

}

export interface IFormData {

}

export default function CvEvaluationSidePanel(props: Props) {
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

  }

  const formik = useFormik<IFormData>({
    initialValues,
    onSubmit: handleSubmit
  })



  return (
    <SidePanelLayout>
      <FormikProvider value={formik}>
        <Form className={styles.form}>
          <SidePanelHeader title={t('cv_evaluation_title')}/>
          <SidePanelBody fixed>

          </SidePanelBody>
          <SidePanelFooter>
            <div className={styles.buttons}>
              <Button type='button'  className={styles.apply} styleType='large' color='green'>
                {t('cv_evaluation_button_invite')}
              </Button>
              <Button  onClick={appContext.hidePanel} className={styles.btn} styleType='large'
                      color='white'>
                {t('cv_evaluation_button_cancel')}
              </Button>
            </div>
          </SidePanelFooter>
        </Form>
      </FormikProvider>
    </SidePanelLayout>

  )
}
