import styles from './index.module.scss'
import Card from '@/components/for_pages/Common/Card'
import { Form, FormikProvider, useFormik } from 'formik'
import { IOption, Nullable } from '@/types/types'
import { useEffect, useRef } from 'react'
import FormStickyFooter from '@/components/for_pages/Common/FormStickyFooter'
import SwitchField from '@/components/fields/SwitchField'
import SelectField from '@/components/fields/SelectField'
import Button from '@/components/ui/Button'
import EyeSvg from '@/components/svg/EyeSvg'
import { colors } from '@/styles/variables'
import NoEyeSvg from '@/components/svg/NoEyeSvg'
import { IJobWidget } from '@/data/interfaces/JobWidgetType'
import { useJobWidgetContext } from '@/context/job_widget_state'


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

  const handleSubmit = async (data: IFormData) => {
    
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
    language: { label: 'EN' },
    jobsPerPage: undefined,
    showItemLogo: true,
    showItemLocation: true,
    showItemEmploymentType: true,
    showItemCategory: true
  }

  const formik = useFormik<IFormData>({
    initialValues: {
      categoryFilter: jobWidgetContext.settings.categoryFilter??initialValues.categoryFilter,
      locationFilter: jobWidgetContext.settings.locationFilter??initialValues.locationFilter,
      employmentFilter: jobWidgetContext.settings.employmentFilter??initialValues.employmentFilter,
      language: jobWidgetContext.settings.language||initialValues.language,
      jobsPerPage: jobWidgetContext.settings.jobsPerPage||initialValues.jobsPerPage,
      showItemLogo: jobWidgetContext.settings.showItemLogo??initialValues.showItemLogo,
      showItemLocation: jobWidgetContext.settings.showItemLocation??initialValues.showItemLocation,
      showItemEmploymentType: jobWidgetContext.settings.showItemEmploymentType??initialValues.showItemEmploymentType,
      showItemCategory: jobWidgetContext.settings.showItemCategory??initialValues.showItemCategory
    },
    onSubmit: handleSubmit
  })

  useEffect(()=>{
    jobWidgetContext.setSettings(state=> ({...state, ...formik.values}))
  }, [formik.values])


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
                    Category filter
                  </div>
                  <div className={styles.desc}>
                    Users can narrow the jobs listed down to a specific category
                  </div>
                </div>} />
            <SwitchField name='locationFilter'
              onChange={(v)=> formik.setFieldValue('locationFilter', v)}
              label={
                <div className={styles.checboxLabel}>
                  <div className={styles.label}>
                    Location filter
                  </div>
                  <div className={styles.desc}>
                    Users can narrow the jobs listed down to a specific category
                  </div>
                </div>} />
            <SwitchField name='employmentFilter'
              onChange={(v)=> formik.setFieldValue('employmentFilter', v)}
              label={
                <div className={styles.checboxLabel}>
                  <div className={styles.label}>
                    Employment type filter
                  </div>
                  <div className={styles.desc}>
                    Users can narrow the jobs listed down to a specific employment type
                  </div>
                </div>} />
            <div className={styles.select}>
              <SelectField placeholder='Language' name='language'
                onChange={(val)=> formik.setFieldValue('language', val)}
                options={langs} />
              <div className={styles.desc}>
                Choose the language of the widget interface elements
              </div>
            </div>
            <div className={styles.select}>
              <SelectField placeholder='Jobs Per Page' name='jobsPerPage'
                onChange={(val)=> formik.setFieldValue('jobsPerPage', val)}
                options={jobsPerPageVariants} />
              <div className={styles.desc}>
                Define the number of jobs to be listed per page
              </div>
            </div>
            <SwitchField name='showItemLogo'
              onChange={(v)=> formik.setFieldValue('showItemLogo', v)}
              label={
                <div className={styles.checboxLabel}>
                  <div className={styles.label}>
                    Logo
                  </div>
                  <div className={styles.desc}>
                    Your company logo is displayed next to each job (on desktop only)
                  </div>
                </div>} />
            <SwitchField name='showItemLocation'
              onChange={(v)=> formik.setFieldValue('showItemLocation', v)}
              label={
                <div className={styles.checboxLabel}>
                  <div className={styles.label}>
                    Location
                  </div>
                  <div className={styles.desc}>
                    Location is displayed for each job
                  </div>
                </div>} />
            <SwitchField name='showItemEmploymentType'
              onChange={(v)=> formik.setFieldValue('showItemEmploymentType', v)}
              label={
                <div className={styles.checboxLabel}>
                  <div className={styles.label}>
                    Employment type
                  </div>
                  <div className={styles.desc}>
                    Employment type is displayed for each job
                  </div>
                </div>} />
            <SwitchField name='showItemCategory'
              onChange={(v)=> formik.setFieldValue('showItemCategory', v)}
              label={
                <div className={styles.checboxLabel}>
                  <div className={styles.label}>
                    Category
                  </div>
                  <div className={styles.desc}>
                    Category is displayed for each job
                  </div>
                </div>} />
          </div>
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
