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

// Define a type for the Formik instance
type MyFormikType = FormikProps<IVacancyFormData>

interface Props {
  formik: MyFormikType
}

export default function JobAdDetailsForm(props: Props) {

  return (
    <div className={styles.root}>
      <Card title='Header'>
        <InputField name='name' label={'Title'}
          validate={Validator.required}
        />
      </Card>
      <Card title={<div className={styles.top}>
        <div className={styles.title}>Intro</div>
        <SwitchField name={'intro.visible'} />
      </div>}>
        <>
        {props.formik.values.intro?.visible && <RichTextField name='intro.description' />}
        </>
      </Card>
      <Card title='Details'>
        <div className={styles.wrapper}>
          <div className={styles.line}>
            <ServiceCategoryField placeholder='Category' className={styles.select} name='categoryId'  />
            <ServiceCategoryField placeholder='Sub-category' categoryId={props.formik.values.categoryId} className={styles.select} name='subCategoryId' />
          </div>
          <div className={styles.line}>
            <SelectField<Employment> placeholder='Employment Type' className={styles.select} name='employment' options={Dictionary.getEmploymentOptions()} />
            <SelectField<Workplace> placeholder='Workplace' className={styles.select} name='workplace' options={Dictionary.getWorkplaceOptions()} />
          </div>
          <OfficeField placeholder='Office' className={styles.select} name='office'  />
        </div>
      </Card>
      <Card title='Requirements'>
        <RichTextField name='requirements' />
      </Card>
      <Card title='Experience'>
        <SelectField<Experience> className={styles.select} placeholder='Select seniority level' name='experience' options={Dictionary.getExperienceOptions()} />
      </Card>
      <Card title='Skills'>
        <SkillField className={styles.select} placeholder='Search skills' name='skills' />
      </Card>
      <Card title='Tasks'>
        <RichTextField name='tasks' />
      </Card>
      <Card title='Salary'>
        <div className={styles.line}>
          <CurrencyField className={styles.select}  name='currency'  />
          <InputField className={styles.select} format={'number'} placeholder='Salary maximum' name='salaryMax' label={props.formik.values.salaryMax ? 'Salary maximum' : ''}
             />
          <InputField className={styles.select} format={'number'} placeholder='Salary minimum' name='salaryMin' label={props.formik.values.salaryMin ? 'Salary minimum' : ''}
             />
          <SelectField<SalaryType> className={styles.select} placeholder='Type' name='salaryPerYear' options={Dictionary.getSalaryTypeOptions()} />
        </div>
      </Card>
      <Card title={<div className={styles.top}>
        <div className={styles.title}>Benefits</div>
        <SwitchField name={'benefitsDescription.visible'} />
      </div>}>
        {props.formik.values.benefitsDescription?.visible ? <RichTextField name='benefitsDescription.description' /> : <></>}
      </Card>
      <Card title='Tags Benefits'>
        <BenefitField className={styles.select} placeholder='Search benefits' name='benefits' />
      </Card>
    </div>
  )
}
