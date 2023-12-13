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
import {SnackbarType} from '@/types/enums'
import FeedbackRepository from '@/data/repositories/FeedbackRepository'
import FieldLabel from '@/components/fields/FieldLabel'

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
  const args = appContext.panelArguments as JobReviewSidePanelArguments
  const [loading, setLoading] = useState<boolean>(false)
  let ref = useRef<HTMLFormElement | null>(null)
  const handleSubmit = async (data: IFormData) => {
    setLoading(true)
    try {
      await FeedbackRepository.create({...data, vacancyId: args.vacancyId})
      appContext.hidePanel()
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

  console.log(formik)


  return (
    <SidePanelLayout>
      <FormikProvider value={formik}>
        <Form className={styles.form}>
          <SidePanelHeader title={'Evaluate'}/>
          <SidePanelBody fixed>
            <div className={styles.fields}>
              <div className={styles.field}>
                <FieldLabel label={'Assess the quality of candidate selection'} styleType={'large'}/>
                <StarRatingsField name={'markCandidateSelection'}/>
                <TextAreaField name={'reviewCandidateSelection'} label={'Write a review'}/>
              </div>
              <div className={styles.field}>

                <FieldLabel label={'Evaluate the quality of work on the platform'} styleType={'large'}/>
                <StarRatingsField name={'markPlatform'}/>
                <TextAreaField name={'reviewPlatform'} label={'Write a review'}/>
              </div>
            </div>
          </SidePanelBody>
          <SidePanelFooter>
            <div className={styles.buttons}>
              <Button spinner={loading} type='submit' className={styles.apply} styleType='large' color='green'>
                Send Review
              </Button>
              <Button disabled={loading} onClick={appContext.hidePanel} className={styles.btn} styleType='large'
                      color='white'>
                Cancel
              </Button>
            </div>
          </SidePanelFooter>
        </Form>
      </FormikProvider>
    </SidePanelLayout>

  )
}
