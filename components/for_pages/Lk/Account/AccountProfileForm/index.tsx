import styles from './index.module.scss'
import Card from '@/components/for_pages/Common/Card'
import InputField from '@/components/fields/InputField'
import { Nullable, RequestError} from '@/types/types'
import {FileUploadAcceptType, SnackbarType} from '@/types/enums'
import { Form, FormikProvider, useFormik } from 'formik'
import SwitchField from '@/components/fields/SwitchField'
import {FormikHelpers} from 'formik/dist/types'
import {useAppContext} from '@/context/state'
import {useEffect, useRef} from 'react'
import FormSaveStickyFooter from '@/components/for_pages/Common/FormSaveStickyFooter'
import FormErrorScroll from '@/components/ui/FormErrorScroll'
import {useAboutMeContext} from '@/context/aboutme_state'
import FileField from '@/components/fields/Files/FileField'
import IFile from '@/data/interfaces/IFile'
import Button from '@/components/ui/Button'
import {ICurrentUserUpdateRequest} from '@/data/interfaces/ICurrentUserUpdateRequest'

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
  const ref = useRef<Nullable<HTMLFormElement>>(null)

  const handleSubmit = async (data: IFormData, formikHelpers: FormikHelpers<IFormData>) => {
    console.log('handleSubmit')
    try {
      await aboutMeContext.update(data as ICurrentUserUpdateRequest)
      appContext.showSnackbar('Изменения сохранены', SnackbarType.success)

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

  useEffect(()=>{
    console.log(formik.values.image)
  }, [formik.values.image])


  return (
    <FormikProvider value={formik}>
      <Form ref={ref} className={styles.root}>
        <FormErrorScroll formik={formik} />
        <Card title='Details'>
            <div className={styles.wrapper}>
              <FileField
                isImage
                name='image'
                accept={[FileUploadAcceptType.Image]}
              />
              <InputField
                label='First name' name='firstName'
              />
              <InputField
                label='Last name' name='lastName'
              />
              <InputField
                label='Position' name='position'
              />
              <InputField
                disabled={true}
                label='Email' name='email'
              />
              <InputField
                disabled={true}
                label='Phone' name='phone'
              />

            </div>
          </Card>
        <Card title={<div className={styles.top}>
          <div className={styles.title}>Profile Visibility</div>
          <SwitchField name={'companyVisible'} />
        </div>}>
          <div className={styles.description}>
            Your company is showed. Setting your company to show makes your
            career site and all its job listings view to you, users, search engines and job boards.
          </div>
        </Card>

        <Card title={'Account deletion'}>
          <div className={styles.description}>
            This section allows you to permanently remove your account from our platform. If you no longer wish to use our services, you can initiate the account deletion process here. Please note that this action is irreversible and will result in the deletion of all your personal data associated with the
            account.
          </div>
        <div>
          <Button spinner={aboutMeContext.deleteLoading} className={styles.deleteButton} onClick={aboutMeContext.deleteAccount} type='submit' styleType='large' color='red'>
            Delete Account
          </Button>
        </div>
        </Card>

        <div>
        <Button onClick={appContext.logout} type='submit' styleType='large' color='white'>
          Logout
        </Button>
        </div>
        <FormSaveStickyFooter boundaryElement={`.${styles.root}`} formRef={ref} loading={aboutMeContext.editLoading}/>
      </Form>
    </FormikProvider>
  )
}
