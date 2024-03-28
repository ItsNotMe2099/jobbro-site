import styles from './index.module.scss'
import Card from '@/components/for_pages/Common/Card'
import RichTextField from '@/components/fields/RichTextField'
import SwitchField from '@/components/fields/SwitchField'
import KeywordField from '@/components/fields/KeywordField'
import useTranslation from 'next-translate/useTranslation'
import ProjectField from '@/components/fields/ProjectField'
import {useVacancyOwnerContext} from '@/context/vacancy_owner_state'
import {IVacancyWorkflowData} from '@/types/form_data/IVacancyFormData'
import SliderField from '@/components/fields/SliderField'


interface Props {
  values: IVacancyWorkflowData
}

export default function JobWorkflowForm(props: Props) {
  const {t} = useTranslation()
  const vacancyContext = useVacancyOwnerContext()
  return (
    <div className={styles.root}>
      <Card title={t('job_form_tab_workflow_section_project')}>
        <ProjectField placeholder={t('job_form_tab_workflow_field_project_ph')} className={styles.select} name='project' defaultOption={vacancyContext?.vacancy?.project} />

      </Card>
      <Card title={<div className={styles.top}>
        <div className={styles.title}>{t('job_form_tab_workflow_section_auto_reply')}</div>
        <SwitchField name={'applyAutoMessage.enabled'} />
      </div>}>
        {props.values.applyAutoMessage?.enabled ? <RichTextField placeholder={t('job_form_tab_workflow_field_auto_reply_ph')} name='applyAutoMessage.template' /> : <></>}
      </Card>
      <Card title={<div className={styles.top}>
        <div className={styles.title}>Automatic decline</div>
        <SwitchField name={'declineAuto.enabled'} />
      </div>}>
        {props.values.declineAuto?.enabled ? <div className={styles.row}>
          <SliderField min={1} max={100} defaultValue={75} suffix={'%'} name={'declineAuto.minRating'} label={'Minimal rating candidate'}/>
          <SliderField min={1} max={100} defaultValue={75}  suffix={'weeks'} name={'declineAuto.replyAfter'} label={'Reply candidate after'}/>
        </div> : <></>}
      </Card>
      <Card title={<div className={styles.top}>
        <div className={styles.title}>{t('job_form_tab_workflow_section_auto_reply_decline')}</div>
        <SwitchField name={'declineAutoMessage.enabled'} />
      </div>}>
        {props.values.declineAutoMessage?.enabled ? <RichTextField placeholder={t('job_form_tab_workflow_field_auto_reply_decline_ph')} name='declineAutoMessage.template' /> : <></>}
      </Card>
      <Card title={t('job_form_tab_workflow_section_keywords')}>
        <KeywordField name={'keywords'}/>
      </Card>
    </div>
  )
}
