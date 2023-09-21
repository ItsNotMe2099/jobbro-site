import styles from './index.module.scss'
import Card from '@/components/for_pages/Common/Card'
import InputField from '@/components/fields/InputField'
import Validator from '@/utils/validator'
import CloseBigSvg from '@/components/svg/CloseBigSvg'
import { colors } from '@/styles/variables'
import { FormikProps } from 'formik'
import SelectField from '@/components/fields/SelectField'
import { FormData } from '../..'
import RichTextField from '@/components/fields/RichTextField'

// Define a type for the Formik instance
type MyFormikType = FormikProps<FormData>

interface Props {
  formik: MyFormikType
}

export default function JobAdDetailsForm(props: Props) {

  return (
    <div className={styles.root}>
      <Card title='Header'>
        <InputField placeholder='Title' name='title' label={props.formik.values.title ? 'Title' : ''}
          labelType='in'
          validate={Validator.required}
          suffix={props.formik.values.title ?
            <CloseBigSvg className={styles.clear}
              onClick={() => props.formik.setFieldValue('title', '')} color={colors.textSecondary} /> : undefined}
        />
      </Card>
      <Card title='Details'>
        <div className={styles.wrapper}>
          <div className={styles.line}>
            <SelectField label='Category' className={styles.select} name='category' options={[]} />
            <SelectField label='Sub-category' className={styles.select} name='subCategory' options={[]} />
          </div>
          <div className={styles.line}>
            <SelectField label='Employment Type' className={styles.select} name='empType' options={[]} />
            <SelectField label='Workplace' className={styles.select} name='workplace' options={[]} />
          </div>
          <SelectField label='Office' className={styles.select} name='office' options={[]} />
        </div>
      </Card>
      <Card title='Requirements'>
        <RichTextField name='requirements' />
      </Card>
      <Card title='Experience'>
        <SelectField className={styles.select} placeholder='Select seniority level' name='experience' options={[]} />
      </Card>
      <Card title='Salary'>
        <div className={styles.line}>
          <SelectField className={styles.select} placeholder='EUR' name='salary' options={[]} />
          <InputField className={styles.select} format={'number'} placeholder='Salary maximum' name='salaryMax' label={props.formik.values.salaryMax ? 'Salary maximum' : ''}
            labelType='in' />
          <InputField className={styles.select} format={'number'} placeholder='Salary minimum' name='salaryMin' label={props.formik.values.salaryMin ? 'Salary minimum' : ''}
            labelType='in' />
          <SelectField className={styles.select} placeholder='Per Year' name='salaryPerYear' options={[]} />
        </div>
      </Card>
    </div>
  )
}
