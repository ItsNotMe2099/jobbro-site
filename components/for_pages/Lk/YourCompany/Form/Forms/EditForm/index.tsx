import styles from './index.module.scss'
import Card from '@/components/for_pages/Common/Card'
import { Form, FormikProvider, useFormik } from 'formik'
import { useState } from 'react'
import { useAppContext } from '@/context/state'
import { RequestError } from '@/types/types'
import { SnackbarType } from '@/types/enums'
import InputField from '@/components/fields/InputField'
import Validator from '@/utils/validator'

interface Props {

}

export interface FormData {
  officeName: string
  country: string
  postalCode: string
  city: string
  street: string
  houseNumber: string
}

export default function EditForm(props: Props) {

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
    officeName: '',
    country: '',
    postalCode: '',
    city: '',
    street: '',
    houseNumber: '',
  }

  const formik = useFormik<FormData>({
    initialValues,
    onSubmit: handleSubmit
  })

  return (
    <FormikProvider value={formik}>
      <Form className={styles.form}>
        <Card title='Details'>
          <InputField placeholder='Office name' name='officeName' label={formik.values.officeName ? 'Office name' : ''}
            labelType='in'
            validate={Validator.required} />
        </Card>
      </Form>
    </FormikProvider>
  )
}
