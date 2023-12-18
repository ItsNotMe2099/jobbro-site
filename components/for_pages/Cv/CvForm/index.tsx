import styles from 'components/for_pages/Cv/CvForm/index.module.scss'
import {FieldArray, Form, FormikProvider, useFormik} from 'formik'
import {FileUploadAcceptType, SnackbarType} from '@/types/enums'
import {useRef} from 'react'
import {DeepPartial, Nullable, RequestError} from '@/types/types'
import {useAppContext} from '@/context/state'
import FormStickyFooter from '@/components/for_pages/Common/FormStickyFooter'
import Button from '@/components/ui/Button'
import EyeSvg from '@/components/svg/EyeSvg'
import {colors} from '@/styles/variables'
import NoEyeSvg from '@/components/svg/NoEyeSvg'
import {SalaryType} from '@/data/enum/SalaryType'
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
import IFile from '@/data/interfaces/IFile'
import {IGeoName} from '@/data/interfaces/ILocation'
import {Relocation} from '@/data/enum/Relocation'
import {CoursesInfo, EducationInfo, ExperienceInfo} from '@/data/interfaces/Common'
import {CvContactPersonType, ICV, ICvContactPerson, ILanguageKnowledge} from '@/data/interfaces/ICV'
import CityField from '@/components/fields/CityField'
import DateYearMonthField from '@/components/fields/DateYearMonthField'
import IconButton from '@/components/ui/IconButton'
import classNames from 'classnames'
import {omit} from '@/utils/omit'
import {format, parse} from 'date-fns'
import {Routes} from '@/types/routes'
import FormErrorScroll from '@/components/ui/FormErrorScroll'
import FileField from '@/components/fields/Files/FileField'

interface Props {
  onPreview?: () => void
  preview?: boolean
  onSubmit: (data: DeepPartial<ICV>) => void
  loading?: boolean
  cv?: ICV | undefined | null
}

interface ExperienceInfoFormData extends ExperienceInfo{
  fromMonthYear: Nullable<string>,
  toMonthYear: Nullable<string>,
}
interface ICvContactPersonForm extends ICvContactPerson {
  type: CvContactPersonType
}

export interface ICvFormData {
  title: Nullable<string>
  image: Nullable<IFile>
  categoryId: Nullable<number>
  subCategoryId: Nullable<number>
  name: Nullable<string>
  country: Nullable<IGeoName>
  city: Nullable<IGeoName>
  relocation: Nullable<Relocation>
  currency: Nullable<string>
  salaryMin: Nullable<number>
  salaryMax: Nullable<number>
  salaryType: Nullable<SalaryType>
  about: { description: Nullable<string>, visible: boolean }
  skillsDescription: { description: Nullable<string>, visible: boolean }
  educationInfo: EducationInfo[]
  coursesInfo: CoursesInfo[]
  experienceInfo: ExperienceInfoFormData[]
  contactsVisible: boolean
  contacts: ICvContactPersonForm[],
  skills: string[]
  languageKnowledges: ILanguageKnowledge[]
}

