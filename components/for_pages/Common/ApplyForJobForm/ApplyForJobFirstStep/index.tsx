import styles from './index.module.scss'
import InputField from '@/components/fields/InputField'
import Validator from '@/utils/validator'
import {FileUploadAcceptType} from '@/types/enums'
import FileField from '@/components/fields/Files/FileField'
import useTranslation from 'next-translate/useTranslation'
import {useAppContext} from '@/context/state'
enum StepKey{
  First = 'first',
  Confirm = 'confirm'
}
interface Props {

}

export default function ApplyForJobFirstStep(props: Props) {
  const appContext = useAppContext()
  const {t, lang} = useTranslation()
  return (
    <div className={styles.root}>
      <FileField
        name='cv'
        accept={[FileUploadAcceptType.Pdf]}
        description={<div>{t('job_apply_form_type_apply_field_resume')}</div>}
        disableUpload={true}
        validate={Validator.required}
        dropZoneClassName={styles.dropZone}
      />
      <FileField
        isImage
        name='image'
        withCrop
        accept={[FileUploadAcceptType.Image]}
        description={t('job_apply_form_type_apply_field_avatar')}
        disableUpload={true}
        dropZoneClassName={styles.dropZone}
        validate={Validator.required}
      />
      <InputField name='name' label={t('job_apply_form_type_apply_field_name')}
                  validate={Validator.required} />
      <InputField name='email' label={t('job_apply_form_type_apply_field_email')}
                  validate={Validator.combine([Validator.requiredEmail, Validator.email])} />
    </div>
  )
}
