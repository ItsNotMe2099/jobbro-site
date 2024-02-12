import styles from './index.module.scss'
import Card from '@/components/for_pages/Common/Card'
import { Form, FormikProvider, useFormik } from 'formik'
import { IOption, Nullable } from '@/types/types'
import { useEffect, useRef } from 'react'
import SwitchField from '@/components/fields/SwitchField'
import SelectField from '@/components/fields/SelectField'
import { IJobWidget } from '@/data/interfaces/JobWidgetType'
import { useJobWidgetContext } from '@/context/job_widget_state'
import FormSaveStickyFooter from '@/components/for_pages/Common/FormSaveCancelStickyFooter'
import {useRouter} from 'next/router'
import {Routes} from '@/types/routes'
import useTranslation from 'next-translate/useTranslation'


interface IFormData extends
Pick<IJobWidget,
'categoryFilter' |
'locationFilter' |
'employmentFilter' |
'language' |
'jobsPerPage' |
'showItemLogo' |
'showItemLocation' |
'showItemEmploymentType' |
'showItemCategory'>
{}

interface Props {
  onPreview?: () => void
  preview?: boolean
}

export default function WidgetSettingsForm(props: Props) {
  const ref = useRef<Nullable<HTMLFormElement>>(null)
  const jobWidgetContext = useJobWidgetContext()
  const router = useRouter()
  const isFormSet = useRef<boolean>(false)
  const {t} = useTranslation()

  const handleSubmit = async (data: IFormData) => {
    jobWidgetContext.saveSettings()
  }

  const jobsPerPageVariants: IOption<string>[] = [
    { label: '2', value: '2' },
    { label: '4', value: '4' },
    { label: '8', value: '8' },
    { label: '10', value: '10' },
  ]

  const langs: IOption<string>[] = [
    {label: 'English', value: 'en'},
    {label: 'Bahasa Indonesia ', value: 'id'},
  ]


  const initialValues: IFormData = {
    categoryFilter: true,
    locationFilter: true,
    employmentFilter: true,
    language: 'en',
    jobsPerPage: undefined,
    showItemLogo: true,
    showItemLocation: true,
    showItemEmploymentType: true,
    showItemCategory: true
  }

  const formik = useFormik<IFormData>({
    initialValues: {
      categoryFilter: jobWidgetContext.settings?.categoryFilter??initialValues.categoryFilter,
      locationFilter: jobWidgetContext.settings?.locationFilter??initialValues.locationFilter,
      employmentFilter: jobWidgetContext.settings?.employmentFilter??initialValues.employmentFilter,
      language: jobWidgetContext.settings?.language||initialValues.language,
      jobsPerPage: jobWidgetContext.settings?.jobsPerPage||initialValues.jobsPerPage,
      showItemLogo: jobWidgetContext.settings?.showItemLogo??initialValues.showItemLogo,
      showItemLocation: jobWidgetContext.settings?.showItemLocation??initialValues.showItemLocation,
      showItemEmploymentType: jobWidgetContext.settings?.showItemEmploymentType??initialValues.showItemEmploymentType,
      showItemCategory: jobWidgetContext.settings?.showItemCategory??initialValues.showItemCategory
    },
    onSubmit: handleSubmit
  })

  useEffect(()=>{
    if(isFormSet.current) {
      jobWidgetContext.setSettings(state=> ({...state, ...formik.values}))
    }
  }, [formik.values])

  useEffect(()=>{
    if(jobWidgetContext.settings && !isFormSet.current) {
      formik.setFieldValue('categoryFilter', jobWidgetContext.settings.categoryFilter)
      formik.setFieldValue('locationFilter', jobWidgetContext.settings.locationFilter)
      formik.setFieldValue('employmentFilter', jobWidgetContext.settings.employmentFilter)
      formik.setFieldValue('language', jobWidgetContext.settings.language)
      formik.setFieldValue('jobsPerPage', jobWidgetContext.settings.jobsPerPage)
      formik.setFieldValue('showItemLogo', jobWidgetContext.settings.showItemLogo)
      formik.setFieldValue('showItemLocation', jobWidgetContext.settings.showItemLocation)
      formik.setFieldValue('showItemEmploymentType', jobWidgetContext.settings.showItemEmploymentType)
      formik.setFieldValue('showItemCategory', jobWidgetContext.settings.showItemCategory)
      isFormSet.current = true
    }
  }, [jobWidgetContext.settings])


  return (
    <FormikProvider value={formik}>
      <Form ref={ref} className={styles.root}>
        <Card>
          <div className={styles.wrapper}>
            <SwitchField name='categoryFilter'
              onChange={(v)=> formik.setFieldValue('categoryFilter', v)}
              label={
                <div className={styles.checboxLabel}>
                  <div className={styles.label}>
                    {t('settings_job_widget_settings_category')}
                  </div>
                  <div className={styles.desc}>
                    {t('settings_job_widget_settings_category_desc')}
                  </div>
                </div>} />
            <SwitchField name='locationFilter'
              onChange={(v)=> formik.setFieldValue('locationFilter', v)}
              label={
                <div className={styles.checboxLabel}>
                  <div className={styles.label}>
                    {t('settings_job_widget_settings_location')}
                  </div>
                  <div className={styles.desc}>
                    {t('settings_job_widget_settings_location_desc')}
                  </div>
                </div>} />
            <SwitchField name='employmentFilter'
              onChange={(v)=> formik.setFieldValue('employmentFilter', v)}
              label={
                <div className={styles.checboxLabel}>
                  <div className={styles.label}>
                    {t('settings_job_widget_settings_employment')}
                  </div>
                  <div className={styles.desc}>
                    {t('settings_job_widget_settings_employment_desc')}
                  </div>
                </div>} />
            <div className={styles.select}>
              <SelectField placeholder={t('settings_job_widget_settings_lang')} name='language'
                onChange={(val)=> formik.setFieldValue('language', val)}
                options={langs} />
              <div className={styles.desc}>
                {t('settings_job_widget_settings_lang_desc')}
              </div>
            </div>
            <div className={styles.select}>
              <SelectField placeholder={t('settings_job_widget_settings_per_page')} name='jobsPerPage'
                onChange={(val)=> formik.setFieldValue('jobsPerPage', val)}
                options={jobsPerPageVariants} />
              <div className={styles.desc}>
                {t('settings_job_widget_settings_per_page_desc')}
              </div>
            </div>
            <SwitchField name='showItemLogo'
              onChange={(v)=> formik.setFieldValue('showItemLogo', v)}
              label={
                <div className={styles.checboxLabel}>
                  <div className={styles.label}>
                    {t('settings_job_widget_settings_item_logo')}
                  </div>
                  <div className={styles.desc}>
                    {t('settings_job_widget_settings_item_logo_desc')}
                  </div>
                </div>} />
            <SwitchField name='showItemLocation'
              onChange={(v)=> formik.setFieldValue('showItemLocation', v)}
              label={
                <div className={styles.checboxLabel}>
                  <div className={styles.label}>
                    {t('settings_job_widget_settings_item_location')}
                  </div>
                  <div className={styles.desc}>
                    {t('settings_job_widget_settings_item_location_desc')}
                  </div>
                </div>} />
            <SwitchField name='showItemEmploymentType'
              onChange={(v)=> formik.setFieldValue('showItemEmploymentType', v)}
              label={
                <div className={styles.checboxLabel}>
                  <div className={styles.label}>
                    {t('settings_job_widget_settings_item_employment')}
                  </div>
                  <div className={styles.desc}>
                    {t('settings_job_widget_settings_item_employment_desc')}
                  </div>
                </div>} />
            <SwitchField name='showItemCategory'
              onChange={(v)=> formik.setFieldValue('showItemCategory', v)}
              label={
                <div className={styles.checboxLabel}>
                  <div className={styles.label}>
                    {t('settings_job_widget_settings_item_category')}
                  </div>
                  <div className={styles.desc}>
                    {t('settings_job_widget_settings_item_category_desc')}
                  </div>
                </div>} />
          </div>
        </Card>
        <FormSaveStickyFooter boundaryElement={`.${styles.root}`} formRef={ref} onCancel={() => router.push(Routes.lkSettingsJobWidget)} loading={jobWidgetContext.editLoading}/>
      </Form>
    </FormikProvider>
  )
}
