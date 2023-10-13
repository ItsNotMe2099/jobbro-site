import InputField from '@/components/fields/InputField'
import styles from '@/components/for_pages/Auth/RegistrationForm/index.module.scss'
import { Form, FormikProvider, useFormik } from 'formik'
import Validator from '@/utils/validator'
import Button from '@/components/ui/Button'
import { useState } from 'react'
import { useAppContext } from '@/context/state'
import { useRouter } from 'next/router'
import { Routes } from '@/types/routes'

interface IFormData{
  email: string
  password: string
  passwordConfirm: string
}
interface Props {
  onSubmit: () => void
}

export default function ManagerInviteConfirmForm(props: Props) {
  const appContext = useAppContext()
  const router = useRouter()
  const redirect = router.query.redirect as string
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (data: IFormData) => {
    setLoading(true)
/*
    try {
      const res = await AuthRepository.confirmInviteToReceivingPoint({
        newPassword: data.password,
        login: data.email,
        code: router.query.code as string
      })
      if (res.accessToken) {
        appContext.setToken(res.accessToken)
        await appContext.updateAboutMe()
        if (redirect) {
          router.replace(redirect)
        } else {
          router.replace(Routes.index)
        }
      } else {
        appContext.showSnackbar('Token error', SnackbarType.error)
      }
    } catch (err) {

      if (err instanceof RequestError) {
        appContext.showSnackbar(err.message, SnackbarType.error)
      }

    }

*/
    setLoading(false)
  }

  const initialValues:IFormData = {
    email: router.query.email as string,
    password: '',
    passwordConfirm: '',
  }


  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  })

  return (
    <FormikProvider value={formik}>
      <Form className={styles.form}>
        <div className={styles.title}>
          Creating new account
        </div>
        <InputField name='firstName' label={'First Name'}

          validate={Validator.combine([Validator.requiredName])} />
        <InputField label='Email' name='email'

          validate={Validator.combine([Validator.requiredEmail, Validator.email])} />
        <InputField
          label='Password'
          type='password'
          name='password'

          obscure
          validate={Validator.requiredPassword} />
        <div className={styles.btns}>
          <Button spinner={loading} type='submit' className={styles.btn} styleType='large' color='green'>
            Create
          </Button>
          <Button href={Routes.login(redirect)} className={styles.btn} styleType='large' color='white'>
            Log In
          </Button>
        </div>
      </Form>
    </FormikProvider>
  )
}
