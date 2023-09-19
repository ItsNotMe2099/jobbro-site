import InputField from '@/components/fields/InputField'
import styles from './index.module.scss'
import { Form, FormikProvider, useFormik } from 'formik'
import Validator from '@/utils/validator'
import Button from '@/components/ui/Button'
import { SnackbarType } from '@/types/enums'
import { useState } from 'react'
import { RequestError } from '@/types/types'
import { useAppContext } from '@/context/state'
import { useRouter } from 'next/router'
import { Routes } from '@/types/routes'


interface Props {

}

export default function ResetPasswordForm(props: Props) {

  const appContext = useAppContext()
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)

  const handleSubmit = async (data: { newPassword: string, confirmPassword: string }) => {
    setLoading(true)
    try {

    } catch (err) {

      if (err instanceof RequestError) {
        appContext.showSnackbar(err.message, SnackbarType.error)
      }

    }


    setLoading(false)
  }

  const initialValues = {
    newPassword: '',
    confirmPassword: ''
  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  })

  return (
    <FormikProvider value={formik}>
      <Form className={styles.form}>
        <div className={styles.title}>
          Reset pessword
        </div>
        <div className={styles.text}>
          Password will be reseted. Enter new password for your account
        </div>
        <InputField
          placeholder='New password'
          type='password'
          name='newPassword'
          label={formik.values.newPassword ? 'New password' : ''}
          labelType='in'
          obscure
          validate={Validator.requiredPassword} />
        <InputField
          placeholder='Confirm password'
          type='password'
          name='confirmPassword'
          label={formik.values.confirmPassword ? 'Confirm password' : ''}
          labelType='in'
          obscure
          validate={Validator.combine([Validator.requiredPassword, Validator.passwordsMustMatch(formik.values)])} />
        <div className={styles.btns}>
          <Button spinner={loading} type='submit' className={styles.btn} styleType='large' color='green'>
            Apply
          </Button>
          <Button href={Routes.login} className={styles.btn} styleType='large' color='white'>
            Cancel
          </Button>
        </div>
      </Form>
    </FormikProvider>
  )
}
