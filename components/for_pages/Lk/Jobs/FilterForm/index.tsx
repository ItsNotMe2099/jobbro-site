import styles from './index.module.scss'
import { Form, FormikProvider, useFormik } from 'formik'
import { SnackbarType } from '@/types/enums'
import { useRef, useState } from 'react'
import { RequestError } from '@/types/types'
import { useAppContext } from '@/context/state'
import { useRouter } from 'next/router'
import CheckBoxField from '@/components/fields/CheckBoxField'
import Button from '@/components/ui/Button'
import DateField from '@/components/fields/DateField'
import ProjecteSearchField from '@/components/fields/ProjectSearchField'
import { useJobFilterContext } from '@/context/job_filter_state'

interface Props {

}

export interface FormData {
  published: boolean
  draft: boolean
  paused: boolean
  market: boolean
  mobileApp: boolean
  showClosed: boolean
  date: string
  projectName: string
}

export default function FilterForm(props: Props) {

  const appContext = useAppContext()
  const jobFilterContext = useJobFilterContext()
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  let ref = useRef<HTMLFormElement | null>(null)
  const handleSubmit = async (data: FormData) => {
    setLoading(true)
    try {
      handleApply()
    } catch (err) {

      if (err instanceof RequestError) {
        appContext.showSnackbar(err.message, SnackbarType.error)
      }

    }

    appContext.hidePanel()
    appContext.hideOverlay()
    setLoading(false)
  }

  const initialValues = {
    published: jobFilterContext.published,
    draft: jobFilterContext.draft,
    paused: jobFilterContext.paused,
    market: jobFilterContext.market,
    mobileApp: jobFilterContext.mobileApp,
    showClosed: jobFilterContext.showClosed,
    date: jobFilterContext.date,
    projectName: jobFilterContext.projectName
  }

  const formik = useFormik<FormData>({
    initialValues,
    onSubmit: handleSubmit
  })

  console.log(formik)

  const handleApply = () => {
    jobFilterContext.setPublished(formik.values.published)
    jobFilterContext.setDraft(formik.values.draft)
    jobFilterContext.setPaused(formik.values.paused)
    jobFilterContext.setMarket(formik.values.market)
    jobFilterContext.setMobileApp(formik.values.mobileApp)
    jobFilterContext.setShowClosed(formik.values.showClosed)
    jobFilterContext.setDate(formik.values.date)
    jobFilterContext.setProjectName(formik.values.projectName)
  }

  return (
    <FormikProvider value={formik}>
      <Form ref={ref} className={styles.form}>
        <div className={styles.wrapper}>
          <div className={styles.block}>
            <div className={styles.title}>
              Status
            </div>
            <div className={styles.fields}>
              <div className={styles.checkbox}>
                <CheckBoxField name='published' label='Published' />
              </div>
              <div className={styles.checkbox}>
                <CheckBoxField name='draft' label='Draft' />
              </div>
              <div className={styles.checkbox}>
                <CheckBoxField name='paused' label='Paused' />
              </div>
            </div>
          </div>
          <div className={styles.block}>
            <div className={styles.title}>
              Project
            </div>
            <div className={styles.date}>
              <ProjecteSearchField name='projectName' />
            </div>
            <div className={styles.fields}>
              <div className={styles.checkbox}>
                <CheckBoxField name='market' label='Market' />
              </div>
              <div className={styles.checkbox}>
                <CheckBoxField name='mobileApp' label='Mobile app' />
              </div>
            </div>
          </div>
          <div className={styles.block}>
            <div className={styles.title}>
              Date
            </div>
            <div className={styles.date}>
              <DateField iconName={'field_date'} name='date' placeholder='Open Date' />
            </div>
          </div>
          <div className={styles.block}>
            <div className={styles.title}>
              Closed Jobs
            </div>
            <div className={styles.fields}>
              <div className={styles.checkbox}>
                <CheckBoxField name='showClosed' label='Show' />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.btns}>
          <Button spinner={loading} type='submit' className={styles.apply} styleType='large' color='green'>
            Apply
          </Button>
          <Button onClick={appContext.hidePanel} className={styles.btn} styleType='large' color='white'>
            Cancel
          </Button>
        </div>
      </Form>
    </FormikProvider>
  )
}
