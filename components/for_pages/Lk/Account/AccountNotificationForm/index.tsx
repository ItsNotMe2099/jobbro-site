import styles from './index.module.scss'
import Card from '@/components/for_pages/Common/Card'
import InputField from '@/components/fields/InputField'
import { Nullable, RequestError} from '@/types/types'
import {SnackbarType} from '@/types/enums'
import { Form, FormikProvider, useFormik } from 'formik'
import {useCompanyOwnerContext} from '@/context/company_owner_state'
import SwitchField from '@/components/fields/SwitchField'
import {FormikHelpers} from 'formik/dist/types'
import {useAppContext} from '@/context/state'
import {useRef, useState} from 'react'
import FormSaveStickyFooter from '@/components/for_pages/Common/FormSaveStickyFooter'
import FormErrorScroll from '@/components/ui/FormErrorScroll'

interface IFormData {

}
interface Props {

}

export default function AccountNotificationForm(props: Props) {
  const appContext = useAppContext()
  const companyOwnerContext = useCompanyOwnerContext()
  const [loading, setLoading] = useState(false)
  const ref = useRef<Nullable<HTMLFormElement>>(null)
  const handleSubmit = async (data: IFormData, formikHelpers: FormikHelpers<IFormData>) => {
    try {


    } catch (err) {
      console.error(err)
      if (err instanceof RequestError) {
        appContext.showSnackbar(err.message, SnackbarType.error)
      }

    }

  }

  const initialValues: IFormData = {

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
