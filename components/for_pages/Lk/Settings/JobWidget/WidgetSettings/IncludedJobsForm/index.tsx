import styles from './index.module.scss'
import { Form, FormikProvider, useFormik } from 'formik'
import { Nullable } from '@/types/types'
import { useRef } from 'react'
import FormStickyFooter from '@/components/for_pages/Common/FormStickyFooter'
import Button from '@/components/ui/Button'
import EyeSvg from '@/components/svg/EyeSvg'
import { colors } from '@/styles/variables'
import NoEyeSvg from '@/components/svg/NoEyeSvg'


interface IFormData {

}

interface Props {
  onPreview?: () => void
  preview?: boolean
}

export default function IncludedJobsForm(props: Props) {
  const ref = useRef<Nullable<HTMLFormElement>>(null)

  const handleSubmit = async (data: IFormData) => {


  }

  const initialValues: IFormData = {

  }

  const formik = useFormik<IFormData>({
    initialValues,
    onSubmit: handleSubmit
  })

  console.log(formik.values)

  return (
    <FormikProvider value={formik}>
      <Form ref={ref} className={styles.root}>

        <FormStickyFooter boundaryElement={`.${styles.root}`} formRef={ref}>
          <Button spinner={false} type='submit' styleType='large' color='green'>
            Save
          </Button>
          <Button styleType='large' color='white'>
            Cancel
          </Button>
          <div className={styles.preview} onClick={props.onPreview}>
            {!props.preview ? <EyeSvg color={colors.green} className={styles.eye} />
              :
              <NoEyeSvg color={colors.green} className={styles.eye} />
            }
            {!props.preview ? <div className={styles.text}>Preview</div>
              :
              <div className={styles.text}>Close Preview Mode</div>
            }
          </div>
        </FormStickyFooter>
      </Form>
    </FormikProvider>
  )
}
