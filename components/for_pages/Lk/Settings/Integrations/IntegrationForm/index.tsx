import styles from './index.module.scss'
import {Form, FormikProvider, useFormik} from 'formik'
import {useAppContext} from '@/context/state'
import {DeepPartial, Nullable, RequestError} from '@/types/types'
import {SnackbarType} from '@/types/enums'
import Card from '@/components/for_pages/Common/Card'
import InputField from '@/components/fields/InputField'
import {FormikHelpers} from 'formik/dist/types'
import {IOffice} from '@/data/interfaces/IOffice'
import { useRef} from 'react'
import Validator from '@/utils/validator'
import {useRouter} from 'next/router'
import {Routes} from '@/types/routes'
import FormSaveStickyFooter from '@/components/for_pages/Common/FormSaveCancelStickyFooter'
import FormErrorScroll from '@/components/ui/FormErrorScroll'
import useTranslation from 'next-translate/useTranslation'
import showToast from '@/utils/showToast'
import {IntegrationPlatform} from '@/data/enum/IntegrationPlatform'
import {useIntegrationOwnerContext} from '@/context/integration_owner_state'
import SelectField from '@/components/fields/SelectField'
import Dictionary from '@/utils/Dictionary'
import {IIntegrationProfile} from '@/data/interfaces/IIntegrationProfile'

interface Props {

}

export interface IFormData {
  platform: Nullable<IntegrationPlatform>
  clientId: Nullable<string>
  clientSecret: Nullable<string>
}

export default function IntegrationOfficeForm(props: Props) {
  const integrationContext = useIntegrationOwnerContext()

  const appContext = useAppContext()
  const router = useRouter()
  const initialPlatform = router.query.platform as string as IntegrationPlatform
  const {t} = useTranslation()
  const ref = useRef<Nullable<HTMLFormElement>>(null)
  const handleSubmit = async (data: IFormData, formikHelpers: FormikHelpers<IFormData>) => {
   try {
      if (integrationContext.integration) {
        await integrationContext.update(data as DeepPartial<IIntegrationProfile>)
        showToast({title: t('toast_integration_edited_title', {platform: data.platform}), text: t('toast_integration_edited_desc', {platform: data.platform})})
      } else {
        await integrationContext.create({...data} as DeepPartial<IOffice>)
        showToast({title: t('toast_integration_created_title', {platform: data.platform}), text: t('toast_integration_created_desc', {platform: data.platform})})
      }
    await router.push(Routes.lkSettingsIntegrations)
    } catch (err) {

      if (err instanceof RequestError) {
        appContext.showSnackbar(err.message, SnackbarType.error)
      }

    }

  }
  const handleCancel = () => {
     router.replace(Routes.lkSettingsIntegrations)

  }
  const initialValues: IFormData = {
    platform: integrationContext.integration?.platform ?? initialPlatform ?? null,
    clientId: integrationContext.integration?.clientId ?? null,
    clientSecret: integrationContext.integration?.clientSecret ?? null,
  }

  const formik = useFormik<IFormData>({
    initialValues,
    onSubmit: handleSubmit
  })

  return (
    <FormikProvider value={formik}>
      <Form ref={ref} className={styles.root}>
        <FormErrorScroll formik={formik} />
        <Card className={styles.card} title={t('office_form_section_details')}>
          <SelectField<IntegrationPlatform> name={'platform'} label={t('integration_form_field_platform')} options={Dictionary.getIntegrationPlatformOptions(t)} validate={Validator.required}/>
          <InputField name={'clientId'} label={t('integration_form_field_client_id')} validate={Validator.required}/>
          <InputField name={'clientSecret'} label={t('integration_form_field_client_secret')} validate={Validator.required}/>
          {([IntegrationPlatform.LinkedIn, IntegrationPlatform.Indeed] as IntegrationPlatform[]).includes(formik.values.platform!) ?  <InputField name={'details.companyId'} label={t('integration_form_field_details_company_id')} validate={Validator.required}/> :<></>}

            </Card>
        <FormSaveStickyFooter boundaryElement={`.${styles.root}`} formRef={ref} onCancel={handleCancel} loading={integrationContext.editLoading}/>
      </Form>
    </FormikProvider>
  )
}
