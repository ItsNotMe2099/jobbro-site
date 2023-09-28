import styles from './index.module.scss'
import Card from '@/components/for_pages/Common/Card'
import Validator from '@/utils/validator'
import InputField from '@/components/fields/InputField'
import { Form, FormikProvider, useFormik } from 'formik'
import { useState } from 'react'
import { useAppContext } from '@/context/state'
import { RequestError } from '@/types/types'
import { SnackbarType } from '@/types/enums'
import AddSvg from '@/components/svg/AddSvg'
import { colors } from '@/styles/variables'

interface Props {

}

export interface FormData {
  email: string
}

export default function TeamForm(props: Props) {

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
        <Card title='Invite Team Members'>
          <InputField placeholder='Email' name='email' label={formik.values.email ? 'Email' : ''}
            prefix={formik.values.email ? <AddSvg className={styles.add} color={colors.textSecondary} /> : undefined}
            labelType='in'
            validate={Validator.email} />
        </Card>
      </Form>
    </FormikProvider>
  )
}
