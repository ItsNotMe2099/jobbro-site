import styles from './index.module.scss'
import {Form, FormikProvider, useFormik} from 'formik'
import {SnackbarType} from '@/types/enums'
import {useEffect, useRef, useState} from 'react'
import {DeepPartial, IOption, Nullable, RequestError} from '@/types/types'
import {useAppContext} from '@/context/state'
import {useRouter} from 'next/router'
import JobAdDetailsForm from './Forms/JobAdDetailsForm'
import ApplicationForm from './Forms/ApplicationForm'
import WorkflowForm from './Forms/WorkflowForm'
import FormStickyFooter from '@/components/for_pages/Common/FormStickyFooter'
import Tabs from '@/components/ui/Tabs'
import Button from '@/components/ui/Button'
import EyeSvg from '@/components/svg/EyeSvg'
import {colors} from '@/styles/variables'
import NoEyeSvg from '@/components/svg/NoEyeSvg'
import {useVacancyOwnerContext} from '@/context/vacancy_owner_state'
import {Employment} from '@/data/enum/Employment'
import {IOffice} from '@/data/interfaces/IOffice'
import {Workplace} from '@/data/enum/Workplace'
import {Experience} from '@/data/enum/Experience'
import {SalaryType} from '@/data/enum/SalaryType'
import {IBenefit} from '@/data/interfaces/IBenefit'
import {ISkill} from '@/data/interfaces/ISkill'
import {ApplicationInfoRequirements} from '@/data/enum/ApplicationInfoRequirements'
import {omit} from '@/utils/omit'
import {IVacancy} from '@/data/interfaces/IVacancy'
import {IKeyword} from '@/data/interfaces/IKeyword'
import {Routes} from '@/types/routes'
import {PublishStatus} from '@/data/enum/PublishStatus'
import JobPreview from '@/components/for_pages/Lk/Jobs/JobPreview'
import {useCompanyOwnerContext} from '@/context/company_owner_state'
import Spacer from '@/components/ui/Spacer'
import FormErrorScroll from '@/components/ui/FormErrorScroll'
import IAiVacancyGenRequest, {IAiVacancy} from '@/data/interfaces/IAiVacancy'
import {useVacancyGenerateAiContext} from '@/context/vacancy_generate_ai'


enum TabKey {
  AdDetails = 'adDetails',
  ApplicationForm = 'applicationForm',
  Workflow = 'workflow'
}

interface Props {
  onPreview?: () => void
  preview?: boolean
  fromAi?: boolean
  initialValuesAi?: IAiVacancy | undefined | null
}

export interface IVacancyFormData {
  status: Nullable<PublishStatus>
  name: Nullable<string>
  intro: { description: Nullable<string>, visible: boolean }
  categoryId: Nullable<number>
  subCategoryId: Nullable<number>
  employment: Nullable<Employment>
  workplace: Nullable<Workplace>
  office: Nullable<IOffice>
  currency: Nullable<string>
  salaryMin: Nullable<number>
  salaryMax: Nullable<number>
  salaryType: Nullable<SalaryType>
  experience: Nullable<Experience>
  benefitsDescription: { description: Nullable<string>, visible: boolean }
  requirements: Nullable<string>
  tasks: Nullable<string>
  cvRequired: Nullable<ApplicationInfoRequirements>
  coverLetterRequired: Nullable<ApplicationInfoRequirements>
  benefits: IBenefit[]
  skills: ISkill[]
  keywords: IKeyword[]
  applicationFormLanguage: Nullable<string>
  applyAutoMessage: {template: Nullable<string>, enabled: boolean}
  declineAutoMessage: {template: Nullable<string>, enabled: boolean}
  hiringStagesDescriptions: { title: string, description: string }[]
}

