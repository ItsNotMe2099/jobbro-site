import styles from './index.module.scss'
import {useApplyJobAnonymize} from '@/context/apply_job_anonymously'
import useTranslation from 'next-translate/useTranslation'
enum StepKey{
  First = 'first',
  Confirm = 'confirm'
}
interface Props {

}

export default function ApplyForJobProcessingStep(props: Props) {
  const applyJobAnonymously = useApplyJobAnonymize()

  const {t, lang} = useTranslation()
  return (
    <div className={styles.root}>
    <div className={styles.description}>
      {t('job_apply_form_type_processing_desc')}
    </div>
    </div>
  )
}
