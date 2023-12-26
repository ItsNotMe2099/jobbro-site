import InputField from '@/components/fields/InputField'
import styles from './index.module.scss'
import { Form, FormikProvider, useFormik } from 'formik'
import Validator from '@/utils/validator'
import Button from '@/components/ui/Button'
import { useState } from 'react'
import {Nullable, RequestError} from '@/types/types'
import { useAppContext } from '@/context/state'
import { SnackbarType } from '@/types/enums'
import SiteApplicationRepository from '@/data/repositories/SiteApplicationRepository'
import showToast from '@/utils/showToast'
import useTranslation from 'next-translate/useTranslation'

interface IFormData {
  name: Nullable<string>
  email: Nullable<string>
  phone: Nullable<string>
  company: Nullable<string>
}

interface Props {

}

export default function TryItForm(props: Props) {
  const { t } = useTranslation()
  const [loading, setLoading] = useState<boolean>(false)
  const appContext = useAppContext()

  const handleSubmit = async (data: IFormData) => {
    setLoading(true)
    try {
    await SiteApplicationRepository.create(data)
      showToast({title: t('toast_landing_application_sent_title'), text: t('toast_landing_application_sent_desc')})
      formik.resetForm()
    } catch (err) {
      console.error(err)
      if (err instanceof RequestError) {
        appContext.showSnackbar(err.message, SnackbarType.error)
      }

    }
    setLoading(false)
  }

  const initialValues: IFormData = {
    name: null,
    email: null,
    phone: null,
    company: null
  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  })

  return (
    <FormikProvider value={formik}>
      <Form className={styles.form}>
        <InputField lendingInput
          classNameInput={styles.input}
          placeholder={t('main_lending_try_field_name')}
          classNameInputWrapper={styles.inputWrapper}
          name='name'
          validate={Validator.required} />
        <InputField
          lendingInput
          placeholder={t('main_lending_try_field_email')}
          classNameInput={styles.input}
          classNameInputWrapper={styles.inputWrapper}
          name='email'
          validate={Validator.combine([Validator.required, Validator.email])} />
        <InputField
          placeholder={t('main_lending_try_field_phone')}
          lendingInput
          classNameInput={styles.input}
          classNameInputWrapper={styles.inputWrapper}
          format='phone'
          name='phone'
          validate={Validator.required} />
        <InputField
          placeholder={t('main_lending_try_field_company')}
          lendingInput
          classNameInput={styles.input}
          classNameInputWrapper={styles.inputWrapper}
          name='company'/>
        <Button className={styles.btn} type={'submit'} spinner={loading} color='black'>
          {t('main_lending_try_field_button_submit')}
        </Button>
      </Form>
    </FormikProvider>
  )
}
