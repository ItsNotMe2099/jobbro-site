import styles from './index.module.scss'
import Card from '@/components/for_pages/Common/Card'
import InputField from '@/components/fields/InputField'
import Validator from '@/utils/validator'
import { FormikProps } from 'formik'
import { FormData } from '../..'
import Switch from '@/components/ui/Switch'
import { useState } from 'react'

// Define a type for the Formik instance
type MyFormikType = FormikProps<FormData>

interface Props {
  formik: MyFormikType
}

export default function ApplicationForm(props: Props) {

  const [person, setPerson] = useState<boolean>(false)

  return (
    <div className={styles.root}>
      <Card title={<div className={styles.top}>
        <div className={styles.title}>Contact Person</div>
        <Switch checked={person} onChange={() => setPerson(!person)} />
      </div>}>
        {person ?
          <InputField
            placeholder='Name'
            name='contact'
            label={props.formik.values.contact ? 'Name' : ''}
            labelType='in'
            validate={Validator.required}
          /> : <></>}
      </Card>
    </div>
  )
}
