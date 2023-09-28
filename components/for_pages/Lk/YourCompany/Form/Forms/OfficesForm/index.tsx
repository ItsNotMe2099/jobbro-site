import styles from './index.module.scss'
import { Form, FormikProvider, useFormik } from 'formik'
import { useState } from 'react'
import { useAppContext } from '@/context/state'
import { RequestError } from '@/types/types'
import { SnackbarType } from '@/types/enums'

interface Props {

}

export interface FormData {
  email: string
}

export default function OfficesForm(props: Props) {

  const [loading, setLoading] = useState<boolean>(false)

  const appContext = useAppContext()

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
    email: ''
  }

  const formik = useFormik<FormData>({
    initialValues,
    onSubmit: handleSubmit
  })

  return (
    <FormikProvider value={formik}>
      <Form className={styles.form}>
        
      </Form>
    </FormikProvider>
  )
}
