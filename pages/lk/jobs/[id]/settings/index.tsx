import styles from './index.module.scss'
import {useVacancyOwnerContext} from '@/context/vacancy_owner_state'
import {useRouter} from 'next/router'
import {Form, FormikProvider, useFormik} from 'formik'
import FormErrorScroll from '@/components/ui/FormErrorScroll'
import JobWorkflowForm from '@/components/for_pages/Lk/Jobs/Form/Forms/JobWorkflowForm'
import {SnackbarType} from '@/types/enums'
import showToast from '@/utils/showToast'
import {DeepPartial, RequestError} from '@/types/types'
import {useAppContext} from '@/context/state'
import FormStickyFooter from '@/components/for_pages/Common/FormStickyFooter'
import Button from '@/components/ui/Button'
import useTranslation from 'next-translate/useTranslation'
import {IVacancyWorkflowData} from '@/types/form_data/IVacancyFormData'
import {omit} from '@/utils/omit'
import {IVacancy} from '@/data/interfaces/IVacancy'
import {useRef} from 'react'
import JobPageLayout, {JobPageTabKey} from '@/components/for_pages/Lk/Job/JobPageLayout'
import {LkJobHirerLayout} from '@/components/for_pages/Lk/Job/LkJobLayout'
import {getAuthServerSideProps} from '@/utils/auth'
import {ProfileType} from '@/data/enum/ProfileType'

const JobSettingsPage = () => {
  const appContext = useAppContext()
  const {t} = useTranslation()
  const router = useRouter()
  const vacancyContext = useVacancyOwnerContext()
  let ref = useRef<HTMLFormElement | null>(null)
  const handleSubmit = async (data: IVacancyWorkflowData) => {
    const newData = {...omit(data, [ 'keywords', 'project']),
      keywordsTitles: data.keywords,
    } as  DeepPartial<IVacancy>
    try {
        await vacancyContext.update(newData)
        showToast({title: t('toast_vacancy_edited_title'), text: t('toast_vacancy_edited_desc')})
    } catch (err) {
      console.error(err)
      if (err instanceof RequestError) {
        appContext.showSnackbar(err.message, SnackbarType.error)
      }

    }
  }

  const initialValues: IVacancyWorkflowData = {
    keywords: vacancyContext.vacancy?.keywords?.map(i => i.title) ?? [],
    project: vacancyContext.vacancy?.project?.title ?? null,
    applicationFormLanguage: vacancyContext.vacancy?.applicationFormLanguage ?? null,
    applyAutoMessage:  vacancyContext.vacancy?.applyAutoMessage ?? {template: null, enabled: false},
    declineAutoMessage: vacancyContext.vacancy?.declineAutoMessage ?? {template: null, enabled: false},
    hiringStagesDescriptions: vacancyContext?.vacancy?.hiringStagesDescriptions ?? [],
    contactPerson: vacancyContext?.vacancy?.contactPerson ?? { name: null, visible: false },
    declineAuto: vacancyContext.vacancy?.declineAuto ?? {minRating: 75, replyAfter: 3, enabled: false},
  }

  const formik = useFormik<IVacancyWorkflowData>({
    initialValues,
    onSubmit: handleSubmit
  })
  return (
    <JobPageLayout  activeTab={JobPageTabKey.Settings}>
    <FormikProvider value={formik}>
    <Form className={styles.form} ref={ref}>
      <FormErrorScroll formik={formik} />
      <JobWorkflowForm values={formik.values}/>
      <FormStickyFooter boundaryElement={`.${styles.form}`} formRef={ref}>
        <Button disabled={vacancyContext.editLoading} spinner={vacancyContext.editLoading} type={'submit'} styleType='large' color='white'>
          {!vacancyContext.vacancy! ? t('job_form_button_save_draft') : t('job_form_button_save')}
        </Button>
      </FormStickyFooter>
    </Form>
  </FormikProvider>
    </JobPageLayout>)
}
JobSettingsPage.getLayout = LkJobHirerLayout
export default  JobSettingsPage
export const getServerSideProps = getAuthServerSideProps(ProfileType.Hirer)
