import styles from './index.module.scss'
import {Form, FormikProvider, useFormik} from 'formik'
import {useAppContext} from '@/context/state'
import {DeepPartial, Nullable, RequestError} from '@/types/types'
import {SnackbarType} from '@/types/enums'
import CountryField from '@/components/fields/CountryField'
import Card from '@/components/for_pages/Common/Card'
import InputField from '@/components/fields/InputField'
import {useOfficeOwnerContext} from '@/context/office_owner_state'
import {FormikHelpers} from 'formik/dist/types'
import {IOffice} from '@/data/interfaces/IOffice'
import CityField from '@/components/fields/CityField'
import {useRef} from 'react'
import Validator from '@/utils/validator'
import {useRouter} from 'next/router'
import {Routes} from '@/types/routes'
import {useCompanyOwnerContext} from '@/context/company_owner_state'
import {IGeoName} from '@/data/interfaces/ILocation'
import FormSaveStickyFooter from '@/components/for_pages/Common/FormSaveCancelStickyFooter'
import {omit} from '@/utils/omit'
import FormErrorScroll from '@/components/ui/FormErrorScroll'

interface Props {

}

export interface IFormData {
  name: Nullable<string>
  country: Nullable<IGeoName>
  city: Nullable<IGeoName>
  postalCode: Nullable<string>
  street: Nullable<string>
  house: Nullable<string>
}

export default function CompanyOfficeForm(props: Props) {
  const officeContext = useOfficeOwnerContext()
  const companyOwnerContext = useCompanyOwnerContext()
  const appContext = useAppContext()
  const router = useRouter()
  const ref = useRef<Nullable<HTMLFormElement>>(null)

  const handleSubmit = async (data: IFormData, formikHelpers: FormikHelpers<IFormData>) => {
    const newData: DeepPartial<IOffice> = {...omit(data, ['country', 'city']), countryId: data.country?.geonameid, cityId: data.city?.geonameid}
    try {
      if (officeContext.office) {
        await officeContext.update(newData)
      } else {
        await officeContext.create({...newData, companyId: companyOwnerContext.company?.id} as DeepPartial<IOffice>)
      }
    await router.push(Routes.lkCompanyOffices)
    } catch (err) {

      if (err instanceof RequestError) {
        appContext.showSnackbar(err.message, SnackbarType.error)
      }

    }

  }
  const handleCancel = () => {
     router.replace(Routes.lkCompanyOffices)

  }
  const initialValues: IFormData = {
    name: officeContext.office?.name ?? null,
    country: officeContext.office?.country ?? null,
    city: officeContext.office?.city ?? null,
    postalCode: officeContext.office?.postalCode ?? null,
    street: officeContext.office?.street ?? null,
    house: officeContext.office?.house ?? null,
  }

  const formik = useFormik<IFormData>({
    initialValues,
    onSubmit: handleSubmit
  })
  console.log('Country11', formik.values.country)
  return (
    <FormikProvider value={formik}>
      <Form ref={ref} className={styles.root}>
        <FormErrorScroll formik={formik} />
        <Card className={styles.card} title='Details'>
            <InputField name={'name'} label={'Office name'} validate={Validator.required}/>
            <div className={styles.columns}>
              <CountryField name={'country'} validate={Validator.required}/>
              <InputField name={'postalCode'} label={'Postal code'}/>
            </div>
            <CityField name={'city'} country={formik.values.country?.country}/>
            <div className={styles.columns}>
              <InputField name={'street'} label={'Street name'}/>
              <InputField name={'house'} label={'House number'}/>
            </div>
        </Card>
        <FormSaveStickyFooter boundaryElement={`.${styles.root}`} formRef={ref} onCancel={handleCancel} loading={officeContext.editLoading}/>
      </Form>
    </FormikProvider>
  )
}
