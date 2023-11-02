import styles from './index.module.scss'
import { FieldArray, Form, FormikProvider, useFormik } from 'formik'
import { FileUploadAcceptType, SnackbarType } from '@/types/enums'
import { useRef, useState } from 'react'
import { Nullable, RequestError } from '@/types/types'
import { useAppContext } from '@/context/state'
import { useRouter } from 'next/router'
import FormStickyFooter from '@/components/for_pages/Common/FormStickyFooter'
import Button from '@/components/ui/Button'
import EyeSvg from '@/components/svg/EyeSvg'
import { colors } from '@/styles/variables'
import NoEyeSvg from '@/components/svg/NoEyeSvg'
import { useVacancyOwnerContext } from '@/context/vacancy_owner_state'
import { SalaryType } from '@/data/enum/SalaryType'
import Card from '@/components/for_pages/Common/Card'
import InputField from '@/components/fields/InputField'
import SwitchField from '@/components/fields/SwitchField'
import RichTextField from '@/components/fields/RichTextField'
import Validator from '@/utils/validator'
import ServiceCategoryField from '@/components/fields/ServiceCategoryField'
import SelectField from '@/components/fields/SelectField'
import Dictionary from '@/utils/Dictionary'
import SkillField from '@/components/fields/SkillField'
import CurrencyField from '@/components/fields/CurrencyField'
import LanguageField from '@/components/fields/LanguageField'
import CloseSvg from '@/components/svg/CloseSvg'
import CountryField from '@/components/fields/CountryField'
import FileListField from '@/components/fields/Files/FileListField'

interface Props {
  onPreview?: () => void
  preview?: boolean
}

export interface IResumeFormData {
  name: Nullable<string>
  image: any
  categoryId: Nullable<number>
  subCategoryId: Nullable<number>
  firstName: Nullable<string>
  locate: Nullable<string>
  relocate: any[]
  salaryMin: Nullable<number>
  salaryMax: Nullable<number>
  salaryType: Nullable<SalaryType>
  aboutMeDescription: { description: Nullable<string>, visible: boolean }
  skillsDescription: { description: Nullable<string>, visible: boolean }
  education: any[]
  courses: any[]
  employer: any[]
  contacts: any[]
  contactsFields: { visible: boolean }
}

