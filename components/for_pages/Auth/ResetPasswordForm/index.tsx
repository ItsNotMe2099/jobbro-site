import InputField from '@/components/fields/InputField'
import styles from '@/components/for_pages/Auth/ResetPasswordForm/index.module.scss'
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
  const router = useRouter()
  const redirect = router.query.redirect as string

  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [code, setCode] = useState<string | null>(props.code ?? null)
  const [loadingSendAgain, setLoadingSendAgain] = useState(false)
  const [remainSec, setRemainSec] = useState<number>(0)

  const handleSendAgain = async () => {
    setError(null)
    setLoadingSendAgain(true)
    try {
      const res = await AuthRepository.passwordReset(props.login)
      setRemainSec(res.codeCanRetryIn)
      setCode(res.code)

    } catch (err) {
      if (err instanceof RequestError) {
        appContext.showSnackbar(err.message, SnackbarType.error)
      }
    }
    setLoadingSendAgain(false)
  }

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
      if (redirect) {
        router.replace(redirect)
      } else {
        router.replace(Routes.index)
      }

    } catch (err) {
      if (err instanceof RequestError) {
        setError(err.message)
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
          Reset password
        </div>
        <div className={styles.text}>
          Password will be reseted. Enter new password for your account
        </div>
        <InputField
          placeholder='New password'
          type='password'
          name='password'
          label={formik.values.password ? 'New password' : ''}
          labelType='in'
          obscure
          validate={Validator.requiredPassword} />
        <InputField
          placeholder='Confirm password'
          type='password'
          name='passwordConfirm'
          label={formik.values.passwordConfirm ? 'Confirm password' : ''}
          labelType='in'
          obscure
          validate={Validator.combine([Validator.requiredPassword, Validator.passwordsMustMatch(formik.values)])} />
        <div className={styles.btns}>
          <Button spinner={loading} type='submit' className={styles.btn} styleType='large' color='green'>
            Apply
          </Button>
          <Button href={Routes.login()} className={styles.btn} styleType='large' color='white'>
            Cancel
          </Button>
        </div>
      </Form>
    </FormikProvider>
  )
}
