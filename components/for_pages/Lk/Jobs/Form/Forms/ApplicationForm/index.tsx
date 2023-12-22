import styles from './index.module.scss'
import Card from '@/components/for_pages/Common/Card'
import InputField from '@/components/fields/InputField'
import Validator from '@/utils/validator'
import { FieldArray, FieldArrayRenderProps, FormikProps } from 'formik'
import CloseSvg from '@/components/svg/CloseSvg'
import { colors } from '@/styles/variables'
import AddSvg from '@/components/svg/AddSvg'
import {IVacancyFormData} from '@/components/for_pages/Lk/Jobs/Form'
import SwitchField from '@/components/fields/SwitchField'
import useTranslation from 'next-translate/useTranslation'

// Define a type for the Formik instance
type MyFormikType = FormikProps<IVacancyFormData>

interface Props {
  formik: MyFormikType
}

export default function ApplicationForm(props: Props) {
  const {t} = useTranslation()
  return (
    <div className={styles.root}>
      <Card title={<div className={styles.top}>
        <div className={styles.title}>{t('job_form_tab_app_section_contact')}</div>
        <SwitchField name={'contactPerson.visible'} />
      </div>}>
         {props.formik.values.contactPerson?.visible ?
          <InputField
            name='contactPerson.name'
            label={t('job_form_tab_app_field_contact_name')}
            validate={Validator.required}
          /> : <></>}
      </Card>
      <Card title={t('job_form_tab_app_section_hiring_stages')}>
        <FieldArray name={'hiringStagesDescriptions'}>
          {(arrayHelpers: FieldArrayRenderProps) => (
            <div className={styles.fields}>
              {(props.formik.values.hiringStagesDescriptions ?? []).map((i, index) => <div className={styles.field} key={index}>
                <div className={styles.label}>
                  <div className={styles.text}>Stage {index + 1}</div>
                  {index > 0 && <CloseSvg className={styles.remove}
                    color={colors.textSecondary} onClick={() => arrayHelpers.remove(index)} />}
                </div>
                <div className={styles.fieldWrapper}>
                  <InputField
                    className={styles.input}
                    key={index}
                    label={t('job_form_tab_app_field_hiring_stage_title')}
                    name={`hiringStagesDescriptions[${index}].title`}
                  />
                  <InputField
                    className={styles.input}
                    key={index}
                    label={t('job_form_tab_app_field_hiring_stage_description')}
                    name={`hiringStagesDescriptions[${index}].description`}
                  />
                </div>
              </div>
              )}
              <div className={styles.add} onClick={() => arrayHelpers.push({ title: '', description: '' })}>
                <AddSvg color={colors.green} />
                <div className={styles.desc}>{t('job_form_tab_app_add_stage')}</div>
              </div>
            </div>
          )}
        </FieldArray>

      </Card>
    </div>
  )
}
