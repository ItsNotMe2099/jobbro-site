import styles from 'components/for_pages/Lk/YourCompany/DetailsForm/index.module.scss'
import Card from '@/components/for_pages/Common/Card'
import InputField from '@/components/fields/InputField'
import SelectField from '@/components/fields/SelectField'
import RichTextField from '@/components/fields/RichTextField'
import {DeepPartial, Nullable, RequestError} from '@/types/types'
import {SnackbarType} from '@/types/enums'
import { Form, FormikProvider, useFormik } from 'formik'
import {IBenefit} from '@/data/interfaces/IBenefit'
import IFile from '@/data/interfaces/IFile'
import {useCompanyOwnerContext} from '@/context/company_owner_state'
import SwitchField from '@/components/fields/SwitchField'
import {FormikHelpers} from 'formik/dist/types'
import {omit} from '@/utils/omit'
import {ICompany} from '@/data/interfaces/ICompany'
import {useAppContext} from '@/context/state'
import FormStickyFooter from '@/components/for_pages/Common/FormStickyFooter'
import {useRef} from 'react'
import CountryField from '@/components/fields/CountryField'

interface IFormData {
  name: Nullable<string>
  url: Nullable<string>
  employeesCount: Nullable<number>
  industryId: Nullable<number>
  countryId: Nullable<number>
  about: {description: Nullable<string>, visible: boolean}
  mission: {description: Nullable<string>, visible: boolean}
  culture: {description: Nullable<string>, visible: boolean}
  advantages: {description: Nullable<string>, visible: boolean}
  benefits: IBenefit[]
  domain: Nullable<string>
  images: IFile[]
}
interface Props {

}

export default function CompanyDetailsForm(props: Props) {
  const appContext = useAppContext()
  const companyOwnerContext = useCompanyOwnerContext()
  const ref = useRef<Nullable<HTMLFormElement>>(null)
  const handleSubmit = async (data: IFormData, formikHelpers: FormikHelpers<IFormData>) => {
    console.log('handleSubmit')
    try {
      const submitData: DeepPartial<ICompany> = {
        ...omit(data, ['benefits', 'images']),
        benefitsIds: data.benefits.map(i => i.id)
      } as DeepPartial<ICompany>

      if(companyOwnerContext.company){
        await companyOwnerContext.update(submitData)
      }else{
        console.log('dsdsad')
        await companyOwnerContext.create(submitData)
      }
    } catch (err) {
      console.error(err)
      if (err instanceof RequestError) {
        appContext.showSnackbar(err.message, SnackbarType.error)
      }

    }

  }

  const initialValues: IFormData = {
    name: companyOwnerContext.company?.name ?? '',
    url: companyOwnerContext.company?.url ?? '',
    employeesCount: companyOwnerContext.company?.employeesCount ?? null,
    industryId: companyOwnerContext.company?.industryId ?? null,
    countryId: companyOwnerContext.company?.countryId ?? null,
    about: companyOwnerContext.company?.about ?? {description: null, visible: false},
    mission: companyOwnerContext.company?.mission ?? {description: null, visible: false},
    culture: companyOwnerContext.company?.culture ?? {description: null, visible: false},
    advantages: companyOwnerContext.company?.advantages ?? {description: null, visible: false},
    benefits: companyOwnerContext.company?.benefits ?? [],
    domain: companyOwnerContext.company?.domain ?? null,
    images: companyOwnerContext.company?.images ?? [],
  }

  const formik = useFormik<IFormData>({
    initialValues,
    onSubmit: handleSubmit
  })
  return (
    <FormikProvider value={formik}>
      <Form ref={ref} className={styles.root}>
          <Card title='Details'>
            <div className={styles.wrapper}>
              <InputField
                className={styles.select}
                label='Company name' name='name'
                />
              <InputField
                className={styles.select}
                label='Website' name='url'
                />
              <SelectField placeholder='Number of employees' className={styles.select} name='employeesCount'
                           options={[]}/>
              <InputField placeholder='Industry' className={styles.select} name='industryId' />
              <CountryField placeholder='Country' className={styles.select} name='countryId'/>
            </div>
          </Card>
          <Card title={<div className={styles.top}>
            <div className={styles.title}>About</div>
            <SwitchField name={'about.visible'}/>
          </div>}>
            {formik.values.about.visible && <RichTextField name='about.description'/>}

          </Card>
          <Card title={<div className={styles.top}>
            <div className={styles.title}>Mission</div>
            <SwitchField name={'mission.visible'}/>
          </div>}>
            {formik.values.mission.visible && <RichTextField name='mission.description'/>}
          </Card>
          <Card title={<div className={styles.top}>
            <div className={styles.title}>Culture</div>
            <SwitchField name={'culture.visible'}/>
          </div>}>
            {formik.values.culture.visible && <RichTextField name='culture.description'/>}
          </Card>
          <Card title={<div className={styles.top}>
            <div className={styles.title}>Advantages</div>
            <SwitchField name={'advantages.visible'}/>
          </div>}>
            {formik.values.advantages.visible && <RichTextField name='advantages.description'/>}
          </Card>
        <FormStickyFooter boundaryElement={`.${styles.root}`} formRef={ref}/>
      </Form>
    </FormikProvider>
  )
}