export default function CvForm(props: Props) {
  const appContext = useAppContext()
  const cv = props.cv
  let ref = useRef<HTMLFormElement | null>(null)
  const handleSubmit = async (data: ICvFormData) => {
    const newData = {
      ...omit(data, ['skills', 'country', 'city', 'image']),
      countryId: data.country?.geonameid,
      cityId: data.city?.geonameid,
      skillsTitles: data.skills,
      experienceInfo: data.experienceInfo.map(i => {
        const fromDate = i.fromMonthYear ? parse(i.fromMonthYear, 'dd.MM.yyyy', new Date()) : null
        const toDate = i.toMonthYear ? parse(i.toMonthYear, 'dd.MM.yyyy', new Date()) : null
        const fromMonth = fromDate?.getMonth()
        const fromYear = fromDate?.getFullYear()
        const toMonth = toDate?.getMonth()
        const toYear = toDate?.getFullYear()
        return {
          ...omit(i, ['fromMonthYear', 'toMonthYear']),
          fromMonth: fromMonth ?? (fromYear ? 1 : null),
          fromYear: fromYear ?? null,
          toMonth: toMonth ?? (toYear ? 11 : null),
          toYear: toYear ?? null
        }
      })
    }

    try {
      props.onSubmit(newData as DeepPartial<ICV>)
    } catch (err) {
      console.error(err)
      if (err instanceof RequestError) {
        appContext.showSnackbar(err.message, SnackbarType.error)
      }

    }
  }

  const initialValues: ICvFormData = {
    title: cv?.title ?? null,
    image: cv?.image ?? null,
    categoryId: cv?.categoryId ?? null,
    subCategoryId: cv?.subCategoryId ?? null,
    name: cv?.name ?? null,
    country: cv?.country ?? null,
    city: cv?.city ?? null,
    relocation: cv?.relocation || null,
    currency: cv?.currency || null,
    salaryMin: cv?.salaryMin ?? null,
    salaryMax: cv?.salaryMax ?? null,
    salaryType: cv?.salaryType || null,
    about: cv?.about ?? {description: null, visible: false},
    skillsDescription: cv?.skillsDescription ?? {description: null, visible: false},
    educationInfo: cv?.educationInfo ?? [],
    coursesInfo: cv?.coursesInfo ?? [],
    experienceInfo: cv?.experienceInfo?.map(i => {
      return {...i,
        fromMonthYear: i.fromYear ? format(new Date(i.fromYear, i.fromMonth ?? 1, 1, 0,0, 0), 'dd.MM.yyyy') : null,
        toMonthYear: i.toYear ? format(new Date(i.toYear, i.toMonth ?? 1, 1, 0,0, 0), 'dd.MM.yyyy') : null,}
    }) ?? [],
    contactsVisible: cv?.contactsVisible ?? false,
    contacts: cv?.contacts?.map(i => ({
      ...i,
      type: i.email ? CvContactPersonType.Email : CvContactPersonType.Phone,
    })) ?? [],
    skills: cv?.skills?.map(i => i.title) ?? [],
    languageKnowledges: cv?.languageKnowledges ?? [],
  }

  const formik = useFormik<ICvFormData>({
    initialValues,
    onSubmit: handleSubmit
  })

  const handleSaveClick = async () => {


    await formik.submitForm()
  }

  return (
    <FormikProvider value={formik}>
      <Form ref={ref} className={styles.form}>
        <FormErrorScroll formik={formik} />
        <div className={styles.root}>
          <Card title='Specialization'>
            <div className={styles.wrapper}>
              <InputField name='title' label={'Title'}
                          validate={Validator.required}
              />
              <div className={styles.line}>
                <ServiceCategoryField placeholder='Category' className={styles.select} name='categoryId'/>
                <ServiceCategoryField placeholder='Sub-category' categoryId={formik.values.categoryId}
                                      className={styles.select} name='subCategoryId'/>
              </div>
            </div>
          </Card>
          <Card title='Details'>
            <div className={styles.wrapper}>
              <FileField
                isImage
                name='image'
                accept={[FileUploadAcceptType.Image]}
              />
              <InputField name='name' label={'Name'}
                          validate={Validator.required}
              />
              <div className={styles.line}>
                <div className={styles.location}>
                  <CountryField className={styles.select} name={'country'} label={'Country'}/>
                  <CityField className={styles.select}  name={'city'} label={'City'}
                             country={formik.values.country?.country}/>
                </div>
                <SelectField<Relocation>
                  className={styles.select}
                  label='Relocate' name={'relocate'}
                  options={[{label: 'Not ready', value: Relocation.no}, {label: 'Ready', value: Relocation.yes}]}/>
              </div>
            </div>
          </Card>
          <Card title='Salary'>
            <div className={styles.line}>
              <CurrencyField className={styles.select} name='currency'/>
              <InputField className={styles.select} format={'number'} placeholder='Salary maximum' name='salaryMax'
                          label={formik.values.salaryMax ? 'Salary maximum' : ''}
              />
              <InputField className={styles.select} format={'number'} placeholder='Salary minimum' name='salaryMin'
                          label={formik.values.salaryMin ? 'Salary minimum' : ''}
              />
              <SelectField<SalaryType> className={styles.select} placeholder='Type' name='salaryType'
                                       options={Dictionary.getSalaryTypeOptions()}/>
            </div>
          </Card>
          <Card title={<div className={styles.top}>
            <div className={styles.title}>Contacts</div>
            <SwitchField name={'contactsVisible'}/>
          </div>}>
            {formik.values.contactsVisible && <FieldArray name={'contacts'}>
              {arrayHelpers => (
                <div className={styles.root} data-field={'contacts'}>
                  <div className={styles.fields}>
                    {(formik.values.contacts ?? []).map((i, index) => <div className={styles.line}>
                      <div key={`contact_${index}`}
                           className={classNames(styles.fieldListLine, styles.line)}>
                        <SelectField<CvContactPersonType>
                          className={styles.column}
                          label='Type' name={`contacts[${index}].type`}
                          options={[{label: 'Email', value: CvContactPersonType.Email}, {
                            label: 'Phone',
                            value: CvContactPersonType.Phone
                          }]}/>
                        {formik.values.contacts[index].type === CvContactPersonType.Email && <InputField
                          label={'Email'}
                          className={styles.column}
                          name={`contacts[${index}].email`}
                          validate={Validator.email}/>}
                        {formik.values.contacts[index].type === CvContactPersonType.Phone && <InputField
                          label={'Phone'}
                          format={'phone'}
                          className={styles.column}
                          name={`contacts[${index}].phone`}
                          validate={Validator.phone}/>}
                      </div>
                      <IconButton
                        onClick={() => arrayHelpers.remove(index)}>
                        <CloseSvg color={colors.textSecondary}/>
                      </IconButton>
                    </div>)}
                    <div
                      onClick={() => arrayHelpers.push(formik.values.contacts.find(i => i.type === CvContactPersonType.Phone) ? {
                        type: CvContactPersonType.Email,
                        email: null
                      } : {type: CvContactPersonType.Phone, phone: null})} className={styles.add}>
                      Add Type
                    </div>
                  </div>
                </div>)}
            </FieldArray>}
          </Card>
          <Card title={<div className={styles.top}>
            <div className={styles.title}>About me</div>
            <SwitchField name={'about.visible'}/>
          </div>}>
            {formik.values.about?.visible ? <RichTextField name='about.description'/> : <></>}
          </Card>
          <Card title={'Education'}>
            <FieldArray name={'educationInfo'}>
              {arrayHelpers => (
                <div className={styles.root} data-field={'educationInfo'}>
                  <div className={styles.fields}>
                    {(formik.values.educationInfo ?? []).map((i, index) => <div className={styles.line}>
                        <div key={`education_${index}`}
                             className={classNames(styles.fieldListLine, styles.fields)}>
                          <InputField name={`educationInfo[${index}].institution`} label={'Institution'}/>
                          <InputField name={`educationInfo[${index}].speciality`} label={'Speciality'}/>
                          <div className={styles.line}>
                            <InputField name={`educationInfo[${index}].fromYear`} label={'From year'}/>
                            <InputField name={`educationInfo[${index}].toYear`} label={'To year'}/>
                          </div>
                        </div>
                        <IconButton
                          onClick={() => arrayHelpers.remove(index)}>
                          <CloseSvg color={colors.textSecondary}/>
                        </IconButton>
                      </div>
                    )}
                  </div>
                  <div onClick={() => arrayHelpers.push({
                    institution: null,
                    speciality: null,
                    fromMonth: null,
                    fromYear: null,
                    toMonth: null,
                    toYear: null
                  })} className={styles.add}>
                    Add University
                  </div>
                </div>
              )}
            </FieldArray>
          </Card>
          <Card title={'Courses'}>
            <FieldArray name={'coursesInfo'}>
              {arrayHelpers => (
                <div className={styles.root} data-field={'coursesInfo'}>
                  <div className={styles.fields}>
                    {(formik.values.coursesInfo ?? []).map((i, index) =>
                      <InputField key={index} name={`coursesInfo[${index}].name`} label={'Title'}
                                  suffix={index > 0 ?
                                    <CloseSvg
                                      className={styles.remove}
                                      onClick={() => arrayHelpers.remove(index)} color={colors.textSecondary}/> : ''}/>
                    )}
                  </div>
                  <div onClick={() => arrayHelpers.push({name: null})} className={styles.add}>
                    Add Courses
                  </div>
                </div>
              )}
            </FieldArray>
          </Card>
          <Card title={<div className={styles.top}>
            <div className={styles.title}>Skills</div>
            <SwitchField name={'skillsDescription.visible'}/>
          </div>}>
            {formik.values.skillsDescription?.visible ? <RichTextField name='skillsDescription.description'/> : <></>}
          </Card>
          <Card title='Skills Tags'>
            <SkillField className={styles.select} placeholder='Search skills' name='skills'/>
          </Card>
          <Card title='Languages'>
            <FieldArray name={'languageKnowledges'}>
              {arrayHelpers => (
                <div className={styles.root} data-field={'languageKnowledges'}>
                  <div className={styles.fields}>
                    {(formik.values.languageKnowledges ?? []).map((i, index) => <div className={styles.line}>
                        <div key={`language_${index}`} className={classNames(styles.fieldListLine, styles.line)}>
                          <LanguageField className={styles.column} name={`languageKnowledges[${index}].language`}
                                         label={'Language'}/>
                          <SelectField<string> className={styles.column} name={`languageKnowledges[${index}].level`}
                                               label={'Level'}
                                               options={[
                                                 {label: 'A1', value: 'A1'},
                                                 {
                                                   label: 'A2',
                                                   value: 'A2'
                                                 },
                                                 {label: 'B1', value: 'B1'},
                                                 {label: 'B2', value: 'B2'},
                                                 {
                                                   label: 'C1',
                                                   value: 'C1'
                                                 },
                                                 {label: 'C2', value: 'C2'}
                                               ]}/>
                        </div>
                        <IconButton
                          onClick={() => arrayHelpers.remove(index)}>
                          <CloseSvg color={colors.textSecondary}/>
                        </IconButton>
                      </div>
                    )}
                  </div>
                  <div onClick={() => arrayHelpers.push({language: null, level: null})} className={styles.add}>
                    Add Language
                  </div>
                </div>
              )}
            </FieldArray>

          </Card>
          <Card title={'Professional Experience'}>
            <FieldArray name={'experienceInfo'}>
              {arrayHelpers => (
                <div className={styles.root} data-field={'experienceInfo'}>
                  <div className={styles.fields}>
                    {(formik.values.experienceInfo ?? []).map((i, index) => <div className={styles.line}>
                      <div key={`experience_${index}`}
                           className={classNames(styles.fieldListLine, styles.fields)}>

                        <InputField placeholder='Employer name' className={styles.select}
                                    name={`experienceInfo[${index}].company`} validate={Validator.required}/>
                        <CountryField placeholder='Locate' className={styles.select}
                                      name={`experienceInfo[${index}].country`}/>
                        <div className={styles.line}>
                          <DateYearMonthField name={`experienceInfo[${index}].fromMonthYear`} label={'From'}/>
                          <DateYearMonthField name={`experienceInfo[${index}].toMonthYear`} label={'To'}/>
                        </div>
                        <InputField name={`experienceInfo[${index}].position`} label={'Job title'}
                                    validate={Validator.required}/>
                        <RichTextField name={`experienceInfo[${index}].description`}/>
                      </div>
                      <IconButton
                        onClick={() => arrayHelpers.remove(index)}>
                        <CloseSvg color={colors.textSecondary}/>
                      </IconButton>
                    </div>)}
                  </div>
                  <div onClick={() => arrayHelpers.push({
                    company: null,
                    position: null,
                    fromDate: null,
                    toDate: null,
                    description: null
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
            <Button  type={'submit'} styleType='large' color='green' spinner={props.loading ?? false}>
              {'Save'}
            </Button>
            <Button href={Routes.profileResume} type={'button'} styleType='large' color='white'>
              {'Cancel'}
            </Button>
            <div className={styles.preview} onClick={props.onPreview}>
              {!props.preview ? <EyeSvg color={colors.green} className={styles.eye}/>
                :
                <NoEyeSvg color={colors.green} className={styles.eye}/>
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
