import styles from './index.module.scss'
import {FieldArray, Form, FormikProvider, useFormik} from 'formik'
import {FileUploadAcceptType, SnackbarType} from '@/types/enums'
import { useRef} from 'react'
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
import {format, lastDayOfMonth, parse} from 'date-fns'
import FormErrorScroll from '@/components/ui/FormErrorScroll'
import FileField from '@/components/fields/Files/FileField'
import useTranslation from 'next-translate/useTranslation'
import LanguagesField from '@/components/fields/LanguagesField'
import {PublishStatus} from '@/data/enum/PublishStatus'
import CvPreview from '@/components/for_pages/Cv/CvPreview'

interface Props {
  onPreview?: () => void
  preview?: boolean
  onSubmit: (data: DeepPartial<ICV>) => void
  loading: boolean
  cv?: ICV | undefined | null
  cancelLink?: string
}

interface ExperienceInfoFormData extends ExperienceInfo{
  fromMonthYear: Nullable<string>,
  toMonthYear: Nullable<string>,
}
interface ICvContactPersonForm extends ICvContactPerson {
  type: CvContactPersonType
}

export interface ICvFormData {
  status: Nullable<PublishStatus>
  title: Nullable<string>
  image: Nullable<IFile>
  categoryId: Nullable<number>
  subCategoryId: Nullable<number>
  name: Nullable<string>
  country: Nullable<IGeoName>
  city: Nullable<IGeoName>
  relocation: Nullable<Relocation>
  currency: Nullable<string>
  salaryMin: Nullable<string|number>
  salaryMax: Nullable<number | string>
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
  const { t } = useTranslation()
  const cv = props.cv
  let ref = useRef<HTMLDivElement | null>(null)


