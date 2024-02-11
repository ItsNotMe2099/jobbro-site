import styles from './index.module.scss'
import Validator from '@/utils/validator'
import InputField from '@/components/fields/InputField'
import {useApplyJobAnonymize} from '@/context/apply_job_anonymously'
import {useAppContext} from '@/context/state'
import useTranslation from 'next-translate/useTranslation'
enum StepKey{
  First = 'first',
  Confirm = 'confirm'
}
interface Props {

}

export default function ApplyForJobConfirmStep(props: Props) {
  const appContext = useAppContext()
  const applyJobAnonymize = useApplyJobAnonymize()
  const {t} = useTranslation()
  return (
    <div className={styles.root}>
      <div className={styles.description}>
        {t('job_apply_form_type_confirm_desc_1', {email: applyJobAnonymize.formData?.email})}
        <br/>
        <br/>
        {t('job_apply_form_type_confirm_desc_2')}
      </div>
      <InputField
        label= {t('job_apply_form_type_confirm_field_code')}
        type='password'
        name='code'
        obscure
        validate={Validator.required} />
    </div>
  )
}
