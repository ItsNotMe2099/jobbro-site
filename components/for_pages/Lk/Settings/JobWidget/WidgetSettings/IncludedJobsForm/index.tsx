import styles from './index.module.scss'
import { Form, FormikProvider, useFormik } from 'formik'
import { Nullable } from '@/types/types'
import { useEffect, useRef } from 'react'
import FormStickyFooter from '@/components/for_pages/Common/FormStickyFooter'
import Button from '@/components/ui/Button'
import EyeSvg from '@/components/svg/EyeSvg'
import { colors } from '@/styles/variables'
import NoEyeSvg from '@/components/svg/NoEyeSvg'
import Card from '@/components/for_pages/Common/Card'
import { IJobWidget } from '@/data/interfaces/JobWidgetType'
import { useJobWidgetContext } from '@/context/job_widget_state'
import CityField from '@/components/fields/CityField'
import useTranslation from 'next-translate/useTranslation'
import SelectField from '@/components/fields/SelectField'
import Dictionary from '@/utils/Dictionary'
import RemovableItem from '@/components/ui/RemovableItem'
import { useServiceCategoryListOwnerContext } from '@/context/service_category_list_state'


interface IFormData  extends 
Pick<IJobWidget, 'category'|'location'|'employment'>
{}

interface Props {
  onPreview?: () => void
  preview?: boolean
}

export default function IncludedJobsForm(props: Props) {
  const ref = useRef<Nullable<HTMLFormElement>>(null)
  const jobWidgetContext = useJobWidgetContext()
  const {t} = useTranslation()
  const serviceCategoryListContext = useServiceCategoryListOwnerContext()


  const handleSubmit = async (data: IFormData) => {
    jobWidgetContext.saveSettings()
  }

  const initialValues: IFormData = {
    category: jobWidgetContext.settings.category||[],
    location: jobWidgetContext.settings.location || [],
    employment: jobWidgetContext.settings.employment || [],
  }

  const formik = useFormik<IFormData>({
    initialValues,
    onSubmit: handleSubmit
  })

  useEffect(()=>{
    jobWidgetContext.setSettings(state=> ({...state, ...formik.values}))
  }, [formik.values])


  return (
    <FormikProvider value={formik}>
      <Form ref={ref} className={styles.root}>
        <Card title={'Category'}>
          <p className={styles.description}>Limit the jobs displayed in this widget to one or more categories</p>
          <div className={styles.removableItems}>
          {formik.values.category.length > 0 && formik.values.category.map(
            (el, index) => <RemovableItem key={index} text={el.name} onClick={() => formik.setFieldValue('category', formik.values.category.filter((_, i) => i !== index))}/>
          )}            
          </div>

          <SelectField 
          placeholder='Search Employment Type' 
          options={serviceCategoryListContext.data.filter(el=> !formik.values.category.includes(el)).map(c => {
            return {label: c.name, value: c}
          })}          
          name={`category[${formik.values.category.length === 0?formik.values.category.length: formik.values.category.length-1}]`} 
          onChange={(el)=>formik.setFieldValue('category', [...formik.values.category, el])}
          />

          
        </Card>
        <Card title={'Location'}>
          <p className={styles.description}>Limit the jobs displayed in this widget to one or more locations</p>
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
        <Card title={'Employment Type'}>
          <p className={styles.description}>Limit the jobs displayed in this widget to one or more employment types</p>
          <div className={styles.removableItems}>
          {formik.values.employment.length > 0 && formik.values.employment.map(
            (el, index) => <RemovableItem key={index} text={el} onClick={() => formik.setFieldValue('employment', formik.values.employment.filter((_, i) => i !== index))}/>
          )}            
          </div>
          <SelectField 
          placeholder='Search Employment Type' 
          options={Dictionary.getEmploymentOptions(t).filter(el => formik.values.employment.findIndex(e=> el.value === e)===-1)} 
          name={`employment[${formik.values.employment.length === 0?formik.values.employment.length: formik.values.employment.length-1}]`} 
          onChange={(el)=>formik.setFieldValue('employment', [...formik.values.employment, el])}
          />
        </Card>
        <FormStickyFooter boundaryElement={`.${styles.root}`} formRef={ref}>
          <Button spinner={false} type='submit' styleType='large' color='green'>
            Save
          </Button>
          <Button styleType='large' color='white'>
            Cancel
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
        </FormStickyFooter>
      </Form>
    </FormikProvider>
  )
}
