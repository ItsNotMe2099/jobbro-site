import styles from './index.module.scss'
import { Form, FormikProvider, useFormik } from 'formik'
import { SnackbarType } from '@/types/enums'
import { useState } from 'react'
import { RequestError } from '@/types/types'
import { useAppContext } from '@/context/state'
import { useRouter } from 'next/router'
import JobAdDetailsForm from './Forms/JobAdDetailsForm'
import ItemWithText from '@/components/for_pages/Common/ItemWithText'


interface Props {

}

interface FormData {
  title: string
}

export default function CreateJobManuallyForm(props: Props) {

  const appContext = useAppContext()
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)

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
    title: ''
  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  })

  const [form, setForm] = useState<'ad' | 'application' | 'workflow'>('ad')

  console.log('FORMIK', formik.values)

  return (
    <FormikProvider value={formik}>
      <Form className={styles.form}>
        <div className={styles.switch}>
          <ItemWithText onClick={() => setForm('ad')}
            className={styles.item} active={form === 'ad'} text='Job ad Details' />
          <ItemWithText onClick={() => setForm('application')}
            className={styles.item} active={form === 'application'} text='Application Form' />
          <ItemWithText onClick={() => setForm('workflow')}
            className={styles.item} active={form === 'workflow'} text='Workflow' />
        </div>
        {form === 'ad' && <JobAdDetailsForm />}
      </Form>
    </FormikProvider>
  )
}
