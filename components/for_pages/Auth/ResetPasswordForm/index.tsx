import styles from './index.module.scss'

import InputField from '@/components/fields/InputField'
import { Form, FormikProvider, useFormik } from 'formik'
import Validator from '@/utils/validator'
import Button from '@/components/ui/Button'
import { useState } from 'react'
import { RequestError } from '@/types/types'
import { useAppContext } from '@/context/state'
import { useRouter } from 'next/router'
import { Routes } from '@/types/routes'
import AuthRepository from '@/data/repositories/AuthRepository'
import useTranslation from 'next-translate/useTranslation'
import {SnackbarType} from '@/types/enums'

interface IFormData {
  code: string
  password: string,
  passwordConfirm: string
}

interface Props {
  code: string
  login: string
}

export default function ResetPasswordForm(props: Props) {
  const appContext = useAppContext()
  const { t } = useTranslation()
  const router = useRouter()
  const redirect = router.query.redirect as string
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const handleSubmit = async (data: IFormData) => {
    setLoading(true)
    try {
      const res = await AuthRepository.passwordSet({
        login: props.login,
        code: data.code,
        newPassword: data.password,
      })

      appContext.setToken(res.accessToken)
      appContext.updateAboutMe()
      if (redirect && redirect !== '/') {
        router.replace(redirect)
      } else {
        router.replace(Routes.lk)
      }

    } catch (err) {
      if (err instanceof RequestError) {
        appContext.showSnackbar(err.message, SnackbarType.error)
      }

    }


    setLoading(false)
  }
  const initialValues: IFormData = {
    code: props.code ?? '',
    password: '',
    passwordConfirm: ''
  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  })

  return (
    <FormikProvider value={formik}>
      <Form className={styles.form}>
        <div className={styles.title}>
          {t('password_reset_title')}
        </div>
        <div className={styles.text}>
          {t('password_reset_desc')}
        </div>
        <InputField
          type='password'
          name='password'
          label={t('password_reset_field_password')}
          obscure
          validate={Validator.requiredPassword} />
        <InputField
          type='password'
          name='passwordConfirm'
          label={t('password_reset_field_new_password')}
          obscure
          validate={Validator.combine([Validator.requiredPassword, Validator.password, Validator.passwordsMustMatch(formik.values)])} />
        <div className={styles.btns}>
          <Button spinner={loading} type='submit' className={styles.btn} styleType='large' color='green'>
            {t('password_reset_button_apply')}
          </Button>
          <Button href={Routes.login()} className={styles.btn} styleType='large' color='white'>
            {t('password_reset_button_cancel')}
          </Button>
        </div>
      </Form>
    </FormikProvider>
  )
}
