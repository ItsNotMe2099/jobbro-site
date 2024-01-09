import styles from 'components/side-panels/JobsFilterSidePanel/index.module.scss'
import {Form, FormikProvider, useFormik} from 'formik'
import { useState} from 'react'
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
import ProjectEntitiesField from '@/components/fields/ProjectEntitiesField'
import {omit} from '@/utils/omit'
import {IProject} from '@/data/interfaces/IProject'
import useTranslation from 'next-translate/useTranslation'

interface Props {

}

export interface IFormData {
  statuses?: PublishStatus[]
  projects?: IProject[]
  publishedDate?: Nullable<string>
  showClosed?: boolean
}

export default function JobsFilterSidePanel(props: Props) {
  const appContext = useAppContext()
  const { t } = useTranslation()
  const args = appContext.panelArguments as JobFilterSidePanelArguments
  const [loading, setLoading] = useState<boolean>(false)
  const handleSubmit =  (data: IFormData) => {
    args?.onSubmit?.({
      ...omit(data, []),
     // skills: data.skills?.map(i => i.id),

    })
    appContext.hidePanel()
    appContext.hideOverlay()
    setLoading(false)
  }

  const initialValues = {
    statuses: args?.filter?.statuses ?? [],
    projects: args?.filter?.projects ?? [],
    publishedAt: args?.filter?.publishedAt ?? null,
    showClosed: args?.filter?.showClosed ?? true
  }

  const formik = useFormik<IFormData>({
    initialValues,
    onSubmit: handleSubmit
  })


  return (
    <SidePanelLayout>
      <FormikProvider value={formik}>
        <Form className={styles.form}>
          <SidePanelHeader title={t('job_filter_title')}/>
          <SidePanelBody fixed>
            <div className={styles.fields}>
              <div className={styles.field}>

                <CheckboxMultipleField<PublishStatus> name={'statuses'} label={t('job_filter_field_status')} labelStyleType={'large'} options={[
                  {label: 'Published', value: PublishStatus.Published},
                  {label: 'Draft', value: PublishStatus.Draft},
                  {label: 'Paused', value: PublishStatus.Paused},
                ]} />
              </div>
              <div className={styles.field}>
                <FieldLabel label={t('job_filter_field_projects')} styleType={'large'} />

                <ProjectEntitiesField name={'projects'} placeholder={t('job_filter_field_projects_ph')}  />
              </div>
                  <DateField iconName={'field_date'} name='publishedAt' label={t('job_filter_field_published_at')} labelStyleType={'large'}/>
              <div className={styles.field}>
                <FieldLabel label={t('job_filter_field_show_closed')} styleType={'large'} />
                    <CheckBoxField name='showClosed' label='Show'  />
              </div>
            </div>
          </SidePanelBody>
          <SidePanelFooter>
            <div className={styles.buttons}>
            <Button spinner={loading} type='submit' className={styles.apply} styleType='large' color='green'>
              {t('job_filter_button_apply')}
            </Button>
            <Button onClick={appContext.hidePanel} className={styles.btn} styleType='large' color='white'>
              {t('job_filter_button_cancel')}
            </Button>
            </div>
          </SidePanelFooter>
        </Form>
      </FormikProvider>
    </SidePanelLayout>

  )
}
