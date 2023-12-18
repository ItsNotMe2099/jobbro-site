import styles from './index.module.scss'
import {useApplyJobAnonymize} from '@/context/apply_job_anonymously'
enum StepKey{
  First = 'first',
  Confirm = 'confirm'
}
interface Props {

}

export default function ApplyForJobRequestStep(props: Props) {
  const applyJobAnonymously = useApplyJobAnonymize()

  return (
    <div className={styles.root}>
    <div className={styles.description}>
      Your application has been accepted and has started processing. This usually takes between 2 and 3 minutes.
    </div>
    </div>
  )
}
