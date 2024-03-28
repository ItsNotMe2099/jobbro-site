import styles from './index.module.scss'
import {Form, FormikProvider, useFormik} from 'formik'
import {Goal, ModalType, SnackbarType} from '@/types/enums'
import {useEffect, useRef, useState} from 'react'
import {DeepPartial, IOption, Nullable, RequestError} from '@/types/types'
import {useAppContext} from '@/context/state'
import {useRouter} from 'next/router'
import JobAdDetailsForm from './Forms/JobAdDetailsForm'
import FormStickyFooter from '@/components/for_pages/Common/FormStickyFooter'
import Tabs from '@/components/ui/Tabs'
import Button from '@/components/ui/Button'
import EyeSvg from '@/components/svg/EyeSvg'
import {colors} from '@/styles/variables'
import NoEyeSvg from '@/components/svg/NoEyeSvg'
import {useVacancyOwnerContext} from '@/context/vacancy_owner_state'
import {Employment} from '@/data/enum/Employment'
import {Experience, ExperienceDuration} from '@/data/enum/Experience'
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
import OfficeOwnerRepository from '@/data/repositories/OfficeOwnerRepository'
import {IShareModalArgs} from '@/components/modals/ShareModal'
import {useDebouncedCallback} from 'use-debounce'
import JobApplicationForm from '@/components/for_pages/Lk/Jobs/Form/Forms/JobApplicationForm'
import JobWorkflowForm from '@/components/for_pages/Lk/Jobs/Form/Forms/JobWorkflowForm'
import {IVacancyFormData, VacancyFormSection} from '@/types/form_data/IVacancyFormData'


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


