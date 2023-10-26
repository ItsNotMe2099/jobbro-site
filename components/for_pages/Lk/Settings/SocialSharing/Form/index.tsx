import { Form, FormikProvider, useFormik } from 'formik'
import styles from './index.module.scss'
import Card from '@/components/for_pages/Common/Card'
import HexColorPickerField from '@/components/fields/HexColorPickerField'
import { useRef, useState } from 'react'
import JobAd from '@/components/for_pages/Common/JobAd'
import FormStickyFooter from '@/components/for_pages/Common/FormStickyFooter'
import Button from '@/components/ui/Button'
import { Nullable } from '@/types/types'

interface Props {
  color: string
  onChange?: (val: string) => void
}

export interface FormData {
  color: string
}

export default function SocialSharingForm(props: Props) {

  const handleSubmit = async (data: FormData) => {

  }

  const initialValues: FormData = {
    color: props.color
  }

  const formik = useFormik<FormData>({
    initialValues,
    onSubmit: handleSubmit
  })

  console.log('FORMIK', formik.values)

  const [visible, setVisible] = useState<boolean>(false)

  const handlePickColor = (val: string) => {
    props.onChange && props.onChange(val)
    setVisible(false)
  }

  const ref = useRef<Nullable<HTMLFormElement>>(null)

  return (
    <FormikProvider value={formik}>
      <Form className={styles.form}>
        <Card title={'Job ad image'}>
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
              <div className={styles.picker} onClick={() => setVisible(true)}>
                <div className={styles.color} style={{ backgroundColor: props.color }} />
                <div className={styles.hex}>{props.color}</div>
                {visible && <HexColorPickerField name='color'
                  className={styles.colors} onChange={handlePickColor} />}
              </div>
            </div>
            <div className={styles.text}>
              <div className={styles.title}>
                Preview
              </div>
              <div className={styles.desc}>
                This is how your job ad image will look when you share it
              </div>
            </div>
            <JobAd color={props.color} />
          </div>
        </Card>
        <FormStickyFooter boundaryElement={`.${styles.root}`} formRef={ref}>
          <Button spinner={false} type='submit' styleType='large' color='green'>
            Save
          </Button>
          <Button styleType='large' color='white'>
            Cancel
          </Button>
        </FormStickyFooter>
      </Form>
    </FormikProvider>
  )
}
