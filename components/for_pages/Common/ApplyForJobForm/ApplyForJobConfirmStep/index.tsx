import styles from './index.module.scss'
import Validator from '@/utils/validator'
import InputField from '@/components/fields/InputField'
import {useApplyJobAnonymize} from '@/context/apply_job_anonymously'
enum StepKey{
  First = 'first',
  Confirm = 'confirm'
}
interface Props {

}

export default function ApplyForJobConfirmStep(props: Props) {
  const applyJobAnonymize = useApplyJobAnonymize()
  return (
    <div className={styles.root}>
      <div className={styles.description}>
        We have sent a confirmation code to {applyJobAnonymize.formData?.email}.
        <br/>
        <br/>
        After confirmation, the application will be accepted.
      </div>
      <InputField
        label='Code'
        type='password'
        name='code'
        obscure
        validate={Validator.requiredPassword} />
    </div>
  )
}
