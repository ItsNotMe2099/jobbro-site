import styles from './index.module.scss'
import Card from '@/components/for_pages/Common/Card'
import { FormikProps } from 'formik'
import RichTextField from '@/components/fields/RichTextField'
import SelectField from '@/components/fields/SelectField'
import SwitchField from '@/components/fields/SwitchField'
import {IVacancyFormData} from '@/components/for_pages/Lk/Jobs/Form'
import Dictionary from '@/utils/Dictionary'
import {ApplicationInfoRequirements} from '@/data/enum/ApplicationInfoRequirements'

// Define a type for the Formik instance
type MyFormikType = FormikProps<IVacancyFormData>

interface Props {
  formik: MyFormikType
}

export default function WorkflowForm(props: Props) {
  return (
    <div className={styles.root}>
      <Card title='Settings'>
        <div className={styles.wrapper}>
          <div className={styles.line}>
            <SelectField<ApplicationInfoRequirements> label='CV' className={styles.select} name='cvRequired' options={Dictionary.getApplicationInfoRequirementsOptions()} />
            <SelectField<ApplicationInfoRequirements> label='Cover letter' className={styles.select} name='coverLetterRequired' options={Dictionary.getApplicationInfoRequirementsOptions()} />
          </div>
          <SelectField label='Application form language' className={styles.select} name='applicationFormLanguage' options={[]} />
        </div>
      </Card>
      <Card title={<div className={styles.top}>
        <div className={styles.title}>Automated reply when apply</div>
        <SwitchField name={'applyAutoMessage.enabled'} />
      </div>}>
        {props.formik.values.applyAutoMessage?.enabled ? <RichTextField placeholder='Type your reply when apply' name='applyAutoMessage.template' /> : <></>}
      </Card>
      <Card title={<div className={styles.top}>
        <div className={styles.title}>Automated reply when decline</div>
        <SwitchField name={'declineAutoMessage.enabled'} />
      </div>}>
        {props.formik.values.declineAutoMessage?.enabled ? <RichTextField placeholder='Type your reply when decline' name='declineAutoMessage.template' /> : <></>}
      </Card>
    </div>
  )
}
