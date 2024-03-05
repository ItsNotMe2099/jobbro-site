import styles from './index.module.scss'

import InputField from '@/components/fields/InputField'
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
import Link from 'next/link'
import Analytics from '@/utils/goals'
import useTranslation from 'next-translate/useTranslation'
import Modes from '@/components/ui/Modes'

interface IFormData {
  email: string,
  password: string,
}

interface Props {

}

enum AuthType {
  Find='find',
  Post='post'
}

export default function LoginForm(props: Props) {

  const appContext = useAppContext()
  const router = useRouter()
  const { t } = useTranslation()
  const redirect = router.query.redirect as string
  const [loading, setLoading] = useState(false)
  const [authType, setAuthType] = useState<AuthType>(AuthType.Post)

  const handleSubmit = async (data: IFormData) => {
    setLoading(true)
    let accessToken: string = ''
    try {
      accessToken = await AuthRepository.login( data.email, data.password)

      if (accessToken) {
        Analytics.goal(Goal.Login)
        appContext.setToken(accessToken)
        await appContext.updateAboutMe()

        if (redirect && redirect !== '/') {

          console.log('redirect to redirect', redirect)
          router.replace(redirect)
        } else {
          console.log('redirect to lk')
          router.replace(Routes.lk)
        }
      } else {
        appContext.showSnackbar('Error happened', SnackbarType.error)
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
          {t('login_title')}
        </div>
        <Modes 
          buttons={[
            {name: t('login_switcher_find'), type: AuthType.Find},
            {name: t('login_switcher_post'), type: AuthType.Post}
          ]} 
          buttonClassName={styles.modesButton}
          activeButton={authType} 
          onSet={(type)=>setAuthType(type)}/> 
        <InputField name='email' label={t('login_field_email')}
          validate={Validator.combine([Validator.requiredEmail, Validator.email])} />
        <InputField
          label={t('login_field_password')}
          type='password'
          name='password'
          obscure
          validate={Validator.requiredPassword} />
          <Link className={styles.reset} href={Routes.passwordForgot}>{t('login_reset_password')}</Link>
        <div className={styles.btns}>
          <Button href={Routes.registration()} className={styles.btn} styleType='large' color='white'>
            {t('login_button_registration')}
          </Button>
          <Button spinner={loading} type='submit' className={styles.btn} styleType='large' color='green'>
            {t('login_button_login')}
          </Button>
          
        </div>
      </Form>
    </FormikProvider>
  )
}
