import styles from './index.module.scss'
import Card from '@/components/for_pages/Common/Card'
import { FormikProps } from 'formik'
import { FormData } from '../..'
import InputField from '@/components/fields/InputField'
import CopySvg from '@/components/svg/CopySvg'
import { colors } from '@/styles/variables'
import FileField from '@/components/fields/Files/FileField'
import { FileUploadAcceptType } from '@/types/enums'

// Define a type for the Formik instance
type MyFormikType = FormikProps<FormData>

interface Props {
  formik: MyFormikType
}

export default function CareerForm(props: Props) {

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    alert('Copied to clipboard')
  }

  return (
    <div className={styles.root}>
      <Card title='Domain'>
        <InputField disabled name='domain'
          prefix=
          {<CopySvg onClick={() => handleCopy(props.formik.values.domain)} className={styles.copy} color={colors.simpleGrey} />} />
      </Card>
      <Card title='Image Gallery'>
        <div className={styles.wrapper}>
          <FileField
            isImage
            name='passport.scan'
            accept={[FileUploadAcceptType.Image]}
            text=
            {
              <div className={styles.text}>
                Drag & drop image upload<br />You can use 5 images smaller than 3.5MB<br /> and at least 752px by 480px.</div>
            }
          />
          <div className={styles.why}>
            <div className={styles.title}>
              Why upload images?
            </div>
            <div className={styles.desc}>
              Showcasing images on your company<br /> profile is a great way to give candidates<br /> a feel for your culture and office space.
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
