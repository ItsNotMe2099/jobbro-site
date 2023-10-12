import styles from './index.module.scss'
import { Form, FormikProvider, useFormik } from 'formik'
import { SnackbarType } from '@/types/enums'
import { useRef, useState } from 'react'
import { RequestError } from '@/types/types'
import { useAppContext } from '@/context/state'
import { useRouter } from 'next/router'
import JobAdDetailsForm from './Forms/JobAdDetailsForm'
import ItemWithText from '@/components/for_pages/Common/ItemWithText'
import ApplicationForm from './Forms/ApplicationForm'
import WorkflowForm from './Forms/WorkflowForm'
import FormStickyFooter from '@/components/for_pages/Common/FormStickyFooter'
import Card from '@/components/for_pages/Common/Card'


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

  const [form, setForm] = useState<'ad' | 'application' | 'workflow'>('ad')

  console.log('FORMIK', formik.values)

  return (
    <FormikProvider value={formik}>
      <Form ref={ref} className={styles.form}>
        {!props.preview && <div className={styles.switch}>
          <ItemWithText onClick={() => setForm('ad')}
            className={styles.item} active={form === 'ad'} text='Job ad Details' />
          <ItemWithText onClick={() => setForm('application')}
            className={styles.item} active={form === 'application'} text='Application Form' />
          <ItemWithText onClick={() => setForm('workflow')}
            className={styles.item} active={form === 'workflow'} text='Workflow' />
        </div>}
        {!props.preview ?
          <>
            {form === 'ad' && <JobAdDetailsForm formik={formik} />}
            {form === 'application' && <ApplicationForm formik={formik} />}
            {form === 'workflow' && <WorkflowForm formik={formik} />}
          </>
          :
          <div className={styles.preview}>
            <Card title={formik.values.title}>
              <div className={styles.salary}>
                {formik.values.salary}{formik.values.salaryMin}-{formik.values.salaryMax}{formik.values.salaryPerYear}
              </div>
              <div className={styles.intro}>
                {formik.values.intro}
              </div>
              <div className={styles.tasks}>
                <div className={styles.title}>
                  Tasks
                </div>
                <>{formik.values.tasks}</>
              </div>
              <div className={styles.tasks}>
                <div className={styles.title}>
                  Requirements
                </div>
                <>{formik.values.requirements}</>
              </div>
            </Card>
          </div>
        }
        <FormStickyFooter preview={props.preview} boundaryElement={`.${styles.form}`} formRef={ref} onPreview={props.onPreview} />
      </Form>
    </FormikProvider>
  )
}