export default function ResumeEditForm(props: Props) {

  const appContext = useAppContext()
  const vacancyContext = useVacancyOwnerContext()
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  let ref = useRef<HTMLFormElement | null>(null)
  const handleSubmit = async (data: any) => {
    setLoading(true)
    console.log('Data', data)
    try {
      if (vacancyContext.vacancy) {

      } else {

      }

    } catch (err) {
      console.error(err)
      if (err instanceof RequestError) {
        appContext.showSnackbar(err.message, SnackbarType.error)
      }

    }
  }

  const initialValues: IResumeFormData = {
    name: null,
    image: null,
    categoryId: null,
    subCategoryId: null,
    firstName: null,
    locate: null,
    relocate: [{ label: null }],
    salaryMin: null,
    salaryMax: null,
    salaryType: null,
    aboutMeDescription: { description: null, visible: false },
    skillsDescription: { description: null, visible: false },
    education: [{ education: '' }],
    courses: [{ course: '' }],
    employer: [{
      locate: '',
      dateOfHiring: '',
      dateOfDismissal: '',
      jobTitle: '',
      desc: ''
    }],
    contacts: [{ type: null, val: null }],
    contactsFields: { visible: true }
  }

  const formik = useFormik<IResumeFormData>({
    initialValues,
    onSubmit: handleSubmit
  })

  console.log('FORMIK', formik.values)

  const handleSaveClick = async () => {


    await formik.submitForm()
  }

  return (
    <FormikProvider value={formik}>
      <Form ref={ref} className={styles.form}>
        <div className={styles.root}>
          <Card title='Specialization'>
            <div className={styles.wrapper}>
              <InputField name='name' label={'Title'}
                validate={Validator.required}
              />
              <div className={styles.line}>
                <ServiceCategoryField placeholder='Category' className={styles.select} name='categoryId' />
                <ServiceCategoryField placeholder='Sub-category' categoryId={formik.values.categoryId} className={styles.select} name='subCategoryId' />
              </div>
            </div>
          </Card>
          <Card title='Details'>
            <div className={styles.wrapper}>
              <FileListField
                className={styles.file}
                isImage
                name='image'
                accept={[FileUploadAcceptType.Image]}
                dropzoneTitle=
                {
                  <div className={styles.text}>
                    Drag & drop image upload<br />You can use 1 images smaller than 3.5MB and at least 752px by
                    480px.</div>
                }
              />
              <InputField name='firstName' label={'Name'}
                validate={Validator.required}
              />
              <div className={styles.line}>
                <CountryField label='Locate' className={styles.select} name='locate' />
                <SelectField
                  className={styles.select}
                  label='Relocate' name={'relocate'}
                  options={[{ label: 'Not ready', value: 'no' }, { label: 'Ready', value: 'yes' }]} />
              </div>
            </div>
          </Card>
          <Card title='Salary'>
            <div className={styles.line}>
              <CurrencyField className={styles.select} placeholder='EUR' name='salary' />
              <InputField className={styles.select} format={'number'} placeholder='Salary maximum' name='salaryMax' label={formik.values.salaryMax ? 'Salary maximum' : ''}
              />
              <InputField className={styles.select} format={'number'} placeholder='Salary minimum' name='salaryMin' label={formik.values.salaryMin ? 'Salary minimum' : ''}
              />
              <SelectField<SalaryType> className={styles.select} placeholder='Type' name='salaryPerYear' options={Dictionary.getSalaryTypeOptions()} />
            </div>
          </Card>
          <Card title={<div className={styles.top}>
            <div className={styles.title}>Contacts</div>
            <SwitchField name={'contactsFields.visible'} />
          </div>}>
            {formik.values.contactsFields.visible && <FieldArray name={'contacts'}>
              {arrayHelpers => (
                <div className={styles.root} data-field={'contacts'}>
                  <div className={styles.fields}>
                    {(formik.values.contacts ?? []).map((i, index) =>
                      <div className={styles.line} key={index}>
                        <SelectField
                          className={styles.select}
                          label='Type' name={`contacts[${index}].type`}
                          options={[{ label: 'Email', value: 'email' }, { label: 'Phone', value: 'phone' }]} />
                        <InputField
                          label={formik.values.contacts[index].type === 'email' ? 'Email' : 'Phone'}
                          name={`contacts[${index}].val`}
                          validate={formik.values.contacts[index].type === 'email' ? Validator.email : Validator.phone} />
                        <div>
                          <CloseSvg
                            className={styles.remove}
                            onClick={() => arrayHelpers.remove(index)} color={colors.textSecondary} />
                        </div>
                      </div>)}
                    <div onClick={() => arrayHelpers.push({ type: null, val: null })} className={styles.add}>
                      Add Type
                    </div>
                  </div>
                </div>)}
            </FieldArray>}
          </Card>
          <Card title={<div className={styles.top}>
            <div className={styles.title}>About me</div>
            <SwitchField name={'aboutMeDescription.visible'} />
          </div>}>
            {formik.values.aboutMeDescription?.visible ? <RichTextField name='aboutMeDescription.description' /> : <></>}
          </Card>
          <Card title={'Education'}>
            <FieldArray name={'education'}>
              {arrayHelpers => (
                <div className={styles.root} data-field={'education'}>
                  <div className={styles.fields}>
                    {(formik.values.education ?? []).map((i, index) =>
                      <InputField key={index} name={`education[${index}].education`} label={'Title'}
                        suffix={index > 0 ?
                          <CloseSvg
                            className={styles.remove}
                            onClick={() => arrayHelpers.remove(index)} color={colors.textSecondary} /> : ''} />
                    )}
                  </div>
                  <div onClick={() => arrayHelpers.push({ education: '' })} className={styles.add}>
                    Add University
                  </div>
                </div>
              )}
            </FieldArray>
          </Card>
          <Card title={'Courses'}>
            <FieldArray name={'courses'}>
              {arrayHelpers => (
                <div className={styles.root} data-field={'courses'}>
                  <div className={styles.fields}>
                    {(formik.values.courses ?? []).map((i, index) =>
                      <InputField key={index} name={`courses[${index}].course`} label={'Title'}
                        suffix={index > 0 ?
                          <CloseSvg
                            className={styles.remove}
                            onClick={() => arrayHelpers.remove(index)} color={colors.textSecondary} /> : ''} />
                    )}
                  </div>
                  <div onClick={() => arrayHelpers.push({ course: '' })} className={styles.add}>
                    Add Courses
                  </div>
                </div>
              )}
            </FieldArray>
          </Card>
          <Card title={<div className={styles.top}>
            <div className={styles.title}>Skills</div>
            <SwitchField name={'skillsDescription.visible'} />
          </div>}>
            {formik.values.skillsDescription?.visible ? <RichTextField name='skillsDescription.description' /> : <></>}
          </Card>
          <Card title='Skills Tags'>
            <SkillField className={styles.select} placeholder='Search skills' name='skills' />
          </Card>
          <Card title='Language Tags'>
            <LanguageField className={styles.select} placeholder='Search tags' name='skills' />
          </Card>
          <Card title={'Professional Experience'}>
            <FieldArray name={'employer'}>
              {arrayHelpers => (
                <div className={styles.root} data-field={'employer'}>
                  <div className={styles.fields}>
                    <SelectField placeholder='Employer name' className={styles.select} name='employer' options={[]} />
                    <CountryField placeholder='Locate' className={styles.select} name='employer.locate' />
                    <div className={styles.line}>
                      <InputField name={'employer.dateOfHiring'} label={'Date of hiring'} />
                      <InputField name={'employer.dateOfDismissal'} label={'Date of dismissal'} />
                    </div>
                    <InputField name={'employer.jobTitle'} label={'Job title'} />
                    <RichTextField name='employer.desc' />
                  </div>
                  <div onClick={() => arrayHelpers.push({
                    locate: '',
                    dateOfHiring: '',
                    dateOfDismissal: '',
                    jobTitle: '',
                    desc: ''
                  })} className={styles.add}>
                    Add Employer
                  </div>
                </div>
              )}
            </FieldArray>

          </Card>
        </div>
        <FormStickyFooter boundaryElement={`.${styles.form}`} formRef={ref}>
          <>
            <Button onClick={handleSaveClick} type={'button'} styleType='large' color='green'>
              {'Save'}
            </Button>
            <Button href={'/profile'} type={'button'} styleType='large' color='white'>
              {'Cancel'}
            </Button>
            <div className={styles.preview} onClick={props.onPreview}>
              {!props.preview ? <EyeSvg color={colors.green} className={styles.eye} />
                :
                <NoEyeSvg color={colors.green} className={styles.eye} />
              }
              {!props.preview ? <div className={styles.text}>Preview</div>
                :
                <div className={styles.text}>Close Preview Mode</div>
              }
            </div>
          </>
        </FormStickyFooter>
      </Form>
    </FormikProvider>
  )
}
