import styles from './index.module.scss'
import InputField from '@/components/fields/InputField'
import Validator from '@/utils/validator'
import {FileUploadAcceptType} from '@/types/enums'
import FileField from '@/components/fields/Files/FileField'
import useTranslation from 'next-translate/useTranslation'
import {useAppContext} from '@/context/state'
import Button from '@/components/ui/Button'
import {useApplyJobAnonymize} from '@/context/apply_job_anonymously'
enum StepKey{
  First = 'first',
  Confirm = 'confirm'
}
interface Props {

}

export default function ApplyForJobFirstStep(props: Props) {
  const appContext = useAppContext()
  const {t, lang} = useTranslation()
  const applyJobAnonymize = useApplyJobAnonymize()
  const {isTabletWidth} = appContext.size
  return (
    <div className={styles.root}>
      <FileField
        name='cv'
        accept={[FileUploadAcceptType.Pdf]}
        description={<p>Drag & drop pdf file to upload</p>}
        disableUpload={true}
        validate={Validator.required}
      />
      <FileField
        isImage
        name='image'
        withCrop
        description={<p>Drag & drop image upload. <br /> You can use image smaller than 3.5MB and at least 752px by 480px.</p>}
        dropZoneClassName={styles.dropZone}
        accept={[FileUploadAcceptType.Image]}
        disableUpload={true}
        validate={Validator.required}
      />
      <InputField name='name' label={'Name'}
                  validate={Validator.required} />
      <InputField name='email' label={'Email'}
                  validate={Validator.combine([Validator.requiredEmail, Validator.email])} />

      <div className={styles.privacy}>
        By pressing &quot;Apply&quot; you agree with  <a href={ lang === 'id' ? 'https://drive.google.com/file/d/1VpKHbMqnj_f91gaiZJcKfVKGRjRx2t0m/view?usp=sharing' : 'https://drive.google.com/file/d/1sAVdJWQR94WXVi4-ILKhIyis3QpC4vSK/view?usp=sharing'} target={'_blank'}>privacy</a>
      </div>
      <Button spinner={applyJobAnonymize.sending} type='submit' className={styles.btn} fluid styleType='large'
              color='green'>
        Apply
      </Button>
    </div>
  )
}
