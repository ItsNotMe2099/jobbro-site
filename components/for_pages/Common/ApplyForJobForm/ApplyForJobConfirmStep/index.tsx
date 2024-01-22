import styles from './index.module.scss'
import Validator from '@/utils/validator'
import InputField from '@/components/fields/InputField'
import {useApplyJobAnonymize} from '@/context/apply_job_anonymously'
import CloseModalBtn from '@/components/ui/CloseModalBtn'
import {useAppContext} from '@/context/state'
import Button from '@/components/ui/Button'
enum StepKey{
  First = 'first',
  Confirm = 'confirm'
}
interface Props {

}

export default function ApplyForJobConfirmStep(props: Props) {
  const appContext = useAppContext()
  const applyJobAnonymize = useApplyJobAnonymize()
  const {isTabletWidth} = appContext.size
  return (
    <div className={styles.root}>
      <div className={styles.title}>
        Apply for job
        {isTabletWidth &&
          <CloseModalBtn onClick={appContext.hideModal}/>
        }
      </div>
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
        validate={Validator.required} />
      <Button spinner={applyJobAnonymize.sending} type='submit' className={styles.btn} fluid styleType='large'
              color='green'>
        Confirm
      </Button>
    </div>
  )
}