  const handleSubmit = async (data: ICvFormData) => {
    const salaryMax = Number(data?.salaryMax?.toString().replaceAll(' ', ''))
    const salaryMin = Number(data?.salaryMin?.toString().replaceAll(' ', ''))

    const newData = {
      ...omit(data, ['skills', 'country', 'city']),
      countryId: data.country?.geonameid,
      cityId: data.city?.geonameid,
      skillsTitles: data.skills,
      coursesInfo: data.coursesInfo?.filter(i => !!i.name),
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
      }),
      salaryMax,
      salaryMin,
    }

    try {
      props.onSubmit(newData as DeepPartial<ICV>)
    } catch (err) {
      if (err instanceof RequestError) {
        appContext.showSnackbar(err.message, SnackbarType.error)
      }
    }
  }

  const initialValues: ICvFormData = {
    status: cv?.status ?? null,
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
    coursesInfo: (cv?.coursesInfo ?? [])!.filter(i => !!i.name),
    experienceInfo: cv?.experienceInfo?.map(i => {
      const monthDay = i.toMonth && !isNaN(i.toMonth) ? lastDayOfMonth(new Date(i.toYear || (new Date()).getFullYear(), i.toMonth, 1)) : lastDayOfMonth(new Date(i.toYear || (new Date()).getFullYear(), !i.toYear || i.toYear === (new Date()).getFullYear() ?  (new Date()).getMonth() : 11 , 1))

      return {...i,

        fromMonthYear: i.fromYear && !isNaN(i.fromYear) ? format((i.fromMonth || i.fromYear) ? new Date(i.fromYear || (new Date()).getFullYear() , i.fromMonth || 0, 1, 0, 0, 0, 0) : new Date(), 'dd.MM.yyyy') : null,
        toMonthYear: i.toYear && !isNaN(i.toYear)  ? format( new Date(i.toYear || (new Date()).getFullYear() , i.toMonth || i.toYear === (new Date()).getFullYear() ?  (new Date()).getMonth() : 11 , monthDay.getDate(), 24, 24, 59, 9999), 'dd.MM.yyyy') : null,}
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
  const handlePublishClick = async () => {
    await formik.setFieldValue('status', PublishStatus.Published)
    await formik.submitForm()
  }
  const handleSaveClick = async () => {
    await formik.submitForm()
  }

  const handleChangeCountry = () => {
    formik.setFieldValue('city', null)
  }
  const preview = (<CvPreview cv={formik.values as any as ICV} />)
  const showPublish = !props.preview && (!cv || cv.profileId) &&  (!cv || !([PublishStatus.Published] as PublishStatus[]).includes(cv!.status))
  const formFooter = ( <>
    {showPublish && <Button type='button' onClick={handlePublishClick} disabled={props.loading} spinner={props.loading && formik.values.status === PublishStatus.Published} styleType='large' color='green'>
      {t('job_form_button_publish')}
    </Button>}
    {!props.preview && <Button disabled={props.loading ?? false} spinner={props.loading && formik.values.status === PublishStatus.Draft} onClick={handleSaveClick} type={'button'} styleType='large' color={!showPublish ? 'green' : 'white'}>
      {!cv ? t('job_form_button_save_draft') : t('job_form_button_save')}
    </Button>}

      {!props.preview && props.cancelLink && <Button href={props.cancelLink} type={'button'} styleType='large' color='white'>
        {t('form_button_cancel')}
      </Button>}
      <div className={styles.preview} onClick={props.onPreview}>
        {!props.preview ? <EyeSvg color={colors.green} className={styles.eye}/>
          :
          <NoEyeSvg color={colors.green} className={styles.eye}/>
        }
        {!props.preview ? <div className={styles.text}>{t('cv_form_button_preview')}</div>
          :
          <div className={styles.text}>{t('cv_form_button_close_preview')}</div>
        }
      </div>
  </>)
  const form = (
    <FormikProvider value={formik}>
      <Form className={styles.form}>
        <FormErrorScroll formik={formik} />

          <Card title={t('cv_form_section_specialization')}>
            <div className={styles.wrapper}>
              <InputField
                name={'title'}
                label={t('cv_form_field_title')}
                validate={Validator.required}
                resettable
              />
              <div className={styles.line}>
                <ServiceCategoryField
                  name='categoryId'
                  label={t('cv_form_field_category')}
                  className={styles.select}
                />
                <ServiceCategoryField
                  name='subCategoryId'
                  label={t('cv_form_field_sub_category')}
                  categoryId={formik.values.categoryId}
                  className={styles.select}
                />
              </div>
            </div>
          </Card>

          <Card title={t('cv_form_section_details')}>
            <div className={styles.wrapper}>
              <FileField
                isImage
                withCrop
                name='image'
                accept={[FileUploadAcceptType.Image]}
              />
              <InputField
                name='name'
                label={t('cv_form_field_name')}
                validate={Validator.required}
              />
              <div className={styles.line}>
                <div className={styles.location}>
                  <CountryField
                    className={styles.select}
                    name={'country'}
                    label={t('cv_form_field_country')}
                    onChange={handleChangeCountry}
                  />
                  <CityField
                    className={styles.select}
                    name={'city'}
                    label={t('cv_form_field_city')}
                    country={formik.values.country?.country}
                  />
                  <SelectField<Relocation>
                    className={styles.select}
                    label={t('cv_form_field_relocate')} name={'relocation'}
                    resettable={true}
                    options={[{label: t('cv_form_field_relocate_ready'), value: Relocation.yes}, {label: t('cv_form_field_relocate_not_ready'), value: Relocation.no}]}
                  />
                </div>
              </div>
            </div>
          </Card>

          <Card title={t('cv_form_section_salary')}>
            <div className={styles.line}>
              <CurrencyField
                className={styles.select}
                name='currency'
                label={t('cv_form_field_currency')}
              />
              <InputField
                className={styles.select}
                format={'number'}
                label={t('cv_form_field_salary_max')}
                name='salaryMax'
              />
              <InputField
                className={styles.select}
                format={'number'}
                label={t('cv_form_field_salary_min')}
                name='salaryMin'
              />
              <SelectField<SalaryType>
                className={styles.select}
                label={t('cv_form_field_salary_type')}
                name='salaryType'
                options={Dictionary.getSalaryTypeOptions(t)}
              />
            </div>
          </Card>

          <Card
            title={
              <div className={styles.top}>
                <div className={styles.title}>{t('cv_form_section_contacts')}</div>
                <SwitchField name={'contactsVisible'}/>
              </div>
            }>
            {formik.values.contactsVisible && <FieldArray name={'contacts'}>
              {arrayHelpers => (
                <div className={styles.root} data-field={'contacts'}>
                  <div className={styles.fields}>
                    {(formik.values.contacts ?? []).map((i, index) =>
                      <div className={styles.line}>
                        <div
                          key={`contact_${index}`}
                          className={classNames(styles.fieldListLine, styles.line)}
                        >
                          <SelectField<CvContactPersonType>
                            className={styles.column}
                            label={t('cv_form_field_contact_type')} name={`contacts[${index}].type`}
                            options={[{label: t('cv_form_field_contact_email'), value: CvContactPersonType.Email}, {
                              label: t('cv_form_field_contact_phone'),
                              value: CvContactPersonType.Phone
                            }]}
                          />

                          {formik.values.contacts[index].type === CvContactPersonType.Email &&
                            <InputField
                              label={t('cv_form_field_contact_email')}
                              className={styles.column}
                              name={`contacts[${index}].email`}
                              validate={Validator.email}/>
                          }

                          {formik.values.contacts[index].type === CvContactPersonType.Phone &&
                            <InputField
                              label={t('cv_form_field_contact_phone')}
                              format={'phone'}
                              className={styles.column}
                              name={`contacts[${index}].phone`}
                              validate={Validator.phone}/>
                          }
                        </div>
                        <IconButton
                          onClick={() => arrayHelpers.remove(index)}>
                          <CloseSvg color={colors.textSecondary}/>
                        </IconButton>
                      </div>
                    )}
                    <div
                      onClick={() => arrayHelpers.push(
                        formik.values.contacts.find(i => i.type === CvContactPersonType.Phone)
                          ? {
                            type: CvContactPersonType.Email,
                            email: null
                          }
                          : {
                            type: CvContactPersonType.Phone,
                            phone: null
                          }
                      )}
                      className={styles.add}
                    >
                      {t('cv_form_contact_add')}
                    </div>
                  </div>
                </div>)}
            </FieldArray>}
          </Card>

          <Card
            title={
              <div className={styles.top}>
                <div className={styles.title}>{t('cv_form_section_about_me')}</div>
                <SwitchField name={'about.visible'}/>
              </div>
            }>
            {formik.values.about?.visible &&
              <RichTextField name='about.description'/>
            }
          </Card>

          <Card title={t('cv_form_section_education')}>
            <FieldArray name={'educationInfo'}>
              {arrayHelpers => (
                <div className={styles.root} data-field={'educationInfo'}>
                  <div className={styles.fields}>
                    {(formik.values.educationInfo ?? []).map((i, index) =>
                      <div className={styles.blockLine}>
                        <div
                          key={`education_${index}`}
                          className={classNames(styles.fieldListLine, styles.fields)}
                        >
                          <InputField
                            resettable
                            name={`educationInfo[${index}].institution`}
                            label={t('cv_form_field_education_institution')}
                          />
                          <InputField
                            resettable
                            name={`educationInfo[${index}].speciality`}
                            label={t('cv_form_field_education_speciality')}
                          />
                          <div className={styles.datesWrapper}>
                            <InputField
                              resettable
                              name={`educationInfo[${index}].fromYear`}
                              label={t('cv_form_field_education_from_year')}
                            />
                            <InputField
                              resettable
                              name={`educationInfo[${index}].toYear`}
                              label={t('cv_form_field_education_to_year')}
                            />
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
                    {t('cv_form_education_add')}
                  </div>
                </div>
              )}
            </FieldArray>
          </Card>

          <Card title={t('cv_form_section_courses')}>
            <FieldArray name={'coursesInfo'}>
              {arrayHelpers => (
                <div className={styles.root} data-field={'coursesInfo'}>
                  <div className={styles.fields}>
                    {(formik.values.coursesInfo ?? []).map((i, index) =>
                      <InputField
                        key={index}
                        name={`coursesInfo[${index}].name`}
                        label={t('cv_form_field_courses_title')}
                        suffix={index > 0
                          ? <CloseSvg
                            className={styles.remove}
                            onClick={() => arrayHelpers.remove(index)}
                            color={colors.textSecondary}
                          />
                          : ''}/>
                    )}
                  </div>
                  <div onClick={() => arrayHelpers.push({name: null})} className={styles.add}>
                    {t('cv_form_courses_add')}
                  </div>
                </div>
              )}
            </FieldArray>
          </Card>

          <Card
            title={
              <div className={styles.top}>
                <div className={styles.title}>{t('cv_form_section_skills')}</div>
                <SwitchField name={'skillsDescription.visible'}/>
              </div>
            }>
            {formik.values.skillsDescription?.visible &&
              <RichTextField name='skillsDescription.description'/>
            }
          </Card>

          <Card title={t('cv_form_section_skills_tags')}>
            <SkillField
              name='skills'
              className={styles.select}
              placeholder={t('cv_form_field_skills_tags_ph')}
            />
          </Card>

          <Card title={t('cv_form_section_languages')}>
            <LanguagesField name='languageKnowledges'/>
          </Card>

          <Card title={t('cv_form_section_experience')}>
            <FieldArray name={'experienceInfo'}>
              {arrayHelpers => (
                <div className={styles.root} data-field={'experienceInfo'}>
                  <div className={styles.fields}>
                    {(formik.values.experienceInfo ?? []).map((i, index) => <div className={styles.line}>
                      <div
                        key={`experience_${index}`}
                        className={classNames(styles.fieldListLine, styles.fields)}
                      >
                        <div className={styles.blockLine}>
                          <div className={styles.fields}>

                            <InputField
                              name={`experienceInfo[${index}].company`}
                              resettable
                              className={styles.select}
                              validate={Validator.required}
                              label={t('cv_form_field_experience_employer_name')}
                            />
                            <CountryField
                              name={`experienceInfo[${index}].country`}
                              resettable
                              className={styles.select}
                              label={t('cv_form_field_experience_country')}
                            />
                            <div className={styles.datesWrapper}>
                              <DateYearMonthField
                                name={`experienceInfo[${index}].fromMonthYear`}
                                label={t('cv_form_field_experience_from')}
                              />
                              <DateYearMonthField
                                name={`experienceInfo[${index}].toMonthYear`}
                                label={t('cv_form_field_experience_to')}
                              />
                            </div>
                            <InputField
                              resettable
                              name={`experienceInfo[${index}].position`}
                              label={t('cv_form_field_experience_position')}
                              validate={Validator.required}
                            />
                          </div>
                          <IconButton
                            onClick={() => arrayHelpers.remove(index)}
                          >
                            <CloseSvg color={colors.textSecondary}/>
                          </IconButton>
                        </div>

                      </div>
                      <RichTextField name={`experienceInfo[${index}].description`}/>

                    </div>)}
                  </div>
                  <div onClick={() => arrayHelpers.push({
                    company: null,
                    position: null,
                    fromDate: null,
                    toDate: null,
                    description: null
                  })} className={styles.add}>
                    {t('cv_form_experience_add')}
                  </div>
                </div>
              )}
            </FieldArray>

          </Card>

      </Form>
    </FormikProvider>
  )
  return (<div className={classNames(styles.root, styles.main)} ref={ref} >
    {!props.preview && form}
    {props.preview && preview}
    <FormStickyFooter className={styles.footer} boundaryElement={`.${styles.root}`} formRef={ref}>
      {formFooter}
    </FormStickyFooter>
    </div>)
}
