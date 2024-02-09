import { Form, FormikProvider, useFormik } from 'formik'
import styles from './index.module.scss'
import Card from '@/components/for_pages/Common/Card'
import HexColorPickerField from '@/components/fields/HexColorPickerField'
import { useRef, useState } from 'react'
import JobAd from '@/components/for_pages/Common/JobAd'
import { Nullable } from '@/types/types'
import {useVacancyShareSettingsContext} from '@/context/vacancy_sharing_settings_state'
import FormSaveStickyFooter from '@/components/for_pages/Common/FormSaveCancelStickyFooter'
import Spacer from '@/components/ui/Spacer'

interface Props {
}

export interface FormData {
  backgroundColor: string
}

export default function SocialSharingForm(props: Props) {
  const vacancyShareSettingsContext = useVacancyShareSettingsContext()
  const [visible, setVisible] = useState<boolean>(false)

  const handleSubmit = async (data: FormData) => {
    vacancyShareSettingsContext.saveSettings(data)
  }
  console.log('vacancyShareSettingsContext.settings', vacancyShareSettingsContext.settings)
  const initialValues: FormData = {
    backgroundColor: vacancyShareSettingsContext.settings?.backgroundColor ?? '#EBEBEB'
  }

  const formik = useFormik<FormData>({
    initialValues,
    onSubmit: handleSubmit
  })


  const ref = useRef<Nullable<HTMLFormElement>>(null)

  return (
    <FormikProvider value={formik}>
      <Form className={styles.form}>
        <Card title={'Job ad image'} className={styles.card}>
          <div className={styles.wrapper}>
            <div className={styles.top}>
              <div className={styles.text}>
                <div className={styles.title}>
                  Background colour
                </div>
                <div className={styles.desc}>
                  Personalise your ad with a colour that fits your brand
                </div>
              </div>
              <HexColorPickerField
                setVisible={() => setVisible(true)}
                name='backgroundColor'
                visible={visible}
              />
            </div>
            <div className={styles.text}>
              <div className={styles.title}>
                Preview
              </div>
              <div className={styles.desc}>
                This is how your job ad image will look when you share it
              </div>
            </div>
            <JobAd color={formik.values.backgroundColor} />
          </div>
        </Card>
        <Spacer basis={32}/>
        <FormSaveStickyFooter boundaryElement={`.${styles.form}`} formRef={ref}  loading={vacancyShareSettingsContext.editLoading}/>
      </Form>
    </FormikProvider>
  )
}
