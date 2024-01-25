import styles from './index.module.scss'
import Card from '@/components/for_pages/Common/Card'
import { Form, FormikProvider, useFormik } from 'formik'
import {Nullable, RequestError} from '@/types/types'
import { useRef } from 'react'
import FormStickyFooter from '@/components/for_pages/Common/FormStickyFooter'
import Button from '@/components/ui/Button'
import InputField from '@/components/fields/InputField'
import {AboutMeWrapper, useAboutMeContext} from '@/context/aboutme_state'
import {ICurrentUserUpdateRequest} from '@/data/interfaces/ICurrentUserUpdateRequest'
import showToast from '@/utils/showToast'
import {SnackbarType} from '@/types/enums'
import {useAppContext} from '@/context/state'
import useTranslation from 'next-translate/useTranslation'


interface IFormData {
  professionalLink: Nullable<string>
}

interface Props {
  onPreview?: () => void
  preview?: boolean
}

const SettingsFormInner = (props: Props)  => {
  const appContext = useAppContext()
  const ref = useRef<Nullable<HTMLFormElement>>(null)
  const { t } = useTranslation()
  const aboutMeContext = useAboutMeContext()
  const handleSubmit = async (data: IFormData) => {
    try {
      await aboutMeContext.update(data as ICurrentUserUpdateRequest)
      showToast({title: t('toast_account_edited_title'), text: t('toast_account_edited_desc')})
    } catch (err) {
      console.error(err)
      if (err instanceof RequestError) {
        appContext.showSnackbar(err.message, SnackbarType.error)
      }
    }
  }

  const initialValues: IFormData = {
    professionalLink: appContext.aboutMe?.professionalLink ?? null
  }

  const formik = useFormik<IFormData>({
    initialValues,
    onSubmit: handleSubmit
  })


  return (
    <FormikProvider value={formik}>
      <Form ref={ref} className={styles.root}>
        <Card>
          <div className={styles.title}>
            {t('employee_settings_field_profession_link')}
          </div>
          <InputField label={t('employee_settings_field_profession_link')} name='professionalLink' />
        </Card>
        <Card>
          <div className={styles.title}>
            {t('employee_settings_account_delete_title')}

          </div>
          <div className={styles.desc}>
            {t('employee_settings_account_delete_desc')}

          </div>
          <div className={styles.more}>
            {t('employee_settings_account_delete_show_more')}

          </div>
        </Card>
        <FormStickyFooter boundaryElement={`.${styles.root}`} formRef={ref}>
          <Button spinner={aboutMeContext.editLoading} type='submit' styleType='large' color='green'>
            {t('form_button_save')}
          </Button>
          <Button styleType='large' color='white'>
            {t('form_button_cancel')}

          </Button>
        </FormStickyFooter>
      </Form>
    </FormikProvider>
  )
}
export default function SettingsForm(){
  return <AboutMeWrapper>
    <SettingsFormInner/>
  </AboutMeWrapper>
}
