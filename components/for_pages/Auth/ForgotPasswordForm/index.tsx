import InputField from '@/components/fields/InputField'
import styles from '@/components/for_pages/Auth/ForgotPasswordForm/index.module.scss'
import { Form, FormikProvider, useFormik } from 'formik'
import Validator from '@/utils/validator'
import Button from '@/components/ui/Button'
import { SnackbarType } from '@/types/enums'
import { useState } from 'react'
import { RequestError } from '@/types/types'
import { useAppContext } from '@/context/state'
import { useRouter } from 'next/router'
import { Routes } from '@/types/routes'
import AuthRepository from '@/data/repositories/AuthRepository'

interface IFormData{
  email: string
}
interface Props {
  onSubmit: () => void
}

export default function ForgotPasswordForm(props: Props) {

  const appContext = useAppContext()
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  const redirect = router.query.redirect as string


  const handleSubmit = async (data: IFormData) => {
    setLoading(true)
    try {
      const login = data.email
      const res = await AuthRepository.passwordReset(login)
      props.onSubmit()
    } catch (err) {

      if (err instanceof RequestError) {
        appContext.showSnackbar(err.message, SnackbarType.error)
      }

    }

    setLoading(false)
  }

  const initialValues = {
    email: '',
  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  })

  return (
    <FormikProvider value={formik}>
      <Form className={styles.form}>
        <div className={styles.title}>
          Reset password
        </div>
        <div className={styles.text}>
          Enter your email with Jobbro Account. We will send new password to this email.
        </div>
        <InputField placeholder='Email' name='email' label={formik.values.email ? 'Email' : ''}

          validate={Validator.combine([Validator.requiredEmail, Validator.email])} />
        <div className={styles.btns}>
          <Button spinner={loading} type='submit' className={styles.btn} styleType='large' color='green'>
            Reset
          </Button>
          <Button href={Routes.login(redirect)} className={styles.btn} styleType='large' color='white'>
            Cancel
          </Button>
        </div>
      </Form>
    </FormikProvider>
  )
}
