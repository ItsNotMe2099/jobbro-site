import styles from './index.module.scss'
import Card from '@/components/for_pages/Common/Card'
import { Form, FormikProvider, useFormik } from 'formik'
import { Nullable } from '@/types/types'
import { useRef } from 'react'
import FormStickyFooter from '@/components/for_pages/Common/FormStickyFooter'
import Button from '@/components/ui/Button'
import InputField from '@/components/fields/InputField'


interface IFormData {
  link: string
}

interface Props {
  onPreview?: () => void
  preview?: boolean
}

export default function SettingsForm(props: Props) {
  const ref = useRef<Nullable<HTMLFormElement>>(null)

  const handleSubmit = async (data: IFormData) => {


  }

  const initialValues: IFormData = {
    link: 'https://www.linkedin.com/in/pavel-antizerskiy'
  }

  const formik = useFormik<IFormData>({
    initialValues,
    onSubmit: handleSubmit
  })


  return (
    <FormikProvider value={formik}>
      <Form ref={ref} className={styles.root}>
        <Card>
          <div className={styles.title}>
            Professional link
          </div>
          <InputField label='LinkedIn' name='link' />
        </Card>
        <Card>
          <div className={styles.title}>
            Account deletion
          </div>
          <div className={styles.desc}>
            This section allows you to permanently remove your account from our platform. If you no longer wish to use our services, you can initiate the account deletion process here. Please note that this action is irreversible and will result in the deletion of all your personal data associated with the
            account.
          </div>
          <div className={styles.more}>
            Show more
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
