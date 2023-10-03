import styles from './index.module.scss'
import { Form, FormikProvider, useFormik } from 'formik'
import { SnackbarType } from '@/types/enums'
import {useRef, useState} from 'react'
import { RequestError } from '@/types/types'
import { useAppContext } from '@/context/state'
import { useRouter } from 'next/router'
import ItemWithText from '@/components/for_pages/Common/ItemWithText'
import DetailsForm from './Forms/DetailsForm'
import CareerForm from './Forms/CareerForm'
import TeamForm from './Forms/TeamForm'
import Offices from './Forms/Offices'
import FormStickyFooter from '@/components/for_pages/Common/FormStickyFooter'


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
  gallery: any[]
}

export default function YourCompanyForm(props: Props) {

  const appContext = useAppContext()
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  let ref = useRef<HTMLFormElement | null>(null)
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
    domain: 'Jobbro.com/companies/cuprum',
    gallery: []
  }

  const formik = useFormik<FormData>({
    initialValues,
    onSubmit: handleSubmit
  })

  const [form, setForm] = useState<'details' | 'career' | 'offices' | 'team'>('details')

  console.log('FORMIK', formik.values)

  return (
    <FormikProvider value={formik}>
      <Form ref={ref} className={styles.form}>

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
        {form === 'offices' && <Offices />}
        {form === 'team' && <TeamForm />}
        {(form === 'details' || form === 'career') &&   <FormStickyFooter boundaryElement={`.${styles.form}`} formRef={ref}/>}
      </Form>
    </FormikProvider>
  )
}
