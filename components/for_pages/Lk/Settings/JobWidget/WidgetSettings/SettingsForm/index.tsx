import styles from './index.module.scss'
import Card from '@/components/for_pages/Common/Card'
import { Form, FormikProvider, useFormik } from 'formik'
import { Nullable } from '@/types/types'
import { useRef } from 'react'
import FormStickyFooter from '@/components/for_pages/Common/FormStickyFooter'
import SwitchField from '@/components/fields/SwitchField'
import SelectField from '@/components/fields/SelectField'
import Button from '@/components/ui/Button'
import EyeSvg from '@/components/svg/EyeSvg'
import { colors } from '@/styles/variables'
import NoEyeSvg from '@/components/svg/NoEyeSvg'


interface IFormData {
  categoryFilter: boolean
  locationFilter: boolean
  employmentTypeFilter: boolean
  language: { label: string }
  jobsPerPage: { label: string }
  logo: boolean
  location: boolean
  employmentType: boolean
  category: boolean
}

interface Props {
  onPreview?: () => void
  preview?: boolean
}

export default function WidgetSettingsForm(props: Props) {
  const ref = useRef<Nullable<HTMLFormElement>>(null)

  const handleSubmit = async (data: IFormData) => {


  }

  const initialValues: IFormData = {
    categoryFilter: true,
    locationFilter: true,
    employmentTypeFilter: true,
    language: { label: 'EN' },
    jobsPerPage: { label: '25' },
    logo: true,
    location: true,
    employmentType: true,
    category: true
  }

  const formik = useFormik<IFormData>({
    initialValues,
    onSubmit: handleSubmit
  })

  console.log(formik.values)

  return (
    <FormikProvider value={formik}>
      <Form ref={ref} className={styles.root}>
        <Card>
          <div className={styles.wrapper}>
            <SwitchField name='categoryFilter'
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
              label={
                <div className={styles.checboxLabel}>
                  <div className={styles.label}>
                    Location filter
                  </div>
                  <div className={styles.desc}>
                    Users can narrow the jobs listed down to a specific category
                  </div>
                </div>} />
            <SwitchField name='employmentTypeFilter'
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
                options={[]} />
              <div className={styles.desc}>
                Choose the language of the widget interface elements
              </div>
            </div>
            <div className={styles.select}>
              <SelectField placeholder='Jobs Per Page' name='jobsPerPage'
                options={[]} />
              <div className={styles.desc}>
                Define the number of jobs to be listed per page
              </div>
            </div>
            <SwitchField name='logo'
              label={
                <div className={styles.checboxLabel}>
                  <div className={styles.label}>
                    Logo
                  </div>
                  <div className={styles.desc}>
                    Your company logo is displayed next to each job (on desktop only)
                  </div>
                </div>} />
            <SwitchField name='location'
              label={
                <div className={styles.checboxLabel}>
                  <div className={styles.label}>
                    Location
                  </div>
                  <div className={styles.desc}>
                    Location is displayed for each job
                  </div>
                </div>} />
            <SwitchField name='employmentType'
              label={
                <div className={styles.checboxLabel}>
                  <div className={styles.label}>
                    Employment type
                  </div>
                  <div className={styles.desc}>
                    Employment type is displayed for each job
                  </div>
                </div>} />
            <SwitchField name='category'
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
