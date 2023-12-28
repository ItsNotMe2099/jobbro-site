import styles from './index.module.scss'
import InputField from '@/components/fields/InputField'
import useTranslation from 'next-translate/useTranslation'
interface Props {

}

export default function CreateMeetingDetailsStep(props: Props) {
  const { t } = useTranslation()
  return (<div className={styles.root}>
    <InputField name='theme' label={t('event_form_details_field_theme')}/>
    <InputField name='description' label={t('event_form_details_field_desc')}/>
    <InputField name='place' label={t('event_form_details_field_place')}/>
  </div>)
}
