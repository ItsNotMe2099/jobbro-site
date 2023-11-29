import styles from 'components/side-panels/JobsFilterSidePanel/index.module.scss'
import {Form, FormikProvider, useFormik} from 'formik'
import {useRef, useState} from 'react'
import {useAppContext} from '@/context/state'
import CheckBoxField from '@/components/fields/CheckBoxField'
import Button from '@/components/ui/Button'
import DateField from '@/components/fields/DateField'
import {PublishStatus} from '@/data/enum/PublishStatus'
import {JobFilterSidePanelArguments} from '@/types/side_panel_arguments'
import CheckboxMultipleField from '@/components/fields/CheckboxMultipleField'
import {Nullable} from '@/types/types'
import SidePanelFooter from '@/components/layout/SidePanel/SidePanelFooter'
import SidePanelBody from '@/components/layout/SidePanel/SidePanelBody'
import SidePanelHeader from '@/components/layout/SidePanel/SidePanelHeader'
import SidePanelLayout from '@/components/layout/SidePanel/SidePanelLayout'
import FieldLabel from '@/components/fields/FieldLabel'

interface Props {

}

export interface IFormData {
  statuses?: PublishStatus[]
  projects?: number[]
  publishedDate?: Nullable<string>
  showClosed?: boolean
}

export default function JobsFilterSidePanel(props: Props) {
  const appContext = useAppContext()
  const args = appContext.panelArguments as JobFilterSidePanelArguments
  const [loading, setLoading] = useState<boolean>(false)
  let ref = useRef<HTMLFormElement | null>(null)
  const handleSubmit =  (data: IFormData) => {
    args?.onSubmit?.(data)
    appContext.hidePanel()
    appContext.hideOverlay()
    setLoading(false)
  }

  const initialValues = {
    statuses: args?.statuses ?? [],
    projects: args?.projects ?? [],
    publishedDate: args?.publishedDate ?? null,
    showClosed: args?.showClosed ?? true
  }

  const formik = useFormik<IFormData>({
    initialValues,
    onSubmit: handleSubmit
  })

  console.log(formik)


  return (
    <SidePanelLayout>
      <FormikProvider value={formik}>
        <Form className={styles.form}>
          <SidePanelHeader title={'Filter'}/>
          <SidePanelBody fixed>
            <div className={styles.fields}>
              <div className={styles.field}>

                <CheckboxMultipleField<PublishStatus> name={'statuses'} label={'Status'} labelStyleType={'large'} options={[
                  {label: 'Published', value: PublishStatus.Published},
                  {label: 'Draft', value: PublishStatus.Draft},
                  {label: 'Paused', value: PublishStatus.Paused},
                ]} />
              </div>
                  <DateField iconName={'field_date'} name='date' placeholder='Open Date' label={'Date'} labelStyleType={'large'}/>
              <div className={styles.field}>
                <FieldLabel label={'Closed jobs'} styleType={'large'} />
                    <CheckBoxField name='showClosed' label='Show'  />
              </div>
            </div>
          </SidePanelBody>
          <SidePanelFooter>
            <div className={styles.buttons}>
            <Button spinner={loading} type='submit' className={styles.apply} styleType='large' color='green'>
              Apply
            </Button>
            <Button onClick={appContext.hidePanel} className={styles.btn} styleType='large' color='white'>
              Cancel
            </Button>
            </div>
          </SidePanelFooter>
        </Form>
      </FormikProvider>
    </SidePanelLayout>

  )
}
