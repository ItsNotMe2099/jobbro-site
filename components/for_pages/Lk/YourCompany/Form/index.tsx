import styles from './index.module.scss'
import { Form, FormikProvider, useFormik } from 'formik'
import { SnackbarType } from '@/types/enums'
import { useState } from 'react'
import { RequestError } from '@/types/types'
import { useAppContext } from '@/context/state'
import { useRouter } from 'next/router'
import ItemWithText from '@/components/for_pages/Common/ItemWithText'
import Button from '@/components/ui/Button'
import EyeSvg from '@/components/svg/EyeSvg'
import { colors } from '@/styles/variables'
import DetailsForm from './Forms/DetailsForm'
import CareerForm from './Forms/CareerForm'
import TeamForm from './Forms/TeamForm'
import OfficesForm from './Forms/OfficesForm'


interface Props {

}

export interface FormData {
  companyName: string
  website: string
  numberOfEmployees: string
  industry: string
  about: string
  mission: string
  culture: string
  advantages: string
  domain: string
}

export default function YourCompanyForm(props: Props) {

  const appContext = useAppContext()
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)

  const handleSubmit = async (data: FormData) => {
    setLoading(true)
    try {

    } catch (err) {

      if (err instanceof RequestError) {
        appContext.showSnackbar(err.message, SnackbarType.error)
      }

    }


    setLoading(false)
  }

  const initialValues = {
    companyName: '',
    website: '',
    numberOfEmployees: '',
    industry: '',
    about: '',
    mission: '',
    culture: '',
    advantages: '',
    domain: 'Jobbro.com/companies/cuprum'
  }

  const formik = useFormik<FormData>({
    initialValues,
    onSubmit: handleSubmit
  })

  const [form, setForm] = useState<'details' | 'career' | 'offices' | 'team'>('details')

  console.log('FORMIK', formik.values)

  return (
    <FormikProvider value={formik}>
      <Form className={styles.form}>

        <div className={styles.switch}>
          <ItemWithText onClick={() => setForm('details')}
            className={styles.item} active={form === 'details'} text='Details' />
          <ItemWithText onClick={() => setForm('career')}
            className={styles.item} active={form === 'career'} text='Career page' />
          <ItemWithText onClick={() => setForm('offices')}
            className={styles.item} active={form === 'offices'} text='Offices' />
          <ItemWithText onClick={() => setForm('team')}
            className={styles.item} active={form === 'team'} text='Team' />
        </div>
        {form === 'details' && <DetailsForm formik={formik} />}
        {form === 'career' && <CareerForm formik={formik} />}
        {form === 'offices' && <OfficesForm />}
        {form === 'team' && <TeamForm />}
        {(form === 'details' || form === 'career') && <div className={styles.controls}>
          <Button type='submit' styleType='large' color='green'>
            Publish
          </Button>
          <Button styleType='large' color='white'>
            Save Template
          </Button>
          <div className={styles.preview}>
            <EyeSvg color={colors.green} className={styles.eye} />
            <div className={styles.text}>Preview</div>
          </div>
        </div>}
      </Form>
    </FormikProvider>
  )
}
