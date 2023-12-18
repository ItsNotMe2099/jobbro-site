import styles from './index.module.scss'
import {useState} from 'react'
import InputField from '@/components/fields/InputField'
import Validator from '@/utils/validator'
import {FileUploadAcceptType} from '@/types/enums'
import FileField from '@/components/fields/Files/FileField'
enum StepKey{
  First = 'first',
  Confirm = 'confirm'
}
interface Props {

}

export default function ApplyForJobFirstStep(props: Props) {
  const [step, setStep] = useState(StepKey.Confirm)
  return (
    <div className={styles.root}>
      <FileField
        name='cv'
        accept={[FileUploadAcceptType.Pdf]}
        disableUpload={true}
      />
      <FileField
        isImage
        name='image'
        accept={[FileUploadAcceptType.Image]}
        disableUpload={true}
      />
      <InputField name='name' label={'Name'}
                  validate={Validator.required} />
      <InputField name='email' label={'Email'}
                  validate={Validator.combine([Validator.requiredEmail, Validator.email])} />
    </div>
  )
}
