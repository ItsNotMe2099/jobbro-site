import styles from './index.module.scss'
import { Form, FormikProvider, useFormik } from 'formik'
import { Nullable } from '@/types/types'
import { useEffect, useRef } from 'react'
import Card from '@/components/for_pages/Common/Card'
import { IJobWidget } from '@/data/interfaces/JobWidgetType'
import { useJobWidgetContext } from '@/context/job_widget_state'
import CityField from '@/components/fields/CityField'
import useTranslation from 'next-translate/useTranslation'
import SelectField from '@/components/fields/SelectField'
import Dictionary from '@/utils/Dictionary'
import RemovableItem from '@/components/ui/RemovableItem'
import { useServiceCategoryListOwnerContext } from '@/context/service_category_list_state'
import { ISpecializationCategory } from '@/data/interfaces/Common'
import FormSaveStickyFooter from '@/components/for_pages/Common/FormSaveCancelStickyFooter'
import {Routes} from '@/types/routes'
import {useRouter} from 'next/router'


interface IFormData  extends
Pick<IJobWidget, 'categories'|'location'|'employments'>
{}

interface Props {
  onPreview?: () => void
  preview?: boolean
}

export default function IncludedJobsForm(props: Props) {
  const ref = useRef<Nullable<HTMLFormElement>>(null)
  const jobWidgetContext = useJobWidgetContext()
  const {t} = useTranslation()
  const router = useRouter()
  const serviceCategoryListContext = useServiceCategoryListOwnerContext()
  const isFormSet = useRef<boolean>(false)


  const handleSubmit = async (data: IFormData) => {
    jobWidgetContext.saveSettings()
  }

  const initialValues: IFormData = {
    categories: jobWidgetContext.settings?.categories||[],
    location: jobWidgetContext.settings?.location || [],
    employments: jobWidgetContext.settings?.employments || [],
  }

  const formik = useFormik<IFormData>({
    initialValues,
    onSubmit: handleSubmit
  })

  useEffect(()=>{
    if(isFormSet.current) {
      jobWidgetContext.setSettings(state=> ({...state, ...formik.values}))
    }
  }, [formik.values])

  useEffect(()=>{
    if(jobWidgetContext.settings && !isFormSet.current) {
      formik.setFieldValue('categories', jobWidgetContext.settings.categories||[])
      formik.setFieldValue('location', jobWidgetContext.settings.location||[])
      formik.setFieldValue('employments', jobWidgetContext.settings.employments||[])
      isFormSet.current = true
    }
  }, [jobWidgetContext.settings])

  useEffect(()=>{
    if(!jobWidgetContext.settings) {
      jobWidgetContext.getWidget()
    }
  }, [])


  return (
    <FormikProvider value={formik}>
      <Form ref={ref} className={styles.root}>
        <Card title={t('settings_job_widget_included_category')}>
          <p className={styles.description}>{t('settings_job_widget_included_category_desc')}</p>
          <div className={styles.removableItems}>
          {jobWidgetContext.settings?.categories && jobWidgetContext.settings?.categories.length > 0 && jobWidgetContext.settings?.categories.map(
            (el, index) => <RemovableItem key={index} text={el.name||el.translations[0].name} onClick={() => formik.setFieldValue('categories', formik.values.categories.filter((_, i) => i !== index))}/>
          )}
          </div>
          <SelectField
          placeholder={t('settings_job_widget_included_field_category')}
          options={serviceCategoryListContext.data.filter(el=> !formik.values.categories.includes(el as ISpecializationCategory)).map(c => {
            return {label: c.name, value: c}
          })}
          name={`categories[${formik.values.categories.length === 0?formik.values.categories.length: formik.values.categories.length-1}]`}
          onChange={(el)=>formik.setFieldValue('categories', [...formik.values.categories, el])}
          />
        </Card>
        <Card title={t('settings_job_widget_included_location')}>
          <p className={styles.description}>{t('settings_job_widget_included_location_desc')}</p>
          <div className={styles.removableItems}>
          {formik.values.location.length > 0 && formik.values.location.map(
            (el, index) => <RemovableItem key={index} text={el.name} onClick={() => formik.setFieldValue('location', formik.values.location.filter((_, i) => i !== index))}/>
          )}
          </div>
          <CityField
          className={styles.input}
          placeholder={t('form_field_search')}
          onChange={(el)=>formik.setFieldValue('location', [...formik.values.location.filter(f=>f!==el), el])}
          name={`location[${formik.values.location.length === 0?formik.values.location.length: formik.values.location.length-1}]`}
          />
        </Card>
        <Card title={t('settings_job_widget_included_employment_type')}>
          <p className={styles.description}>{t('settings_job_widget_included_employment_type_desc')}</p>
          <div className={styles.removableItems}>
          {formik.values.employments &&formik.values.employments.length > 0 && formik.values.employments.map(
            (el, index) => <RemovableItem key={index} text={el} onClick={() => formik.setFieldValue('employments', formik.values.employments.filter((_, i) => i !== index))}/>
          )}
          </div>
          <SelectField
          placeholder={t('settings_job_widget_included_field_employment')}
          options={Dictionary.getEmploymentOptions(t).filter(el => formik.values.employments.findIndex(e=> el.value === e)===-1)}
          name={`employments[${formik.values.employments.length === 0?formik.values.employments.length: formik.values.employments.length-1}]`}
          onChange={(el)=>formik.setFieldValue('employments', [...formik.values.employments, el])}
          />
        </Card>
        <FormSaveStickyFooter boundaryElement={`.${styles.root}`} formRef={ref} onCancel={() => router.push(Routes.lkSettingsJobWidget)} loading={jobWidgetContext.editLoading}/>
      </Form>
    </FormikProvider>
  )
}
