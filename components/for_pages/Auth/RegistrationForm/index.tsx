import InputField from '@/components/fields/InputField'
import styles from '@/components/for_pages/Auth/RegistrationForm/index.module.scss'
import { Form, FormikProvider, useFormik } from 'formik'
import Validator from '@/utils/validator'
import Button from '@/components/ui/Button'
import {Goal, SnackbarType} from '@/types/enums'
import { useState } from 'react'
import { RequestError } from '@/types/types'
import { useAppContext } from '@/context/state'
import { useRouter } from 'next/router'
import { Routes } from '@/types/routes'
import AuthRepository from '@/data/repositories/AuthRepository'
import Analytics from '@/utils/goals'
import useTranslation from 'next-translate/useTranslation'

interface IFormData{
  firstName: string
  email: string
  password: string
}
interface Props {
  onSubmit: () => void
}

export default function RegistrationForm(props: Props) {
  const appContext = useAppContext()
  const router = useRouter()
  const { t } = useTranslation()
  const redirect = router.query.redirect as string
  const [loading, setLoading] = useState<boolean>(false)


  const handleSubmit = async (data: IFormData) => {
    setLoading(true)
    try {
      const res = await AuthRepository.register(data)
      props.onSubmit()
      Analytics.goal(Goal.RegistrationHirer)
      return
      if (res.accessToken) {
        appContext.setToken(res.accessToken)
        appContext.updateAboutMe()
        if (redirect) {
          router.replace(redirect)
        } else {
          router.replace(Routes.lk)
        }
      } else {
        appContext.showSnackbar('Token error', SnackbarType.error)
      }
    } catch (err) {

      if (err instanceof RequestError) {
        appContext.showSnackbar(err.message, SnackbarType.error)
      }

    }
    setLoading(false)
  }

  const initialValues = {
    firstName: '',
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
          {t('registration_title')}
        </div>
        <InputField   label={t('registration_field_first_name')} name='firstName'

          validate={Validator.combine([Validator.requiredName])} />
        <InputField   label={t('registration_field_email')} name='email'

          validate={Validator.combine([Validator.requiredEmail, Validator.email])} />
        <InputField
          label={t('registration_field_password')}
          type='password'
          name='password'
          obscure
          validate={Validator.combine([Validator.requiredPassword, Validator.password])} />
        <div className={styles.btns}>
          <Button spinner={loading} type='submit' className={styles.btn} styleType='large' color='green'>
            {t('registration_button_create')}
          </Button>
          <Button href={Routes.login(redirect)} className={styles.btn} styleType='large' color='white'>
            {t('registration_button_login')}
          </Button>
        </div>
      </Form>
    </FormikProvider>
  )
}
