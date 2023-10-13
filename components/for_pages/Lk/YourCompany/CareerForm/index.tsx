import styles from 'components/for_pages/Lk/YourCompany/CareerForm/index.module.scss'
import Card from '@/components/for_pages/Common/Card'
import {Form, FormikProvider, useFormik} from 'formik'
import InputField from '@/components/fields/InputField'
import CopySvg from '@/components/svg/CopySvg'
import {colors} from '@/styles/variables'
import FileField from '@/components/fields/Files/FileField'
import {FileUploadAcceptType, SnackbarType} from '@/types/enums'
import {useAppContext} from '@/context/state'
import {useCompanyOwnerContext} from '@/context/company_owner_state'
import {FormikHelpers} from 'formik/dist/types'
import {DeepPartial, Nullable, RequestError} from '@/types/types'
import {ICompany} from '@/data/interfaces/ICompany'
import {omit} from '@/utils/omit'
import IFile from '@/data/interfaces/IFile'
import {useRef} from 'react'
import FormStickyFooter from '@/components/for_pages/Common/FormStickyFooter'


interface IFormData {
  domain: Nullable<string>
  images: IFile[]
}

interface Props {

}

export default function CompanyCareerForm(props: Props) {
  const appContext = useAppContext()
  const companyOwnerContext = useCompanyOwnerContext()
  const ref = useRef<Nullable<HTMLFormElement>>(null)

  const handleSubmit = async (data: IFormData, formikHelpers: FormikHelpers<IFormData>) => {
    try {
      const submitData: DeepPartial<ICompany> = {
        ...omit(data, ['images']),
        imagesIds: data.images.map(i => i.id)
      }
      if (companyOwnerContext.company) {
        await companyOwnerContext.update(submitData)
      } else {
        await companyOwnerContext.create(submitData)
      }
    } catch (err) {

      if (err instanceof RequestError) {
        appContext.showSnackbar(err.message, SnackbarType.error)
      }

    }

  }

  const initialValues: IFormData = {
    domain: companyOwnerContext.company?.domain ?? null,
    images: companyOwnerContext.company?.images ?? [],
  }

  const formik = useFormik<IFormData>({
    initialValues,
    onSubmit: handleSubmit
  })
  const handleCopy = () => {
    navigator.clipboard.writeText('test')
    alert('Copied to clipboard')
  }

  return (
    <FormikProvider value={formik}>
      <Form  ref={ref} className={styles.root}>
        <Card title='Domain'>
          <InputField disabled name='domain'
                      prefix=
                        {<CopySvg onClick={() => handleCopy()} className={styles.copy}
                                  color={colors.simpleGrey}/>}/>
        </Card>
        <Card title='Image Gallery'>
          <div className={styles.wrapper}>
            <FileField
              isImage
              name='gallery'
              accept={[FileUploadAcceptType.Image]}
              text=
                {
                  <div className={styles.text}>
                    Drag & drop image upload<br/>You can use 5 images smaller than 3.5MB<br/> and at least 752px by
                    480px.</div>
                }
            />
            <div className={styles.why}>
              <div className={styles.title}>
                Why upload images?
              </div>
              <div className={styles.desc}>
                Showcasing images on your company<br/> profile is a great way to give candidates<br/> a feel for your
                culture and office space.
              </div>
            </div>
          </div>
        </Card>
        <FormStickyFooter boundaryElement={`.${styles.root}`} formRef={ref}/>
      </Form>
    </FormikProvider>
  )
}
