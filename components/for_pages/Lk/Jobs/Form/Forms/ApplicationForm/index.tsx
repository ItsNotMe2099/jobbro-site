import styles from './index.module.scss'
import Card from '@/components/for_pages/Common/Card'
import InputField from '@/components/fields/InputField'
import Validator from '@/utils/validator'
import { FieldArray, FieldArrayRenderProps, FormikProps } from 'formik'
import { FormData } from '../..'
import Switch from '@/components/ui/Switch'
import { useState } from 'react'
import CloseSvg from '@/components/svg/CloseSvg'
import { colors } from '@/styles/variables'
import AddSvg from '@/components/svg/AddSvg'

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
      <Card title='Hiring Stages'>
        <FieldArray name={'stages'}>
          {(arrayHelpers: FieldArrayRenderProps) => (
            <div className={styles.fields}>
              {(props.formik.values.stages ?? []).map((i, index) => <div className={styles.field} key={index}>
                <div className={styles.label}>
                  <div className={styles.text}>Stage {index + 1}</div>
                  {index > 0 && <CloseSvg className={styles.remove}
                    color={colors.textSecondary} onClick={() => arrayHelpers.remove(index)} />}
                </div>
                <div className={styles.fieldWrapper}>
                  <InputField
                    className={styles.input}
                    key={index}
                    placeholder='Title'
                    label={props.formik.values.stages[index].title ? 'Title' : ''}
                    labelType='in'
                    name={`stages[${index}].title`}
                  />
                  <InputField
                    className={styles.input}
                    key={index}
                    placeholder='Description'
                    label={props.formik.values.stages[index].desc ? 'Description' : ''}
                    labelType='in'
                    name={`stages[${index}].desc`}
                  />
                </div>
              </div>
              )}
              <div className={styles.add} onClick={() => arrayHelpers.push({ tilte: '', desc: '' })}>
                <AddSvg color={colors.green} />
                <div className={styles.desc}>Add Stage</div>
              </div>
            </div>
          )}
        </FieldArray>
      </Card>
    </div>
  )
}
