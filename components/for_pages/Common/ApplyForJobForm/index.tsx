import styles from './index.module.scss'
import {
  ApplyJobAnonymizeWrapper,
  ApplyJobAnonymouslyStepKey,
  IApplyJobAnonymouslyFormData,
  useApplyJobAnonymize
} from '@/context/apply_job_anonymously'
import ContentLoader from '@/components/ui/ContentLoader'
import ApplyForJobFirstStep from '@/components/for_pages/Common/ApplyForJobForm/ApplyForJobFirstStep'
import ApplyForJobConfirmStep from '@/components/for_pages/Common/ApplyForJobForm/ApplyForJobConfirmStep'
import {Form, FormikProvider, useFormik} from 'formik'
import {useAppContext} from '@/context/state'
import {AiRequestStatus} from '@/data/enum/AiRequestStatus'
import {useEmployeeAiCvRequestsContext} from '@/context/employee_cv_request_state'
import {useMemo} from 'react'
import {Nullable} from '@/types/types'
import CloseModalBtn from '@/components/ui/CloseModalBtn'
import ApplyForJobReadyStep from '@/components/for_pages/Common/ApplyForJobForm/ApplyForJobReadyStep'
import ApplyForJobProcessingStep from '@/components/for_pages/Common/ApplyForJobForm/ApplyForJobProcessingStep'
import Spinner from '@/components/ui/Spinner'
import {MyEvents} from '@/components/for_pages/Calendar/MyEvents'

enum FormToShow {
  Apply = 'apply',
  Confirm = 'confirm',
  Processing = 'processing',
  ShowCv = 'showCv'
}

interface Props {
  vacancyId: number
}

const ApplyForJobFormInner = (props: Props) => {
  const appContext = useAppContext()
  const {isTabletWidth} = appContext.size
  const applyJobAnonymously = useApplyJobAnonymize()
  const employeeAiCvRequests = useEmployeeAiCvRequestsContext()
  const request = employeeAiCvRequests.requests.length > 0 ? employeeAiCvRequests.requests[0] : null
  const canShowContent = (appContext.allLoaded && !appContext.isLogged) || employeeAiCvRequests.initialLoaded
  const hasRequest = !!request
  const handleSubmit = (data: IApplyJobAnonymouslyFormData) => {
    switch (applyJobAnonymously.stepKey) {
      case ApplyJobAnonymouslyStepKey.First:
        applyJobAnonymously.register(data)
        break
      case ApplyJobAnonymouslyStepKey.Confirm:
        applyJobAnonymously.confirm(data.code!)
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
  const formToShow = useMemo<Nullable<FormToShow>>(() => {
    if(!appContext.allLoaded){
      return null
    }
    if (hasRequest) {
      switch (request!.status) {
        case AiRequestStatus.Created:
        case AiRequestStatus.InQueue:
        case AiRequestStatus.InProgress:
        case AiRequestStatus.Error:
          return FormToShow.Processing
        case AiRequestStatus.Finished:
          if (!request!.cv?.isChecked) {
            return FormToShow.ShowCv
          }
          return null
        default:
          return  null
      }
    } else {
      switch (applyJobAnonymously.stepKey) {
        case ApplyJobAnonymouslyStepKey.First:
          return FormToShow.Apply
        case ApplyJobAnonymouslyStepKey.Apply:
        case ApplyJobAnonymouslyStepKey.Confirm:
          return FormToShow.Confirm
        default:
          return  null
      }
    }

  }, [applyJobAnonymously.stepKey, hasRequest, request, appContext.allLoaded])
  const title = useMemo(() => {
      switch (formToShow) {
        case FormToShow.Apply:
          return 'Apply for job'
        case FormToShow.Confirm:
          return 'Confirm Email'
        case FormToShow.Processing:
          return 'Processing'
        case FormToShow.ShowCv:
          return 'Resume is ready!'
      }
  }, [formToShow])
  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  })
  console.log('FormShow', formToShow, (appContext.allLoaded && !appContext.isLogged) , employeeAiCvRequests.initialLoaded ,hasRequest)
  return (
    <FormikProvider value={formik}>
      <Form className={styles.root}>
        {canShowContent && title  && <div className={styles.title}>
          {title}
          {formToShow === FormToShow.Processing && <Spinner size={24}/>}
          {isTabletWidth &&
            <CloseModalBtn onClick={appContext.hideModal}/>
          }
        </div>}
        {((appContext.allLoaded && appContext.isLogged) && !employeeAiCvRequests.initialLoaded) && <ContentLoader isOpen={true}/>}
        {canShowContent ?
          <>
            {formToShow === FormToShow.Apply && <ApplyForJobFirstStep/>}
            {formToShow === FormToShow.Confirm && <ApplyForJobConfirmStep/>}
            {formToShow === FormToShow.Processing && <ApplyForJobProcessingStep/>}
            {formToShow === FormToShow.ShowCv && <ApplyForJobReadyStep request={request!}/>}
            {!formToShow  &&  <MyEvents />}
          </>
          : null}
      </Form>
    </FormikProvider>
  )
}

export default function ApplyForJobForm(props: Props) {
  return <ApplyJobAnonymizeWrapper vacancyId={props.vacancyId}>
    <ApplyForJobFormInner {...props}/>
  </ApplyJobAnonymizeWrapper>
}
