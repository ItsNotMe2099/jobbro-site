import styles from './index.module.scss'
import {
  ApplyJobAnonymizeWrapper,
  ApplyJobAnonymouslyStepKey, IApplyJobAnonymouslyFormData,
  useApplyJobAnonymize
} from '@/context/apply_job_anonymously'
import ContentLoader from '@/components/ui/ContentLoader'
import ApplyForJobFirstStep from '@/components/for_pages/Common/ApplyForJobForm/ApplyForJobFirstStep'
import ApplyForJobConfirmStep from '@/components/for_pages/Common/ApplyForJobForm/ApplyForJobConfirmStep'
import ApplyForJobRequestStep from '@/components/for_pages/Common/ApplyForJobForm/ApplyForJobRequestStep'
import { Form, FormikProvider, useFormik } from 'formik'
import Button from '@/components/ui/Button'
import {useAppContext} from '@/context/state'

interface Props {
  vacancyId: number
}

const ApplyForJobFormInner = (props: Props) => {
  const appContext = useAppContext()
  const applyJobAnonymously = useApplyJobAnonymize()
  const handleSubmit = (data: IApplyJobAnonymouslyFormData) => {
    switch (applyJobAnonymously.stepKey){
      case ApplyJobAnonymouslyStepKey.First:
        applyJobAnonymously.register(data)
        break
      case ApplyJobAnonymouslyStepKey.Confirm:
        applyJobAnonymously.confirm(data.code)
        break

    }
  }

  const initialValues: IApplyJobAnonymouslyFormData = {
    cv: null,
    image: null,
    name: null,
    email: null,
    code: null,
  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  })
   return (
      <FormikProvider value={formik}>
        <Form className={styles.root}>
          <div className={styles.title}>Apply for job</div>
      {applyJobAnonymously.loading && <ContentLoader isOpen={true}/>}
      {!applyJobAnonymously.loading ? <>
        {!applyJobAnonymously.request && applyJobAnonymously.stepKey === ApplyJobAnonymouslyStepKey.First && <ApplyForJobFirstStep/>}
        {!applyJobAnonymously.request && applyJobAnonymously.stepKey === ApplyJobAnonymouslyStepKey.Confirm && <ApplyForJobConfirmStep/>}
        {applyJobAnonymously.request != null && <ApplyForJobRequestStep/>}
      </> : null}
          {!applyJobAnonymously.request && ([ApplyJobAnonymouslyStepKey.First, ApplyJobAnonymouslyStepKey.Confirm] as ApplyJobAnonymouslyStepKey[]).includes(applyJobAnonymously.stepKey) &&  <Button spinner={applyJobAnonymously.sending} type='submit' className={styles.btn} fluid styleType='large' color='green'>
            {applyJobAnonymously.stepKey === ApplyJobAnonymouslyStepKey.First ? 'Apply' : 'Confirm'}
          </Button>}
        </Form>
      </FormikProvider>
  )
}

export default function ApplyForJobForm(props: Props) {
  return <ApplyJobAnonymizeWrapper vacancyId={props.vacancyId}>
    <ApplyForJobFormInner {...props}/>
  </ApplyJobAnonymizeWrapper>
}
