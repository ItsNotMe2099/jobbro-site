import styles from './index.module.scss'
import Card from '@/components/for_pages/Common/Card'
import InputField from '@/components/fields/InputField'
import {DeepPartial, Nullable, RequestError} from '@/types/types'
import {SnackbarType} from '@/types/enums'
import { Form, FormikProvider, useFormik } from 'formik'
import {useCompanyOwnerContext} from '@/context/company_owner_state'
import SwitchField from '@/components/fields/SwitchField'
import {FormikHelpers} from 'formik/dist/types'
import {omit} from '@/utils/omit'
import {ICompany} from '@/data/interfaces/ICompany'
import {useAppContext} from '@/context/state'
import {useRef, useState} from 'react'
import FormSaveStickyFooter from '@/components/for_pages/Common/FormSaveStickyFooter'
import FormErrorScroll from '@/components/ui/FormErrorScroll'

interface IFormData {
  firstName: Nullable<string>
  lastName: Nullable<string>
  position: Nullable<string>
  email: Nullable<string>
  phone: Nullable<string>
  companyVisible: boolean
}
interface Props {

}

export default function AccountNotificationForm(props: Props) {
  const appContext = useAppContext()
  const companyOwnerContext = useCompanyOwnerContext()
  const [loading, setLoading] = useState(false)
  const ref = useRef<Nullable<HTMLFormElement>>(null)
  const handleSubmit = async (data: IFormData, formikHelpers: FormikHelpers<IFormData>) => {
    console.log('handleSubmit')
    try {

      const submitData: DeepPartial<ICompany> = {
        ...omit(data, ['benefits', 'images', 'country']),
        benefitsIds: data.benefits.map(i => i.id),
        countryId: data.country?.geonameid,
      } as DeepPartial<ICompany>

      if(companyOwnerContext.company){
        await companyOwnerContext.update(submitData)
      }else{
        console.log('dsdsad')
        await companyOwnerContext.create(submitData)
      }
    } catch (err) {
      console.error(err)
      if (err instanceof RequestError) {
        appContext.showSnackbar(err.message, SnackbarType.error)
      }

    }

  }

  const initialValues: IFormData = {
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
        <Card title='Details'>
            <div className={styles.wrapper}>
              <InputField
                label='First name' name='firstName'
              />
              <InputField
                label='Last name' name='lastName'
              />
              <InputField
                label='position' name='position'
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
        </Card>

        <FormSaveStickyFooter boundaryElement={`.${styles.root}`} formRef={ref} loading={companyOwnerContext.editLoading}/>
      </Form>
    </FormikProvider>
  )
}
