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
  title: string
  text: string
  btnText: string
}

export default function ApplyForJobFirstStep(props: Props) {
  const [step, setStep] = useState(StepKey.Confirm)
  return (
    <div className={styles.root}>
      <FileField
        className={styles.file}
        name='cv'
        accept={[FileUploadAcceptType.Pdf]}
        disableUpload={true}
        dropzoneTitle=
          {
            <div className={styles.text}>
              Drag & drop image upload<br/>You can use 1 images smaller than 3.5MB and at least 752px by
              480px.</div>
          }
      />
      <FileField
        className={styles.file}
        isImage
        name='image'
        accept={[FileUploadAcceptType.Image]}
        dropzoneTitle=
          {
            <div className={styles.text}>
              Drag & drop image upload<br/>You can use 1 images smaller than 3.5MB and at least 752px by
              480px.</div>
          }
      />
      <InputField name='name' label={'Name'}
                  validate={Validator.required} />
      <InputField name='email' label={'Email'}
                  validate={Validator.combine([Validator.requiredEmail, Validator.email])} />
    </div>
  )
}
