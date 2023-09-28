import styles from './index.module.scss'
import Card from '@/components/for_pages/Common/Card'
import { FormikProps } from 'formik'
import { FormData } from '../..'
import InputField from '@/components/fields/InputField'
import CopySvg from '@/components/svg/CopySvg'
import { colors } from '@/styles/variables'

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
         prefix={<CopySvg onClick={() => handleCopy(props.formik.values.domain)} className={styles.copy} color={colors.simpleGrey} />} />
      </Card>
    </div>
  )
}
