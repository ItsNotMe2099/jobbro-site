import InputField from '@/components/fields/InputField'
import styles from '@/components/for_pages/Auth/RegistrationForm/index.module.scss'
import { Form, FormikProvider, useFormik } from 'formik'
import Validator from '@/utils/validator'
import Button from '@/components/ui/Button'
import { useState } from 'react'
import { useAppContext } from '@/context/state'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'
import AuthRepository from '@/data/repositories/AuthRepository'
import {Routes} from '@/types/routes'
import {SnackbarType} from '@/types/enums'
import {RequestError} from '@/types/types'

interface IFormData{
  firstName: string
  email: string
  password: string
  passwordConfirm: string
}
interface Props {

}

export default function ManagerInviteConfirmForm(props: Props) {
  const appContext = useAppContext()
  const router = useRouter()
  const { t } = useTranslation()
  const redirect = router.query.redirect as string
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (data: IFormData) => {
    setLoading(true)

    try {
      const res = await AuthRepository.confirmManagerInvite({
        password: data.password,
        email: data.email,
        firstName: data.firstName,
        code: router.query.code as string
      })
      if (res.accessToken) {
        appContext.setToken(res.accessToken)
        await appContext.updateAboutMe()
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

  const initialValues:IFormData = {
    firstName: '',
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
          {t('manager_invite_title')}
        </div>
        <InputField name='firstName' label={t('manager_invite_field_first_name')}
          validate={Validator.required} />
        <InputField label={t('manager_invite_field_email')} name='email'

          validate={Validator.combine([Validator.required, Validator.email])} />
        <InputField
          label={t('manager_invite_field_password')}
          type='password'
          name='password'
          obscure
          validate={Validator.required} />
        <div className={styles.btns}>
          <Button spinner={loading} type='submit' className={styles.btn} styleType='large' color='green'>
            {t('manager_invite_button_submit')}
          </Button>
        </div>
      </Form>
    </FormikProvider>
  )
}
