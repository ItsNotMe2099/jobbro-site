import InputField from '@/components/fields/InputField'
import styles from '@/components/for_pages/Auth/LoginForm/index.module.scss'
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

interface IFormData {
  email: string,
  password: string,
}

interface Props {

}

export default function LoginForm(props: Props) {

  const appContext = useAppContext()
  const router = useRouter()
  const redirect = router.query.redirect as string
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (data: IFormData) => {
    setLoading(true)
    let accessToken: string = ''
    try {
      accessToken = await AuthRepository.login( data.email, data.password)

      if (accessToken) {
        appContext.setToken(accessToken)
        appContext.updateAboutMe()

        if (redirect) {
          router.replace(redirect)
        } else {
          router.replace(Routes.index)
        }
      } else {
        appContext.showSnackbar('Token error', SnackbarType.error)
      }
    } catch (err) {
      console.error(err)
      if (err instanceof RequestError) {
        appContext.showSnackbar(err.message, SnackbarType.error)
      }

    }
    setLoading(false)
  }

  const initialValues: IFormData = {
    email: '',
    password: '',
  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  })

  return (
    <FormikProvider value={formik}>
      <Form className={styles.form}>
        <div className={styles.title}>
          Login to the Jobbro
        </div>
        <InputField placeholder='Email' name='email' label={formik.values.email ? 'Email' : ''}
          labelType='in'
          validate={Validator.combine([Validator.requiredEmail, Validator.email])} />
        <InputField
          placeholder='Password'
          type='password'
          name='password'
          label={formik.values.password ? 'Password' : ''}
          labelType='in'
          obscure
          validate={Validator.requiredPassword} />
        <div className={styles.btns}>
          <Button spinner={loading} type='submit' className={styles.btn} styleType='large' color='green'>
            Log In
          </Button>
          <Button href={Routes.registration()} className={styles.btn} styleType='large' color='white'>
            Create account
          </Button>
        </div>
      </Form>
    </FormikProvider>
  )
}
