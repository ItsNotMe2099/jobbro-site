import styles from './index.module.scss'
import Card from '@/components/for_pages/Common/Card'
import InputField from '@/components/fields/InputField'
import Validator from '@/utils/validator'
import { FormikProps } from 'formik'
import SelectField from '@/components/fields/SelectField'
import { IVacancyFormData} from '../..'
import RichTextField from '@/components/fields/RichTextField'
import Dictionary from '@/utils/Dictionary'
import {SalaryType} from '@/data/enum/SalaryType'
import {Experience} from '@/data/enum/Experience'
import {Workplace} from '@/data/enum/Workplace'
import {Employment} from '@/data/enum/Employment'
import OfficeField from '@/components/fields/OfficeField'
import ServiceCategoryField from '@/components/fields/ServiceCategoryField'
import SwitchField from '@/components/fields/SwitchField'
import CurrencyField from '@/components/fields/CurrencyField'
import SkillField from '@/components/fields/SkillField'
import BenefitField from '@/components/fields/BenefitField'
import useTranslation from 'next-translate/useTranslation'
import LanguagesField from '@/components/fields/LanguagesField'

// Define a type for the Formik instance
type MyFormikType = FormikProps<IVacancyFormData>

interface Props {
  formik: MyFormikType
}

export default function JobAdDetailsForm(props: Props) {
  const {t} = useTranslation()
  return (
    <div className={styles.root}>
      <Card title={t('job_form_tab_details_section_header')}>
        <InputField name='name' label={t('job_form_tab_details_field_title')}
          validate={Validator.required}
        />
      </Card>
      <Card title={<div className={styles.top}>
        <div className={styles.title}>{t('job_form_tab_details_section_intro')}</div>
        <SwitchField name={'intro.visible'} />
      </div>}>
        <>
        {props.formik.values.intro?.visible && <RichTextField name='intro.description' />}
        </>
      </Card>
      <Card title={t('job_form_tab_details_section_details')}>
        <div className={styles.wrapper}>
          <div className={styles.line}>
            <ServiceCategoryField label={t('job_form_tab_details_field_category')} className={styles.select} name='categoryId' onChange={() => props.formik.setFieldValue('subCategoryId', null)}  />
            <ServiceCategoryField label={t('job_form_tab_details_field_sub-category')} categoryId={props.formik.values.categoryId} className={styles.select} name='subCategoryId' />
          </div>
          <div className={styles.line}>
            <SelectField<Employment> label={t('job_form_tab_details_field_employment')} className={styles.select} name='employment' options={Dictionary.getEmploymentOptions(t)} />
            <SelectField<Workplace> label={t('job_form_tab_details_field_workplace')} className={styles.select} name='workplace' options={Dictionary.getWorkplaceOptions(t)} />
          </div>
          <OfficeField placeholder={t('job_form_tab_details_field_office')} className={styles.select} name='office'  />
        </div>
      </Card>
      <Card title={t('job_form_tab_details_section_requirements')}>
        <RichTextField name='requirements' />
      </Card>
      <Card title='Experience'>
        <SelectField<Experience> className={styles.select} placeholder={t('job_form_tab_details_field_experience_ph')} name='experience' options={Dictionary.getExperienceOptions(t)} />
      </Card>
      <Card title={'Languages Tags'}>
        <LanguagesField name='languageKnowledges'/>
      </Card>
      <Card title={t('job_form_tab_details_section_skills')}>
        <SkillField className={styles.select} placeholder={t('job_form_tab_details_field_skills_ph')} name='skills' />
      </Card>
      <Card title={t('job_form_tab_details_section_tasks')}>
        <RichTextField name='tasks' />
      </Card>
      <Card title={t('job_form_tab_details_section_salary')}>
        <div className={styles.line}>
          <CurrencyField className={styles.select}  name='currency'  />
          <InputField className={styles.select} format={'number'} label={t('job_form_tab_details_field_salary_max')} name='salaryMax'/>
          <InputField className={styles.select} format={'number'} label={t('job_form_tab_details_field_salary_min')} name='salaryMin'/>
          <SelectField<SalaryType> className={styles.select} placeholder={t('job_form_tab_details_field_salary_type')} name='salaryType' options={Dictionary.getSalaryTypeOptions(t)} />
        </div>
      </Card>
      <Card title={<div className={styles.top}>
        <div className={styles.title}>{t('job_form_tab_details_section_benefits')}</div>
        <SwitchField name={'benefitsDescription.visible'} />
      </div>}>
        {props.formik.values.benefitsDescription?.visible ? <RichTextField name='benefitsDescription.description' /> : <></>}
      </Card>
      <Card title={t('job_form_tab_details_section_tags_benefits')}>
        <BenefitField className={styles.select} placeholder={t('job_form_tab_details_field_benefits_ph')} name='benefits' />
      </Card>
    </div>
  )
}
