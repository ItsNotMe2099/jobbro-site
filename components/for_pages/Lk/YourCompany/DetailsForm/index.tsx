import styles from 'components/for_pages/Lk/YourCompany/DetailsForm/index.module.scss'
import Card from '@/components/for_pages/Common/Card'
import InputField from '@/components/fields/InputField'
import SelectField from '@/components/fields/SelectField'
import RichTextField from '@/components/fields/RichTextField'
import {DeepPartial, Nullable, RequestError} from '@/types/types'
import {FileUploadAcceptType, SnackbarType} from '@/types/enums'
import { Form, FormikProvider, useFormik } from 'formik'
import {IBenefit} from '@/data/interfaces/IBenefit'
import IFile from '@/data/interfaces/IFile'
import {useCompanyOwnerContext} from '@/context/company_owner_state'
import SwitchField from '@/components/fields/SwitchField'
import {FormikHelpers} from 'formik/dist/types'
import {omit} from '@/utils/omit'
import {ICompany} from '@/data/interfaces/ICompany'
import {useAppContext} from '@/context/state'
import {useRef} from 'react'
import CountryField from '@/components/fields/CountryField'
import FormSaveStickyFooter from '@/components/for_pages/Common/FormSaveStickyFooter'
import {IGeoName} from '@/data/interfaces/ILocation'
import Dictionary from '@/utils/Dictionary'
import ServiceCategoryField from '@/components/fields/ServiceCategoryField'
import FormErrorScroll from '@/components/ui/FormErrorScroll'
import useTranslation from 'next-translate/useTranslation'
import showToast from '@/utils/showToast'
import FileField from '@/components/fields/Files/FileField'
import Validator from '@/utils/validator'
import AddImageHorSvg from '@/components/svg/AddImageHorSvg'

interface IFormData {
  logo: Nullable<IFile>
  name: Nullable<string>
  url: Nullable<string>
  employeesCount: Nullable<number>
  industryId: Nullable<number>
  country: Nullable<IGeoName>
  about: {description: Nullable<string>, visible: boolean}
  mission: {description: Nullable<string>, visible: boolean}
  culture: {description: Nullable<string>, visible: boolean}
  advantages: {description: Nullable<string>, visible: boolean}
  benefits: IBenefit[]
  domain: Nullable<string>
  images: IFile[]
}
interface Props {

}

export default function CompanyDetailsForm(props: Props) {
  const appContext = useAppContext()
  const companyOwnerContext = useCompanyOwnerContext()
  const {t} = useTranslation()
  const ref = useRef<Nullable<HTMLFormElement>>(null)
  const handleSubmit = async (data: IFormData, formikHelpers: FormikHelpers<IFormData>) => {
    try {

      const submitData: DeepPartial<ICompany> = {
        ...omit(data, ['benefits', 'images', 'country']),
        benefitsIds: data.benefits.map(i => i.id),
        countryId: data.country?.geonameid,
      } as DeepPartial<ICompany>

      if(companyOwnerContext.company){
        await companyOwnerContext.update(submitData)
        showToast({title: t('toast_company_details_edited_title'), text: t('toast_company_details_edited_desc')})

      }else{
        await companyOwnerContext.create(submitData)
        showToast({title: t('toast_company_created_title'), text: t('toast_company_created_desc')})

      }
    } catch (err) {
      console.error(err)
      if (err instanceof RequestError) {
        appContext.showSnackbar(err.message, SnackbarType.error)
      }

    }

  }

  const initialValues: IFormData = {
    logo: companyOwnerContext?.company?.logo ?? null,
    name: companyOwnerContext.company?.name ?? '',
    url: companyOwnerContext.company?.url ?? '',
    employeesCount: companyOwnerContext.company?.employeesCount ?? null,
    industryId: companyOwnerContext.company?.industryId ?? null,
    country: companyOwnerContext.company?.country ?? null,
    about: companyOwnerContext.company?.about ?? {description: null, visible: false},
    mission: companyOwnerContext.company?.mission ?? {description: null, visible: false},
    culture: companyOwnerContext.company?.culture ?? {description: null, visible: false},
    advantages: companyOwnerContext.company?.advantages ?? {description: null, visible: false},
    benefits: companyOwnerContext.company?.benefits ?? [],
    domain: companyOwnerContext.company?.domain ?? null,
    images: companyOwnerContext.company?.images ?? [],
  }

  const formik = useFormik<IFormData>({
    initialValues,
    onSubmit: handleSubmit
  })
  return (
    <FormikProvider value={formik}>
      <Form ref={ref} className={styles.root}>
        <FormErrorScroll formik={formik} />
        <Card className={styles.logoCard}>
          <FileField
            isImage
            name='logo'
            icon={<div className={styles.logoIcon}>
              <AddImageHorSvg className={styles.icon} />
              <div className={styles.logoIconLabel}>Add logo</div>
            </div>}
            dropZoneClassName={styles.logoDropZone}
            dropZoneStyle={'row'}
            description={t('company_details_form_field_logo')}
            accept={[FileUploadAcceptType.Image]}
            validate={Validator.required}
          />
        </Card>
        <Card title={t('company_details_form_section_details')}>
            <div className={styles.wrapper}>

              <InputField
                className={styles.select}
                label={t('company_details_form_field_name')} name='name'
                />
              <InputField
                className={styles.select}
                label={t('company_details_form_field_website')} name='url'
                />
              <SelectField<number> label={t('company_details_form_field_employees-num')} className={styles.select} name='employeesCount'
                           options={Dictionary.getEmployeeCountOptions()}/>
              <ServiceCategoryField label={t('company_details_form_field_industry')} className={styles.select} name='industryId' />
              <CountryField placeholder={t('company_details_form_field_country')} className={styles.select} name='country'/>
            </div>
          </Card>
          <Card title={<div className={styles.top}>
            <div className={styles.title}>{t('company_details_form_section_about')}</div>
            <SwitchField name={'about.visible'}/>
          </div>}>
            {formik.values.about.visible && <RichTextField name='about.description'/>}

          </Card>
          <Card title={<div className={styles.top}>
            <div className={styles.title}>{t('company_details_form_section_mission')}</div>
            <SwitchField name={'mission.visible'}/>
          </div>}>
            {formik.values.mission.visible && <RichTextField name='mission.description'/>}
          </Card>
          <Card title={<div className={styles.top}>
            <div className={styles.title}>{t('company_details_form_section_culture')}</div>
            <SwitchField name={'culture.visible'}/>
          </div>}>
            {formik.values.culture.visible && <RichTextField name='culture.description'/>}
          </Card>
          <Card title={<div className={styles.top}>
            <div className={styles.title}>{t('company_details_form_section_advantages')}</div>
            <SwitchField name={'advantages.visible'}/>
          </div>}>
            {formik.values.advantages.visible && <RichTextField name='advantages.description'/>}
          </Card>
        <FormSaveStickyFooter boundaryElement={`.${styles.root}`} formRef={ref} loading={companyOwnerContext.editLoading}/>
      </Form>
    </FormikProvider>
  )
}
