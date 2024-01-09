import { Form, FormikProvider, useFormik } from 'formik'
import styles from './index.module.scss'
import Card from '@/components/for_pages/Common/Card'
import InputField from '@/components/fields/InputField'
import Validator from '@/utils/validator'
import SelectField from '@/components/fields/SelectField'
import CheckBoxField from '@/components/fields/CheckBoxField'

interface Props {

}

export interface FormData {
  email: string
  company: string
  postalCode: string
  country: string
  city: string
  address: string
  vatid: string
  cardNumber: string
  expiryDate: string
  cvv: string
  default: boolean
}

export default function PaymentMethodForm(props: Props) {

  const handleSubmit = async (data: FormData) => {

  }

  const initialValues: FormData = {
    email: '',
    company: '',
    postalCode: '',
    country: '',
    city: '',
    address: '',
    vatid: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    default: true
  }

  const formik = useFormik<FormData>({
    initialValues,
    onSubmit: handleSubmit
  })


  return (
    <FormikProvider value={formik}>
      <Form className={styles.form}>
        <Card title={'Information'}>
          <div className={styles.card}>
            <div className={styles.line}>
              <InputField name='email' validate={Validator.email} placeholder='Email' />
              <InputField name='company' placeholder='Company' />
            </div>
            <div className={styles.line}>
              <SelectField className={styles.select} name='country' options={[]} placeholder='Country' />
              <InputField name='postalCode' placeholder='Postal Code' />
            </div>
            <InputField name='city' placeholder='City' />
            <InputField name='address' placeholder='Address' />
            <InputField name='vatid' placeholder='VAT ID' />
          </div>
        </Card>
        <Card title={'Method'}>
          <div className={styles.card}>
            <InputField name='cardNumber' placeholder='Card number' />
            <div className={styles.line}>
              <InputField name='expiryDate' placeholder='Expiry date' />
              <InputField name='cvv' placeholder='CVV' />
            </div>
            <CheckBoxField name='default' checked={formik.values.default} label='Set as default payment method'/>
          </div>
        </Card>
      </Form>
    </FormikProvider>
  )
}
