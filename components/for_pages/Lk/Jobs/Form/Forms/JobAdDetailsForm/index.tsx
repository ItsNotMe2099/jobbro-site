import styles from './index.module.scss'
import Card from '@/components/for_pages/Common/Card'
import InputField from '@/components/fields/InputField'
import Validator from '@/utils/validator'
import {FormikProps} from 'formik'
import SelectField from '@/components/fields/SelectField'
import RichTextField from '@/components/fields/RichTextField'
import Dictionary from '@/utils/Dictionary'
import {SalaryType} from '@/data/enum/SalaryType'
import {Experience, ExperienceDuration} from '@/data/enum/Experience'
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
import {IVacancyFormData, VacancyFormSection} from '@/types/form_data/IVacancyFormData'
import JobAiSectionActions from '@/components/for_pages/Lk/Jobs/Form/JobAiSectionActions'

// Define a type for the Formik instance
type MyFormikType = FormikProps<IVacancyFormData>

interface Props {
  formik: MyFormikType,
  locked: VacancyFormSection[]
  onClickLock: (section: VacancyFormSection) => void
  onClickRefresh: (section: VacancyFormSection) => void
  fromAi?: boolean
}

export default function JobAdDetailsForm(props: Props) {
  const {locked} = props
  const {t} = useTranslation()
  return (
    <div className={styles.root}>
      <Card title={t('job_form_tab_details_section_header')} actions={props.fromAi && <JobAiSectionActions isLocked={locked.includes(VacancyFormSection.Header)} onClickLock={() => props.onClickLock(VacancyFormSection.Header)} onClickRefresh={() => props.onClickRefresh(VacancyFormSection.Header)}/>}>
        <InputField name='name' label={t('job_form_tab_details_field_title')}
          validate={Validator.required}
        />
      </Card>
      <Card title={<div className={styles.top}>
        <div className={styles.title}>{t('job_form_tab_details_section_intro')}</div>
        <SwitchField name={'intro.visible'} />
      </div>} actions={props.fromAi && <JobAiSectionActions isLocked={locked.includes(VacancyFormSection.Intro)} onClickLock={() => props.onClickLock(VacancyFormSection.Intro)} onClickRefresh={() => props.onClickRefresh(VacancyFormSection.Intro)}/>}>
        <>
        {props.formik.values.intro?.visible && <RichTextField name='intro.description' />}
        </>
      </Card>
      <Card title={t('job_form_tab_details_section_details')} actions={props.fromAi && <JobAiSectionActions isLocked={locked.includes(VacancyFormSection.Details)} onClickLock={() => props.onClickLock(VacancyFormSection.Details)} onClickRefresh={() => props.onClickRefresh(VacancyFormSection.Details)}/>}>
        <div className={styles.wrapper}>
          <div className={styles.line}>
            <ServiceCategoryField label={t('job_form_tab_details_field_category')} className={styles.select} name='categoryId' onChange={() => props.formik.setFieldValue('subCategoryId', null)}  />
            <ServiceCategoryField label={t('job_form_tab_details_field_sub-category')} categoryId={props.formik.values.categoryId} className={styles.select} name='subCategoryId' />
          </div>
          <div className={styles.line}>
            <SelectField<Employment> label={t('job_form_tab_details_field_employment')} className={styles.select} name='employment' options={Dictionary.getEmploymentOptions(t)} resettable={true}/>
            <SelectField<Workplace> label={t('job_form_tab_details_field_workplace')} className={styles.select} name='workplace' options={Dictionary.getWorkplaceOptions(t)} resettable={true}/>
          </div>
          <div className={styles.line}>
            <SelectField<ExperienceDuration> label={t('job_form_tab_details_field_experience_duration')} className={styles.select} name='experienceDuration' resettable={true} options={Dictionary.getExperienceDurationOptions(t)} />
            <OfficeField placeholder={t('job_form_tab_details_field_office')} className={styles.select} name='office' resettable={true} />
          </div>
         </div>
      </Card>
      <Card title={t('job_form_tab_details_section_requirements')} actions={props.fromAi && <JobAiSectionActions isLocked={locked.includes(VacancyFormSection.Requirements)} onClickLock={() => props.onClickLock(VacancyFormSection.Requirements)} onClickRefresh={() => props.onClickRefresh(VacancyFormSection.Requirements)}/>}>
        <RichTextField name='requirements' />
      </Card>
      <Card title='Experience' actions={props.fromAi && <JobAiSectionActions isLocked={locked.includes(VacancyFormSection.Experience)} onClickLock={() => props.onClickLock(VacancyFormSection.Experience)} onClickRefresh={() => props.onClickRefresh(VacancyFormSection.Experience)}/>}>
        <SelectField<Experience> className={styles.select} placeholder={t('job_form_tab_details_field_experience_ph')} name='experience' options={Dictionary.getExperienceOptions(t)} />
      </Card>
      <Card title={t('job_form_tab_details_section_languages')} actions={props.fromAi && <JobAiSectionActions isLocked={locked.includes(VacancyFormSection.LanguageTags)} onClickLock={() => props.onClickLock(VacancyFormSection.LanguageTags)} onClickRefresh={() => props.onClickRefresh(VacancyFormSection.LanguageTags)}/>}>
        <LanguagesField name='languageKnowledges'/>
      </Card>
      <Card title={t('job_form_tab_details_section_skills')} actions={props.fromAi && <JobAiSectionActions isLocked={locked.includes(VacancyFormSection.Skills)} onClickLock={() => props.onClickLock(VacancyFormSection.Skills)} onClickRefresh={() => props.onClickRefresh(VacancyFormSection.Skills)}/>}>
        <SkillField className={styles.select} placeholder={t('job_form_tab_details_field_skills_ph')} name='skills' />
      </Card>
      <Card title={t('job_form_tab_details_section_tasks')} actions={props.fromAi && <JobAiSectionActions isLocked={locked.includes(VacancyFormSection.Tasks)} onClickLock={() => props.onClickLock(VacancyFormSection.Tasks)} onClickRefresh={() => props.onClickRefresh(VacancyFormSection.Tasks)}/>}>
        <RichTextField name='tasks' />
      </Card>
      <Card title={t('job_form_tab_details_section_salary')} actions={props.fromAi && <JobAiSectionActions isLocked={locked.includes(VacancyFormSection.Salary)} onClickLock={() => props.onClickLock(VacancyFormSection.Salary)} onClickRefresh={() => props.onClickRefresh(VacancyFormSection.Salary)}/>}>
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
      </div>} actions={props.fromAi && <JobAiSectionActions isLocked={locked.includes(VacancyFormSection.Benefits)} onClickLock={() => props.onClickLock(VacancyFormSection.Benefits)} onClickRefresh={() => props.onClickRefresh(VacancyFormSection.Benefits)}/>}>
        {props.formik.values.benefitsDescription?.visible ? <RichTextField name='benefitsDescription.description' /> : <></>}
      </Card>
      <Card title={t('job_form_tab_details_section_tags_benefits')} actions={props.fromAi && <JobAiSectionActions isLocked={locked.includes(VacancyFormSection.TagsBenefits)} onClickLock={() => props.onClickLock(VacancyFormSection.TagsBenefits)} onClickRefresh={() => props.onClickRefresh(VacancyFormSection.TagsBenefits)}/>}>
        <BenefitField className={styles.select} placeholder={t('job_form_tab_details_field_benefits_ph')} name='benefits' />
      </Card>
    </div>
  )
}
