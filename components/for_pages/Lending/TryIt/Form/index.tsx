import InputField from '@/components/fields/InputField'
import styles from './index.module.scss'
import { Form, FormikProvider, useFormik } from 'formik'
import Validator from '@/utils/validator'
import Button from '@/components/ui/Button'
import { useState } from 'react'
import { RequestError } from '@/types/types'
import { useAppContext } from '@/context/state'
import { SnackbarType } from '@/types/enums'

interface IFormData {
  name: string
  email: string
  phone: string
  company: string
}

interface Props {

}

export default function TryItForm(props: Props) {

  const [loading, setLoading] = useState<boolean>(false)
  const appContext = useAppContext()

  const handleSubmit = async (data: IFormData) => {
    setLoading(true)
    try {

    } catch (err) {
      console.error(err)
      if (err instanceof RequestError) {
        appContext.showSnackbar(err.message, SnackbarType.error)
      }

    }
    setLoading(false)
  }

  const initialValues: IFormData = {
    name: '',
    email: '',
    phone: '',
    company: ''
  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  })

  return (
    <FormikProvider value={formik}>
      <Form className={styles.form}>
        <InputField lendingInput
          classNameInput={styles.input}
          placeholder='Name'
          classNameInputWrapper={styles.inputWrapper}
          name='name'
          validate={Validator.required} />
        <InputField
          lendingInput
          placeholder='E-mail'
          classNameInput={styles.input}
          classNameInputWrapper={styles.inputWrapper}
          name='email'
          validate={Validator.combine([Validator.required, Validator.email])} />
        <InputField
          placeholder='Phone'
          lendingInput
          classNameInput={styles.input}
          classNameInputWrapper={styles.inputWrapper}
          format='phone'
          name='phone'
          validate={Validator.combine([Validator.required, Validator.phone])} />
        <InputField
          placeholder='Company'
          lendingInput
          classNameInput={styles.input}
          classNameInputWrapper={styles.inputWrapper}
          name='company'
          validate={Validator.required} />
        <Button className={styles.btn} color='black'>
          Try demo
        </Button>
      </Form>
    </FormikProvider>
  )
}
