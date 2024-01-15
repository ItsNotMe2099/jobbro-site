import styles from './index.module.scss'

import InputField from '@/components/fields/InputField'
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
import useTranslation from 'next-translate/useTranslation'

interface IFormData{
  email: string
}
interface Props {
  onSubmit: () => void
}

export default function ForgotPasswordForm(props: Props) {
  const appContext = useAppContext()
  const { t } = useTranslation()
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
          {t('password_forgot_title')}
        </div>
        <div className={styles.text}>
          {t('password_forgot_desc')}
        </div>
        <InputField label={t('password_forgot_field_email')} name='email'

          validate={Validator.combine([Validator.requiredEmail, Validator.email])} />
        <div className={styles.btns}>
          <Button spinner={loading} type='submit' className={styles.btn} styleType='large' color='green'>
            {t('password_forgot_button_reset')}
          </Button>
          <Button href={Routes.login(redirect)} className={styles.btn} styleType='large' color='white'>
            {t('password_forgot_button_cancel')}
          </Button>
        </div>
      </Form>
    </FormikProvider>
  )
}
