import styles from './index.module.scss'
import Card from '@/components/for_pages/Common/Card'
import { FormikProps } from 'formik'
import { FormData } from '../..'
import Switch from '@/components/ui/Switch'
import { useState } from 'react'
import RichTextField from '@/components/fields/RichTextField'
import SelectField from '@/components/fields/SelectField'

// Define a type for the Formik instance
type MyFormikType = FormikProps<FormData>

interface Props {
  formik: MyFormikType
}

export default function WorkflowForm(props: Props) {

  const [replyApply, setReplyApply] = useState<boolean>(false)
  const [replyDecline, setReplyDecline] = useState<boolean>(false)

  return (
    <div className={styles.root}>
      <Card title='Settings'>
        <div className={styles.wrapper}>
          <div className={styles.line}>
            <SelectField label='CV' className={styles.select} name='cv' options={[]} />
            <SelectField label='Cover letter' className={styles.select} name='coverLetter' options={[]} />
          </div>
          <SelectField label='Application form language' className={styles.select} name='office' options={[]} />
        </div>
      </Card>
      <Card title={<div className={styles.top}>
        <div className={styles.title}>Automated reply when apply</div>
        <Switch checked={replyApply} onChange={() => setReplyApply(!replyApply)} />
      </div>}>
        {replyApply ? <RichTextField placeholder='Type your reply when apply' name='replyApply' /> : <></>}
      </Card>
      <Card title={<div className={styles.top}>
        <div className={styles.title}>Automated reply when decline</div>
        <Switch checked={replyDecline} onChange={() => setReplyDecline(!replyDecline)} />
      </div>}>
        {replyDecline ? <RichTextField placeholder='Type your reply when decline' name='replyDecline' /> : <></>}
      </Card>
    </div>
  )
}