export default function CreateJobManuallyForm(props: Props) {

  const appContext = useAppContext()
  const vacancyContext = useVacancyOwnerContext()
  const companyContext = useCompanyOwnerContext()
  const vacancyGenerateAiContext = useVacancyGenerateAiContext()
  const router = useRouter()
  let ref = useRef<HTMLDivElement | null>(null)

  const handleSubmit = async (data: IVacancyFormData) => {
    const newData: DeepPartial<IVacancy> = {...omit(data, ['skills', 'benefits', 'keywords', 'office']),
      skillsIds: data.skills.map(i => i.id),
      benefitsIds: data.benefits.map(i => i.id),
      keywordsIds: data.keywords?.map(i => i.id) ?? [],
      officeId: data?.office?.id,
      companyId: companyContext.company?.id
    } as  DeepPartial<IVacancy>
    try {
      if (vacancyContext.vacancy) {
        await vacancyContext.update(newData)
      } else {
        await vacancyContext.create({...newData} as DeepPartial<IVacancy>)
      }
      await router.push(Routes.lkJobs)
    } catch (err) {
      console.error(err)
      if (err instanceof RequestError) {
        appContext.showSnackbar(err.message, SnackbarType.error)
      }

    }
  }

  const initialValues: IVacancyFormData = {
    status: null,
    name: props.initialValuesAi?.name ?? vacancyContext.vacancy?.name ?? null,
    intro: props.initialValuesAi?.intro ? { description: props.initialValuesAi.intro, visible: true } :  vacancyContext.vacancy?.intro ??  { description: null, visible: false },
    categoryId: vacancyContext.vacancy?.categoryId?? null,
    subCategoryId: vacancyContext.vacancy?.subCategoryId?? null,
    employment:  vacancyContext.vacancy?.employment?? null,
    workplace:  vacancyContext.vacancy?.workplace?? null,
    office: vacancyContext.vacancy?.office?? null,
    currency: 'EUR',
    salaryMin:  vacancyContext.vacancy?.salaryMin?? null,
    salaryMax: vacancyContext.vacancy?.salaryMax?? null,
    salaryType: vacancyContext.vacancy?.salaryType?? null,
    experience: /*props.initialValuesAi?.experience ? props.initialValuesAi.experience as Experience :*/ (vacancyContext.vacancy?.experience ?? null),
    benefitsDescription:  vacancyContext.vacancy?.benefitsDescription?? { description: null, visible: false },
    requirements: props.initialValuesAi?.requirements ?? vacancyContext.vacancy?.requirements?? null,
    tasks: props.initialValuesAi?.tasks ?? vacancyContext.vacancy?.tasks?? null,
    cvRequired: vacancyContext.vacancy?.cvRequired ?? ApplicationInfoRequirements.Optional,
    coverLetterRequired: vacancyContext.vacancy?.coverLetterRequired ?? ApplicationInfoRequirements.Optional,
    benefits: vacancyContext.vacancy?.benefits ?? [],
    skills: vacancyContext.vacancy?.skills ?? [],
    keywords: vacancyContext.vacancy?.keywords ?? [],
    applicationFormLanguage: vacancyContext.vacancy?.applicationFormLanguage ?? null,
    applyAutoMessage:  vacancyContext.vacancy?.applyAutoMessage ?? {template: null, enabled: false},
    declineAutoMessage: vacancyContext.vacancy?.declineAutoMessage ?? {template: null, enabled: false},
    hiringStagesDescriptions: []
  }

  const formik = useFormik<IVacancyFormData>({
    initialValues,
    onSubmit: handleSubmit
  })

  useEffect(() => {
    const subscriptionUpdate = vacancyGenerateAiContext.requestUpdateState$.subscribe((request: IAiVacancyGenRequest) => {
      const result = request.result
      console.log('RequestUpdate11', formik.getFieldMeta('name'))
      if(result?.name && !formik.getFieldMeta('name').touched){
        formik.setFieldValue('name', result.name)
      }

      if(result?.benefits && !formik.getFieldMeta('benefits').touched){
        // formik.setFieldValue('benefits', result.benefits)
      }
      if(result?.category && !formik.getFieldMeta('category').touched){
       // formik.setFieldValue('category', result.category)
      }
      if(result?.experience && !formik.getFieldMeta('experience').touched){
    //    formik.setFieldValue('experience', result.experience)
      }
      if(result?.intro && !formik.getFieldMeta('intro.description').touched){
        formik.setFieldValue('intro.description', result.intro)
      }
      if(result?.keywords && !formik.getFieldMeta('keywords').touched){
     //   formik.setFieldValue('keywords', result.keywords)
      }
      if(result?.name && !formik.getFieldMeta('name').touched){
        formik.setFieldValue('name', result.name)
      }
      if(result?.requirements && !formik.getFieldMeta('requirements').touched){
        formik.setFieldValue('requirements', result.requirements)
      }
      if(result?.skills && !formik.getFieldMeta('skills').touched){
     //   formik.setFieldValue('skills', result.skills)
      }
      if(result?.subCategory && !formik.getFieldMeta('subCategory').touched){
        formik.setFieldValue('subCategory', result.subCategory)
      }
      if(result?.tasks && !formik.getFieldMeta('tasks').touched){
        formik.setFieldValue('tasks', result.tasks)
      }

    })
    return () => {
      subscriptionUpdate.unsubscribe()
    }
  }, [formik])

  const [tab, setTab] = useState<TabKey>(TabKey.AdDetails)
  const options: IOption<TabKey>[] = [
    {label: 'Job ad Details', value: TabKey.AdDetails},
    {label: 'Application Form', value: TabKey.ApplicationForm},
    {label: 'Workflow', value: TabKey.Workflow}
  ]

  const handleSaveClick = async () => {
    if(!vacancyContext.vacancy){
      await formik.setFieldValue('status', PublishStatus.Draft)
    }

    await formik.submitForm()
  }


  const handlePublishClick = async () => {
    await formik.setFieldValue('status', PublishStatus.Published)
    await formik.submitForm()
  }
  const form = (
    <FormikProvider value={formik}>

      <Form className={styles.form}>
        <FormErrorScroll formik={formik} />
        <Tabs<TabKey> options={options} value={tab} onClick={value => setTab(value)}/>
        {tab === TabKey.AdDetails && <JobAdDetailsForm formik={formik}/>}
        {tab === TabKey.ApplicationForm && <ApplicationForm formik={formik}/>}
        {tab === TabKey.Workflow && <WorkflowForm formik={formik}/>}

      </Form>
    </FormikProvider>
  )
  const preview = ( <JobPreview job={formik.values as any as IVacancy} company={companyContext.company}/>)
  const formFooter = ( <>
    {!props.preview && (!vacancyContext.vacancy! || !([PublishStatus.Published] as PublishStatus[]).includes(vacancyContext.vacancy!.status)) && <Button type='button' onClick={handlePublishClick} disabled={vacancyContext.editLoading} spinner={vacancyContext.editLoading && formik.values.status === PublishStatus.Published} styleType='large' color='green'>
      Publish
    </Button>}
    {!props.preview && <Button disabled={vacancyContext.editLoading} spinner={vacancyContext.editLoading && formik.values.status === PublishStatus.Draft} onClick={handleSaveClick} type={'button'} styleType='large' color='white'>
      {!vacancyContext.vacancy! ? 'Save as draft' : 'Save'}
    </Button>}
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
  </>)
  return <div className={styles.root} ref={ref} >
    {!props.preview && form}
    {props.preview && preview}
    <Spacer basis={32}/>
    {(!props.fromAi || props.preview) && <FormStickyFooter boundaryElement={`.${styles.root}`} formRef={ref}>
      {formFooter}
    </FormStickyFooter>}
    {(props.fromAi && !props.preview) && <div className={styles.formFooterAi}>
      {formFooter}
    </div>}
  </div>
}
