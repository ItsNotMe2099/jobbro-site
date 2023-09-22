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
import Switch from '@/components/ui/Switch'
import { useState } from 'react'
import InputSearch from '@/components/ui/InputSearch'
import ItemWithText from '@/components/for_pages/Common/ItemWithText'

// Define a type for the Formik instance
type MyFormikType = FormikProps<FormData>

interface Props {
  formik: MyFormikType
}

export default function JobAdDetailsForm(props: Props) {

  const [intro, setIntro] = useState<boolean>(false)
  const [benefits, setBenefits] = useState<boolean>(false)

  const [page, setPage] = useState<number>(1)
  const [value, setValue] = useState<string>('')

  const searchRequest = async (value: string) => {
    setValue(value)
    await setPage(1)
    // fetch func here
  }

  const handleEnterSkillsClick = (value: string) => {
    const val = { label: value }
    props.formik.values.skills.push(val)
    props.formik.setFieldValue('skills', props.formik.values.skills)
  }

  const handleRemoveSkill = (value: string) => {
    console.log('CLICK')
    const val = { label: value }
    const updatedSkills = props.formik.values.skills.filter(skill => skill.label !== val.label)
    props.formik.setFieldValue('skills', updatedSkills)
  }

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
      <Card title={<div className={styles.top}>
        <div className={styles.title}>Intro</div>
        <Switch checked={intro} onChange={() => setIntro(!intro)} />
      </div>}>
        {intro ? <RichTextField name='intro' /> : <></>}
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
      <Card title='Skills'>
        <div className={styles.skills}>
          {props.formik.values.skills.map((i, index) =>
            <ItemWithText
              onRemove={() => handleRemoveSkill(i.label)}
              className={styles.skill}
              removable
              text={i.label}
              key={index} />
          )}
        </div>
        <InputSearch onEnterClick={(value) => handleEnterSkillsClick(value)} label='Search tags' searchRequest={(value) => searchRequest(value)} placeholder='Search tags' />
      </Card>
      <Card title='Tasks'>
        <RichTextField name='tasks' />
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
      <Card title={<div className={styles.top}>
        <div className={styles.title}>Benefits</div>
        <Switch checked={benefits} onChange={() => setBenefits(!benefits)} />
      </div>}>
        {benefits ? <RichTextField name='benefits' /> : <></>}
      </Card>
    </div>
  )
}
