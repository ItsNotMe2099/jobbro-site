import styles from './index.module.scss'
import {Form, FormikProvider, useFormik} from 'formik'
import {Goal, SnackbarType} from '@/types/enums'
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
import {Experience, ExperienceDuration} from '@/data/enum/Experience'
import {SalaryType} from '@/data/enum/SalaryType'
import {ApplicationInfoRequirements} from '@/data/enum/ApplicationInfoRequirements'
import {omit} from '@/utils/omit'
import {IVacancy} from '@/data/interfaces/IVacancy'
import {Routes} from '@/types/routes'
import {PublishStatus} from '@/data/enum/PublishStatus'
import JobPreview from '@/components/for_pages/Lk/Jobs/JobPreview'
import {useCompanyOwnerContext} from '@/context/company_owner_state'
import Spacer from '@/components/ui/Spacer'
import FormErrorScroll from '@/components/ui/FormErrorScroll'
import IAiVacancyGenRequest, {IAiVacancy} from '@/data/interfaces/IAiVacancy'
import {useVacancyGenerateAiContext} from '@/context/vacancy_generate_ai'
import Analytics from '@/utils/goals'
import {VacancyCreationType} from '@/data/enum/VacancyCreationType'
import useTranslation from 'next-translate/useTranslation'
import showToast from '@/utils/showToast'


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
  status?: Nullable<PublishStatus> | undefined
  name: Nullable<string>
  intro: { description: Nullable<string>, visible: boolean }
  categoryId: Nullable<number>
  subCategoryId: Nullable<number>
  employment: Nullable<Employment>
  workplace: Nullable<Workplace>
  office: Nullable<IOffice>
  currency: Nullable<string>
  salaryMin: Nullable<string|number>
  salaryMax: Nullable<string|number>
  salaryType: Nullable<SalaryType>
  experience: Nullable<Experience>
  experienceDuration?: Nullable<ExperienceDuration>
  benefitsDescription: { description: Nullable<string>, visible: boolean }
  requirements: Nullable<string>
  tasks: Nullable<string>
  cvRequired: Nullable<ApplicationInfoRequirements>
  coverLetterRequired: Nullable<ApplicationInfoRequirements>
  languageKnowledges: {language: string, level: string}[] 
  benefits: string[]
  skills: string[]
  keywords: string[]
  project: Nullable<string>
  applicationFormLanguage: Nullable<string>
  applyAutoMessage: {template: Nullable<string>, enabled: boolean}
  declineAutoMessage: {template: Nullable<string>, enabled: boolean}
  hiringStagesDescriptions: { title: string, description: string }[],
  contactPerson: { name: Nullable<string>, visible: boolean }
}

