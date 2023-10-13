import styles from './index.module.scss'
import { Form, FormikProvider, useFormik } from 'formik'
import { SnackbarType } from '@/types/enums'
import {useRef, useState} from 'react'
import {IOption, RequestError} from '@/types/types'
import { useAppContext } from '@/context/state'
import { useRouter } from 'next/router'
import JobAdDetailsForm from './Forms/JobAdDetailsForm'
import ApplicationForm from './Forms/ApplicationForm'
import WorkflowForm from './Forms/WorkflowForm'
import FormStickyFooter from '@/components/for_pages/Common/FormStickyFooter'

import Tabs from '@/components/ui/Tabs'


enum TabKey{
  AdDetails = 'adDetails',
  ApplicationForm = 'applicationForm',
  Workflow = 'workflow'
}
interface Props {
  onPreview?: () => void
  preview?: boolean
}

export interface FormData {
  title: string
  category: string
  subCategory: string
  empType: string
  workplace: string
  office: string
  salary: string
  salaryMin: string
  salaryMax: string
  salaryPerYear: string
  experience: string
  requirements: string
  tasks: string
  intro: string
  benefits: string
  skills: any[] // temp
  contact: string
  replyApply: string
  replyDecline: string
  cv: string
  coverLetter: string
  lang: string
  stages: { title: string, desc: string }[]
}

export default function CreateJobManuallyForm(props: Props) {

  const appContext = useAppContext()
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  let ref = useRef<HTMLFormElement | null>(null)
  const handleSubmit = async (data: FormData) => {
    setLoading(true)
    try {

    } catch (err) {

      if (err instanceof RequestError) {
        appContext.showSnackbar(err.message, SnackbarType.error)
      }

    }


    setLoading(false)
  }

  const initialValues = {
    title: '',
    category: '',
    subCategory: '',
    empType: '',
    workplace: '',
    office: '',
    salary: '',
    salaryMin: '',
    salaryMax: '',
    salaryPerYear: '',
    experience: '',
    requirements: '',
    tasks: '',
    intro: '',
    benefits: '',
    skills: [],
    contact: '',
    replyApply: '',
    replyDecline: '',
    cv: '',
    coverLetter: '',
    lang: '',
    stages: [{ title: '', desc: '' }]
  }

  const formik = useFormik<FormData>({
    initialValues,
    onSubmit: handleSubmit
  })

  const [tab, setTab] = useState<TabKey>(TabKey.ApplicationForm)
  const options: IOption<TabKey>[] = [
    {label: 'Job ad Details', value: TabKey.AdDetails},
    {label: 'Application Form', value: TabKey.ApplicationForm},
    {label: 'Workflow', value: TabKey.Workflow}
  ]
  console.log('FORMIK', formik.values)

  return (
    <FormikProvider value={formik}>
      <Form  ref={ref}  className={styles.form}>
        <Tabs<TabKey> options={options} value={tab} onClick={value => setTab(value)}/>
        {tab === TabKey.AdDetails && <JobAdDetailsForm formik={formik} />}
        {tab === TabKey.ApplicationForm && <ApplicationForm formik={formik} />}
        {tab === TabKey.Workflow && <WorkflowForm formik={formik} />}
        <FormStickyFooter boundaryElement={`.${styles.form}`} formRef={ref}/>
      </Form>
    </FormikProvider>
  )
}