export default function CreateJobManuallyForm(props: Props) {
  const appContext = useAppContext()
  const vacancyContext = useVacancyOwnerContext()
  const companyContext = useCompanyOwnerContext()
  const vacancyGenerateAiContext = useVacancyGenerateAiContext()
  const lastAIResultRef = useRef<Nullable<IAiVacancy >| undefined>(props.initialValuesAi)
  const vacancyRef = useRef<Nullable<IVacancy>>(vacancyContext.vacancy)
  const createPromiseRef = useRef<Nullable<Promise<any>>>(null)
  const router = useRouter()
  const {t} = useTranslation()
  let ref = useRef<HTMLDivElement | null>(null)
  const abortSaveControllerRef = useRef<AbortController | null>(null)
  const [locked, setLocked] = useState<VacancyFormSection[]>([])
  const lockedRef = useRef<VacancyFormSection[]>([])
  const valuesRef = useRef<Nullable<IVacancyFormData>>(null)
  useEffect(() => {
    vacancyRef.current = vacancyContext.vacancy
  }, [vacancyContext.vacancy])
  useEffect(() => {
    lockedRef.current = locked
  }, [locked])
  useEffect(() => {
    OfficeOwnerRepository.fetch({isDefault: true, page: 1, limit: 1}).then(i => {
      if(!valuesRef.current?.office && !vacancyContext.vacancy?.office && i.data.length > 0) {
        formik.setFieldValue('office', i.data[0])
      }
    })
  }, [vacancyContext.vacancy?.office])
  const getDataForSubmit = (data: IVacancyFormData) => {
    const salaryMax = Number(data?.salaryMax?.toString().replaceAll(' ', ''))
    const salaryMin = Number(data?.salaryMin?.toString().replaceAll(' ', ''))

    return  {...omit(data, ['skills', 'benefits', 'keywords', 'office', 'project']),
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
  }
  const debounceSaveDraft = useDebouncedCallback(async (data: IVacancyFormData) => {
    abortSaveControllerRef.current = new AbortController()
    const newData = getDataForSubmit(data)
    try {
      if (vacancyContext.vacancy && !vacancyContext.isClone) {
        await vacancyContext.update(newData, {signal: abortSaveControllerRef.current?.signal})
      } else {
        createPromiseRef.current  =  vacancyContext.create({...newData} as DeepPartial<IVacancy>)
      }
    } catch (err) {
    }
  }, 500)
  const stopDebounceSave =() => {
    try {
      debounceSaveDraft?.cancel()
    }catch (e) {
      console.error(e)
    }
    try {
      if (abortSaveControllerRef.current) {
        abortSaveControllerRef.current?.abort()
      }
    }catch (e) {

    }

  }
  const handleSubmit = async (data: IVacancyFormData) => {
    const newData = getDataForSubmit(data)
    try {
      if (vacancyContext.vacancy && !vacancyContext.isClone) {
        await vacancyContext.update(newData)
        .then(res=> {
          if(res){
            appContext.showModal<IShareModalArgs>(ModalType.ShareModal, {link: Routes.getGlobal(Routes.job(res.id))})
          }
        })
        showToast({title: t('toast_vacancy_edited_title'), text: t('toast_vacancy_edited_desc')})
      } else {

        await vacancyContext.create({...newData} as DeepPartial<IVacancy>)
        .then(res=> {
          if(res){
            appContext.showModal<IShareModalArgs>(ModalType.ShareModal, {link: Routes.getGlobal(Routes.job(res.id))})
          }
        })
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
    currency: props.initialValuesAi?.currency ?? vacancyContext?.vacancy?.currency ?? 'USD',
    languageKnowledges: vacancyContext.vacancy?.languageKnowledges||[],
    salaryMin: props.initialValuesAi?.salaryMin ?? vacancyContext.vacancy?.salaryMin?? null,
    salaryMax: props.initialValuesAi?.salaryMax ?? vacancyContext.vacancy?.salaryMax ?? null,
    salaryType: props.initialValuesAi?.salaryType ?? vacancyContext.vacancy?.salaryType?? null,
    experience: props.initialValuesAi?.experience ? props.initialValuesAi.experience as Experience : (vacancyContext.vacancy?.experience ?? null),
    experienceDuration: props.initialValuesAi?.experienceDuration ? props.initialValuesAi.experienceDuration as ExperienceDuration : (vacancyContext.vacancy?.experienceDuration ?? null),
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
    declineAuto: vacancyContext.vacancy?.declineAuto ?? {minRating: 75, replyAfter: 3, enabled: false},
    hiringStagesDescriptions: vacancyContext?.vacancy?.hiringStagesDescriptions ?? [],
    contactPerson: vacancyContext?.vacancy?.contactPerson ?? { name: null, visible: false }
  }

  const formik = useFormik<IVacancyFormData>({
    initialValues,
    onSubmit: handleSubmit
  })
  useEffect(() => {
    valuesRef.current = formik.values
  }, [formik.values])
  useEffect(() => {
    if(!valuesRef.current || valuesRef.current?.status === PublishStatus.Draft) {
      debounceSaveDraft(formik.values)
    }
  }, [formik.values])

  useEffect(() => {
    const subscriptionUpdate = vacancyGenerateAiContext.requestUpdateState$.subscribe((request: IAiVacancyGenRequest) => {
      const result = request.result
      const locked = lockedRef.current
      if(!locked.includes(VacancyFormSection.Header) && result?.name && formik.values.name !== result.name){
        formik.setFieldValue('name', result.name)
      }
      if(!locked.includes(VacancyFormSection.TagsBenefits) && (result?.benefits?.length ?? 0) > 0 && formik.values.benefits.length === (result?.benefits?.length ?? 0) && formik.values.benefits.every(i => lastAIResultRef.current!.benefits?.includes(i))){
        formik.setFieldValue('benefits', result!.benefits)
      }


      if(!locked.includes(VacancyFormSection.Experience) && result?.experience && formik.values.experience !== result.experience){
        formik.setFieldValue('experience', result.experience)
      }

      if(!locked.includes(VacancyFormSection.Details) && result?.experienceDuration && formik.values.experienceDuration !== result.experienceDuration){
        formik.setFieldValue('experienceDuration', result.experienceDuration)
      }

      if(!locked.includes(VacancyFormSection.Intro) && result?.intro && formik.values.intro?.description !== result.intro){
        formik.setFieldValue('intro.description', result.intro)
      }
      if(locked.includes(VacancyFormSection.Header) && (result?.keywords?.length ?? 0) > 0){
       // formik.setFieldValue('tags', result!.keywords)
      }

      if(!locked.includes(VacancyFormSection.Requirements) && result?.requirements && formik.values.requirements !== result.requirements){
        formik.setFieldValue('requirements', result.requirements)
      }
      if(!locked.includes(VacancyFormSection.Skills) && (result?.skills?.length ?? 0) > 0){
        formik.setFieldValue('skills', result!.skills)
      }

      if(!locked.includes(VacancyFormSection.Tasks) && result?.tasks &&  formik.values.tasks !== result.tasks){
        formik.setFieldValue('tasks', result.tasks)
      }
      if(!locked.includes(VacancyFormSection.Salary) && result?.salaryType &&  formik.values.salaryType !== result.salaryType){
        formik.setFieldValue('salaryType', result.salaryType)
      }

      if(!locked.includes(VacancyFormSection.Salary) && result?.salaryMax &&  formik.values.salaryMax !== result.salaryMax){
        formik.setFieldValue('salaryMax', result.salaryMax)
      }

      if(!locked.includes(VacancyFormSection.Salary) && result?.salaryMin &&  formik.values.salaryMin !== result.salaryMin){
        formik.setFieldValue('salaryMin', result.salaryMin)
      }

      if(!locked.includes(VacancyFormSection.Salary) && result?.currency &&  formik.values.currency !== result.currency){
        formik.setFieldValue('currency', result.currency)
      }
      if(!locked.includes(VacancyFormSection.Benefits) && result?.benefitsDescription &&  formik.values.benefitsDescription?.description !== result.benefitsDescription){
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
  const handleClickLock = (section: VacancyFormSection) => {
    setLocked(i => i.includes(section) ? i.filter(a => a !== section) : [...i, section])
  }
  const handleClickRefresh = (section: VacancyFormSection) =>{
    const result = vacancyGenerateAiContext.request?.result
    if(!result){
      return null
    }
    switch (section){
      case VacancyFormSection.Header:
        if(result.name) {
          formik.setFieldValue('name', result.name)
        }
        break
      case VacancyFormSection.Intro:
        if(result.intro) {
          formik.setFieldValue('intro.description', result.intro)
        }
        break
      case VacancyFormSection.Details:
        if(result.experienceDuration) {
          formik.setFieldValue('experienceDuration', result.experienceDuration)
        }
        break
      case VacancyFormSection.Requirements:
        if(result.requirements) {
          formik.setFieldValue('requirements', result.requirements)
        }

        break
      case VacancyFormSection.Experience:
        if(result.experience) {
          formik.setFieldValue('experience', result.experience)
        }
        break
      case VacancyFormSection.LanguageTags:
        break
      case VacancyFormSection.Skills:
        if((result?.skills?.length ?? 0) > 0){
          formik.setFieldValue('skills', result!.skills)
        }
        break
      case VacancyFormSection.Tasks:
        if(result?.tasks){
          formik.setFieldValue('tasks', result.tasks)
        }
        break
      case VacancyFormSection.Salary:
        if( result?.salaryType){
          formik.setFieldValue('salaryType', result.salaryType)
        }

        if( result?.salaryMax){
          formik.setFieldValue('salaryMax', result.salaryMax)
        }

        if(result?.salaryMin){
          formik.setFieldValue('salaryMin', result.salaryMin)
        }

        if( result?.currency){
          formik.setFieldValue('currency', result.currency)
        }
        break
      case VacancyFormSection.Benefits:
        if(result.benefits) {
          formik.setFieldValue('benefits', result.benefits)
        }
        break
      case VacancyFormSection.TagsBenefits:
        break
    }

  }
  const form = (
    <FormikProvider value={formik}>
      <Form className={styles.form}>
        <FormErrorScroll formik={formik} />
        <Tabs<TabKey> options={options} value={tab} onClick={value => setTab(value)}/>
        {tab === TabKey.AdDetails && <JobAdDetailsForm formik={formik} locked={locked} onClickLock={handleClickLock} onClickRefresh={handleClickRefresh} fromAi={props.fromAi}/>}
        {tab === TabKey.ApplicationForm && <JobApplicationForm formik={formik}/>}
        {tab === TabKey.Workflow && <JobWorkflowForm values={formik.values}/>}
      </Form>
    </FormikProvider>
  )
  const preview = ( <JobPreview job={formik.values as any as IVacancy} company={companyContext.company}/>)
  const publishButton = (<Button type='button' onClick={handlePublishClick} disabled={vacancyContext.editLoading} spinner={vacancyContext.editLoading && formik.values.status === PublishStatus.Published} styleType='large' color='green'>
    {t('job_form_button_publish')}
  </Button>)
  const saveButton = ( <Button disabled={vacancyContext.editLoading} spinner={vacancyContext.editLoading && formik.values.status === PublishStatus.Draft} onClick={handleSaveClick} type={'button'} styleType='large' color='white'>
    {!vacancyContext.vacancy! ? t('job_form_button_save_draft') : t('job_form_button_save')}
  </Button>)
  const formFooter = ( <>
    {(!vacancyContext.vacancy! || !([PublishStatus.Published] as PublishStatus[]).includes(vacancyContext.vacancy!.status)) && publishButton}
    {saveButton}
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
