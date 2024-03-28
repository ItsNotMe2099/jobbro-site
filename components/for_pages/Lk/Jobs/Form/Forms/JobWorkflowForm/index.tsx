import styles from './index.module.scss'
import Card from '@/components/for_pages/Common/Card'
import RichTextField from '@/components/fields/RichTextField'
import SelectField from '@/components/fields/SelectField'
import SwitchField from '@/components/fields/SwitchField'
import Dictionary from '@/utils/Dictionary'
import {ApplicationInfoRequirements} from '@/data/enum/ApplicationInfoRequirements'
import KeywordField from '@/components/fields/KeywordField'
import useTranslation from 'next-translate/useTranslation'
import ProjectField from '@/components/fields/ProjectField'
import {useVacancyOwnerContext} from '@/context/vacancy_owner_state'
import {IVacancyWorkflowData} from '@/types/form_data/IVacancyFormData'


interface Props {
  values: IVacancyWorkflowData
}

export default function JobWorkflowForm(props: Props) {
  const {t} = useTranslation()
  const vacancyContext = useVacancyOwnerContext()
  return (
    <div className={styles.root}>
      <Card title={t('job_form_tab_workflow_section_settings')}>
        <div className={styles.wrapper}>
          <div className={styles.line}>
            <SelectField<ApplicationInfoRequirements> label={t('job_form_tab_workflow_field_cv')} className={styles.select} name='cvRequired' options={Dictionary.getApplicationInfoRequirementsOptions(t)} />
            <SelectField<ApplicationInfoRequirements> label={t('job_form_tab_workflow_field_cover_letter')} className={styles.select} name='coverLetterRequired' options={Dictionary.getApplicationInfoRequirementsOptions(t)} />
          </div>
          <SelectField<string> label={t('job_form_tab_workflow_field_lang')} className={styles.select} name='applicationFormLanguage' options={[{label: 'English', value: 'en'}]} />
        </div>
      </Card>
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