export default function CreateJobManuallyForm(props: Props) {
  const appContext = useAppContext()
  const vacancyContext = useVacancyOwnerContext()
  const companyContext = useCompanyOwnerContext()
  const vacancyGenerateAiContext = useVacancyGenerateAiContext()
  const lastAIResultRef = useRef<Nullable<IAiVacancy >| undefined>(props.initialValuesAi)
  const router = useRouter()
  const {t} = useTranslation()
  let ref = useRef<HTMLDivElement | null>(null)

  const handleSubmit = async (data: IVacancyFormData) => {
    const salaryMax = Number(data?.salaryMax?.toString().replaceAll(' ', ''))
    const salaryMin = Number(data?.salaryMin?.toString().replaceAll(' ', ''))
    const newData: DeepPartial<IVacancy> = {...omit(data, ['skills', 'benefits', 'keywords', 'office', 'project']),
      skillsTitles: data.skills,
      benefitsTitles: data.benefits,
      keywordsTitles: data.keywords,
      projectTitle: data.project,
      officeId: data?.office?.id,
      companyId: companyContext.company?.id,
      salaryMax,
      salaryMin,
      creationType: props.fromAi ? VacancyCreationType.Ai : VacancyCreationType.Manual
    } as  DeepPartial<IVacancy>
    try {
      if (vacancyContext.vacancy) {
        await vacancyContext.update(newData)
        showToast({title: t('toast_vacancy_edited_title'), text: t('toast_vacancy_edited_desc')})
      } else {
        await vacancyContext.create({...newData} as DeepPartial<IVacancy>)
        if(props.fromAi){
          Analytics.goal(Goal.CreateJobAi)
        }
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
    name: props.initialValuesAi?.name ?? vacancyContext.vacancy?.name ?? null,
    intro: props.initialValuesAi?.intro ? { description: props.initialValuesAi.intro, visible: true } :  vacancyContext.vacancy?.intro ??  { description: null, visible: false },
    categoryId: vacancyContext.vacancy?.categoryId?? null,
    subCategoryId: vacancyContext.vacancy?.subCategoryId?? null,
    employment: props.initialValuesAi?.employment ? props.initialValuesAi.employment as Employment : (vacancyContext.vacancy?.employment ?? null),
    workplace:  vacancyContext.vacancy?.workplace?? null,
    office: vacancyContext.vacancy?.office?? null,
    currency: 'EUR',
    languageKnowledges: vacancyContext.vacancy?.languageKnowledges||[],
    salaryMin:  vacancyContext.vacancy?.salaryMin?? null,
    salaryMax: vacancyContext.vacancy?.salaryMax?? null,
    salaryType: vacancyContext.vacancy?.salaryType?? null,
    experience: props.initialValuesAi?.experience ? props.initialValuesAi.experience as Experience : (vacancyContext.vacancy?.experience ?? null),
    benefitsDescription:  props.initialValuesAi?.benefitsDescription ? { description: props.initialValuesAi.benefitsDescription, visible: true } :  vacancyContext.vacancy?.benefitsDescription?? { description: null, visible: false },
    requirements: props.initialValuesAi?.requirements ?? vacancyContext.vacancy?.requirements?? null,
    tasks: props.initialValuesAi?.tasks ?? vacancyContext.vacancy?.tasks?? null,
    cvRequired: vacancyContext.vacancy?.cvRequired ?? ApplicationInfoRequirements.Optional,
    coverLetterRequired: vacancyContext.vacancy?.coverLetterRequired ?? ApplicationInfoRequirements.Optional,
    benefits: props.initialValuesAi?.benefits ?? vacancyContext.vacancy?.benefits?.map(i => i.title) ?? [],
    skills: props.initialValuesAi?.skills ?? vacancyContext.vacancy?.skills?.map(i => i.title) ?? [],
    keywords: props.initialValuesAi?.keywords ?? vacancyContext.vacancy?.keywords?.map(i => i.title) ?? [],
    project: vacancyContext.vacancy?.project?.title ?? null,
    applicationFormLanguage: vacancyContext.vacancy?.applicationFormLanguage ?? null,
    applyAutoMessage:  vacancyContext.vacancy?.applyAutoMessage ?? {template: null, enabled: false},
    declineAutoMessage: vacancyContext.vacancy?.declineAutoMessage ?? {template: null, enabled: false},
    hiringStagesDescriptions: vacancyContext?.vacancy?.hiringStagesDescriptions ?? [],
    contactPerson: vacancyContext?.vacancy?.contactPerson ?? { name: null, visible: false }
  }

  const formik = useFormik<IVacancyFormData>({
    initialValues,
    onSubmit: handleSubmit
  })

  useEffect(() => {
    const subscriptionUpdate = vacancyGenerateAiContext.requestUpdateState$.subscribe((request: IAiVacancyGenRequest) => {
      const result = request.result

      if(result?.name && formik.values.name !== lastAIResultRef.current?.name){
        formik.setFieldValue('name', result.name)
      }
      if((result?.benefits?.length ?? 0) > 0 && formik.values.benefits.length === (lastAIResultRef.current?.benefits.length ?? 0) && formik.values.benefits.every(i => lastAIResultRef.current!.benefits.includes(i))){
        formik.setFieldValue('benefits', result!.benefits)
      }


      if(result?.experience && formik.values.experience === lastAIResultRef.current?.experience){
       formik.setFieldValue('experience', result.experience)
      }
      if(result?.intro && formik.values.intro?.description === lastAIResultRef.current?.intro){
        formik.setFieldValue('intro.description', result.intro)
      }
      if((result?.keywords?.length ?? 0) > 0 && formik.values.keywords.length === (lastAIResultRef.current?.keywords.length ?? 0) && formik.values.keywords.every(i => lastAIResultRef.current?.keywords.includes(i))){
        formik.setFieldValue('keywords', result!.keywords)
      }

      if(result?.requirements && formik.values.requirements === lastAIResultRef.current?.requirements){
        formik.setFieldValue('requirements', result.requirements)
      }
      if((result?.skills?.length ?? 0) > 0 && formik.values.skills.length === (lastAIResultRef.current?.skills.length ?? 0) && formik.values.skills.every(i => lastAIResultRef.current?.skills.includes(i))){
        formik.setFieldValue('skills', result!.skills)
      }

      if(result?.tasks &&  formik.values.tasks === lastAIResultRef.current?.tasks){
        formik.setFieldValue('tasks', result.tasks)
      }
      if(result?.salaryType &&  formik.values.salaryType === lastAIResultRef.current?.salaryType){
        formik.setFieldValue('salaryType', result.salaryType)
      }

      if(result?.salaryMax &&  formik.values.salaryMax === lastAIResultRef.current?.salaryMax){
        formik.setFieldValue('salaryMax', result.salaryMax)
      }

      if(result?.salaryMin &&  formik.values.salaryMin === lastAIResultRef.current?.salaryMin){
        formik.setFieldValue('salaryMin', result.salaryMin)
      }

      if(result?.currency &&  formik.values.currency === lastAIResultRef.current?.currency){
        formik.setFieldValue('currency', result.currency)
      }
      if(result?.benefitsDescription &&  formik.values.benefitsDescription?.description === lastAIResultRef.current?.benefitsDescription){
        formik.setFieldValue('benefitsDescription', result.benefitsDescription)
      }

    })
    return () => {
      subscriptionUpdate.unsubscribe()
    }
  }, [formik])

  const [tab, setTab] = useState<TabKey>(TabKey.AdDetails)
  const options: IOption<TabKey>[] = [
    {label: t('job_form_tab_ad_details'), value: TabKey.AdDetails},
    {label: t('job_form_tab_application_form'), value: TabKey.ApplicationForm},
    {label: t('job_form_tab_workflow'), value: TabKey.Workflow}
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
      {t('job_form_button_publish')}
    </Button>}
    {!props.preview && <Button disabled={vacancyContext.editLoading} spinner={vacancyContext.editLoading && formik.values.status === PublishStatus.Draft} onClick={handleSaveClick} type={'button'} styleType='large' color='white'>
      {!vacancyContext.vacancy! ? t('job_form_button_save_draft') : t('job_form_button_save')}
    </Button>}
    <div className={styles.preview} onClick={props.onPreview}>
      {!props.preview ? <EyeSvg color={colors.green} className={styles.eye}/>
        :
        <NoEyeSvg color={colors.green} className={styles.eye}/>
      }
      {!props.preview ? <div className={styles.text}>{t('job_form_button_preview')}</div>
        :
        <div className={styles.text}>{t('job_form_button_close_preview')}</div>
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
