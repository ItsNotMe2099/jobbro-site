import styles from './index.module.scss'
import Card from '@/components/for_pages/Common/Card'
import Validator from '@/utils/validator'
import InputField from '@/components/fields/InputField'
import {Form, FormikProvider, useFormik} from 'formik'
import {useAppContext} from '@/context/state'
import {RequestError} from '@/types/types'
import {SnackbarType} from '@/types/enums'
import AddSvg from '@/components/svg/AddSvg'
import {colors} from '@/styles/variables'
import {ManagerOwnerWrapper, useManagerOwnerContext} from '@/context/manager_owner_state'
import Spinner from '@/components/ui/Spinner'
import {useCompanyOwnerContext} from '@/context/company_owner_state'
import FormErrorScroll from '@/components/ui/FormErrorScroll'
import useTranslation from 'next-translate/useTranslation'

interface Props {

}

export interface IFormData {
  email: string
}

const TeamFormInner = (props: Props) => {
  const appContext = useAppContext()
  const managerOwnerContext = useManagerOwnerContext()
  const companyOwnerContext = useCompanyOwnerContext()
  const {t} = useTranslation()
  const handleSubmit = async (data: IFormData) => {
    try {
    await managerOwnerContext.create({...data, companyId: companyOwnerContext.company!.id} as any)
      formik.resetForm()
    } catch (err) {

      if (err instanceof RequestError) {
        appContext.showSnackbar(err.message, SnackbarType.error)
      }

    }


  }

  const initialValues = {
    email: ''
  }

  const formik = useFormik<IFormData>({
    initialValues,
    onSubmit: handleSubmit
  })
  const suffix = (managerOwnerContext.editLoading ? <div className={styles.spinner}><Spinner
    size={24}/> </div>: (formik.values.email && Validator.email(formik.values.email) === undefined ?
    <div className={styles.add} onClick={() => formik.submitForm()}><AddSvg
      color={colors.textSecondary}/></div> : undefined))
  return (
    <FormikProvider value={formik}>
      <Form className={styles.form}>
        <FormErrorScroll formik={formik} />
        <Card title={t('team_form_title')}>
          <InputField disabled={managerOwnerContext.editLoading} placeholder={t('team_form_field_email')} name='email' label={formik.values.email ? 'Email' : ''}
                      suffix={suffix}

                      validate={Validator.email}/>
        </Card>
      </Form>
    </FormikProvider>
  )
}

export default function TeamForm(props: Props) {
  return <ManagerOwnerWrapper>
    <TeamFormInner/>
  </ManagerOwnerWrapper>
}
