import styles from './index.module.scss'

import Card from '@/components/for_pages/Common/Card'
import InputField from '@/components/fields/InputField'
import { Nullable, RequestError} from '@/types/types'
import {FileUploadAcceptType, SnackbarType} from '@/types/enums'
import { Form, FormikProvider, useFormik } from 'formik'
import {FormikHelpers} from 'formik/dist/types'
import {useAppContext} from '@/context/state'
import { useRef} from 'react'
import FormSaveStickyFooter from '@/components/for_pages/Common/FormSaveStickyFooter'
import FormErrorScroll from '@/components/ui/FormErrorScroll'
import {useAboutMeContext} from '@/context/aboutme_state'
import FileField from '@/components/fields/Files/FileField'
import IFile from '@/data/interfaces/IFile'
import Button from '@/components/ui/Button'
import {ICurrentUserUpdateRequest} from '@/data/interfaces/ICurrentUserUpdateRequest'
import useTranslation from 'next-translate/useTranslation'
import Validator from '@/utils/validator'
import showToast from '@/utils/showToast'
import {Routes} from '@/types/routes'
import {useRouter} from 'next/router'

interface IFormData {
  image: Nullable<IFile>
  firstName: Nullable<string>
  lastName: Nullable<string>
  position: Nullable<string>
  email: Nullable<string>
  phone: Nullable<string>
  companyVisible: boolean
}
interface Props {

}

export default function AccountProfileForm(props: Props) {
  const appContext = useAppContext()
  const aboutMeContext = useAboutMeContext()
  const router = useRouter()
  const ref = useRef<Nullable<HTMLFormElement>>(null)
  const { t } = useTranslation()
  const handleSubmit = async (data: IFormData, formikHelpers: FormikHelpers<IFormData>) => {

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
    image: appContext.aboutMe?.image ?? null,
    firstName: appContext.aboutMe?.firstName ?? '',
    lastName:  appContext.aboutMe?.lastName ?? '',
    position: appContext.aboutMe?.position  ?? null,
    email: appContext.aboutMe?.email  ?? null,
    phone: appContext.aboutMe?.phone  ?? null,
    companyVisible: false,
  }

  const formik = useFormik<IFormData>({
    initialValues,
    onSubmit: handleSubmit
  })

  return (
    <FormikProvider value={formik}>
      <Form ref={ref} className={styles.root}>
        <FormErrorScroll formik={formik} />
        <Card title={t('account_profile_section_details')}>
            <div className={styles.wrapper}>
              <FileField
                isImage
                name='image'
                withCrop
                dropZoneStyle={'row'}
                accept={[FileUploadAcceptType.Image]}
              />
              <InputField
                label={t('account_profile_field_first_name')} name='firstName'
              />
              <InputField
                label={t('account_profile_field_last_name')} name='lastName'
              />
              <InputField
                label={t('account_profile_field_position')} name='position'
              />
              <InputField
                disabled={true}

                label={t('account_profile_field_email')} name='email' validate={Validator.email}
              />
              <InputField format={'phone'}
                label={t('account_profile_field_phone')} name='phone'
              />

            </div>
          </Card>
        {/*<Card title={<div className={styles.top}>
          <div className={styles.title}>Profile Visibility</div>
          <SwitchField name={'companyVisible'} />
        </div>}>
          <div className={styles.description}>
            Your company is showed. Setting your company to show makes your
            career site and all its job listings view to you, users, search engines and job boards.
          </div>
        </Card>*/}

        <Card title=   {t('account_profile_section_delete')}>
          <div className={styles.description}>
            {t('account_profile_delete_desc')}
          </div>
        <div>
          <Button spinner={aboutMeContext.deleteLoading} className={styles.deleteButton} onClick={aboutMeContext.deleteAccount} type='submit' styleType='large' color='red'>
            {t('account_profile_button_delete')}
          </Button>
        </div>
        </Card>

        <div>
        <Button onClick={() => {
          appContext.logout()
          setTimeout(() => {
            router.push(Routes.login())
          }, 100)
        }} type='submit' styleType='large' color='white'>
          {t('account_profile_button_logout')}
        </Button>
        </div>
        <FormSaveStickyFooter boundaryElement={`.${styles.root}`} formRef={ref} loading={aboutMeContext.editLoading}/>
      </Form>
    </FormikProvider>
  )
}
