import styles from './index.module.scss'
import {
  ApplyJobAnonymizeWrapper,
  ApplyJobAnonymouslyStepKey,
  IApplyJobAnonymouslyFormData,
  useApplyJobAnonymize
} from '@/context/apply_job_anonymously'
import ApplyForJobFirstStep from '@/components/for_pages/Common/ApplyForJobForm/ApplyForJobFirstStep'
import ApplyForJobConfirmStep from '@/components/for_pages/Common/ApplyForJobForm/ApplyForJobConfirmStep'
import {Form, FormikProvider, useFormik} from 'formik'
import {useAppContext} from '@/context/state'
import {AiRequestStatus} from '@/data/enum/AiRequestStatus'
import {useEmployeeAiCvRequestsContext} from '@/context/employee_cv_request_state'
import { useMemo} from 'react'
import {Nullable} from '@/types/types'
import ApplyForJobReadyStep from '@/components/for_pages/Common/ApplyForJobForm/ApplyForJobReadyStep'
import ApplyForJobProcessingStep from '@/components/for_pages/Common/ApplyForJobForm/ApplyForJobProcessingStep'
import Spinner from '@/components/ui/Spinner'
import BottomSheetLayout from '@/components/layout/BottomSheet/BottomSheetLayout'
import {colors} from '@/styles/variables'
import BottomSheetBody from '@/components/layout/BottomSheet/BottomSheetBody'
import BottomSheetFooter from '@/components/layout/BottomSheet/BottomSheetFooter'
import BottomSheetHeader from '@/components/layout/BottomSheet/BottomSheetHeader'
import Button from '@/components/ui/Button'
import {Routes} from '@/types/routes'
import useTranslation from 'next-translate/useTranslation'
import {toast} from 'react-toastify'

enum FormToShow {
  Apply = 'apply',
  Confirm = 'confirm',
  Processing = 'processing',
  ShowCv = 'showCv'
}

interface Props {
  vacancyId: number
  isBottomSheet?: boolean | undefined
}

const ApplyForJobFormInner = (props: Props) => {
  const appContext = useAppContext()
  const {isTabletWidth} = appContext.size
  const applyJobAnonymously = useApplyJobAnonymize()
  const employeeAiCvRequests = useEmployeeAiCvRequestsContext()
  const applyJobAnonymize = useApplyJobAnonymize()
  const {t, lang} = useTranslation()
  const request = employeeAiCvRequests.requests.length > 0 ? employeeAiCvRequests.requests[0] : null
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
    if (!appContext.allLoaded) {
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
          return null
      }
    } else {
      switch (applyJobAnonymously.stepKey) {
        case ApplyJobAnonymouslyStepKey.First:
          return FormToShow.Apply
        case ApplyJobAnonymouslyStepKey.Apply:
        case ApplyJobAnonymouslyStepKey.Confirm:
          return FormToShow.Confirm
        default:
          return null
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

  const footer = useMemo(()=> {
    switch (formToShow){
      case FormToShow.Apply:
        return (<div>
          <div className={styles.privacy}>
            By pressing &quot;Apply&quot; you agree with  <a href={ lang === 'id' ? 'https://drive.google.com/file/d/1VpKHbMqnj_f91gaiZJcKfVKGRjRx2t0m/view?usp=sharing' : 'https://drive.google.com/file/d/1sAVdJWQR94WXVi4-ILKhIyis3QpC4vSK/view?usp=sharing'} target={'_blank'}>privacy</a>
          </div>
          <Button spinner={applyJobAnonymize.sending} type='submit' onClick={() => formik.submitForm()} className={styles.btn} fluid styleType='large'
                  color='green'>
            Apply
          </Button>
        </div>)
      case FormToShow.Confirm:
        return ( <Button spinner={applyJobAnonymize.sending} type='submit'  onClick={() => formik.submitForm()} className={styles.btn} fluid styleType='large'
                         color='green'>
          Confirm
        </Button>)
      case FormToShow.ShowCv:
        return (     <Button type='button' href={Routes.profileResumeEdit(request!.cv!.id!)} onClick={() => {
          const toastId = `ai-cv-request-${request!.id}-${request!.status}`
          toast.dismiss(toastId)
          appContext.hideBottomSheet()
        }} className={styles.btn} fluid
                             styleType='large' color='green'>
          Show now
        </Button>)
    }
  }, [formToShow])
  const body = (<FormikProvider value={formik}>
    <Form className={styles.form}>
      {formToShow === FormToShow.Apply && <ApplyForJobFirstStep/>}
      {formToShow === FormToShow.Confirm && <ApplyForJobConfirmStep/>}
      {formToShow === FormToShow.Processing && <ApplyForJobProcessingStep/>}
      {formToShow === FormToShow.ShowCv && <ApplyForJobReadyStep request={request!}/>}
    </Form>
  </FormikProvider>)
  if (props.isBottomSheet) {
    return (<BottomSheetLayout closeIconColor={colors.black}>
      <BottomSheetHeader title={title} suffix={formToShow === FormToShow.Processing ? <Spinner size={24}/> : null}/>
      <BottomSheetBody> {body}</BottomSheetBody>
      <BottomSheetFooter>
        {footer}
      </BottomSheetFooter>
    </BottomSheetLayout>)
  }
  return (<div className={styles.root}>
      {title && <div className={styles.title}>
        {title}
        {formToShow === FormToShow.Processing && <Spinner size={24}/>}
      </div>}
      {body}
      <div className={styles.footer}>
        {footer}
      </div>
    </div>
  )
}

export default function ApplyForJobForm(props: Props) {
  return <ApplyJobAnonymizeWrapper vacancyId={props.vacancyId}>
    <ApplyForJobFormInner {...props}/>
  </ApplyJobAnonymizeWrapper>
}
