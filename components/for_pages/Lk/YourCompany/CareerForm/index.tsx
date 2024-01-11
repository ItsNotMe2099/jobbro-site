import styles from './index.module.scss'
import Card from '@/components/for_pages/Common/Card'
import {Form, FormikProvider, useFormik} from 'formik'
import InputField from '@/components/fields/InputField'
import CopySvg from '@/components/svg/CopySvg'
import {colors} from '@/styles/variables'
import {FileUploadAcceptType, SnackbarType} from '@/types/enums'
import {useAppContext} from '@/context/state'
import {useCompanyOwnerContext} from '@/context/company_owner_state'
import {FormikHelpers} from 'formik/dist/types'
import {DeepPartial, Nullable, RequestError} from '@/types/types'
import {ICompany} from '@/data/interfaces/ICompany'
import {omit} from '@/utils/omit'
import IFile from '@/data/interfaces/IFile'
import {useRef} from 'react'
import FileListField from '@/components/fields/Files/FileListField'
import FormSaveStickyFooter from '@/components/for_pages/Common/FormSaveStickyFooter'
import useTranslation from 'next-translate/useTranslation'
import showToast from '@/utils/showToast'


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
  const {t} = useTranslation()
  const handleSubmit = async (data: IFormData, formikHelpers: FormikHelpers<IFormData>) => {
    try {
      const submitData: DeepPartial<ICompany> = {
        ...omit(data, ['images']),
        imagesIds: data.images.map(i => i.id)
      }
      if (companyOwnerContext.company) {
        await companyOwnerContext.update(submitData)
        showToast({title: t('toast_company_career_edited_title'), text: t('toast_company_career_edited_desc')})

      } else {
        await companyOwnerContext.create(submitData)
        showToast({title: t('toast_company_created_title'), text: t('toast_company_created_desc')})

      }
    } catch (err) {
      // console.error(err)
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
        <Card title={t('company_career_form_section_domain')}>
          <InputField disabled name='domain'
                      prefix=
                        {<CopySvg onClick={() => handleCopy()} className={styles.copy}
                                  color={colors.simpleGrey}/>}/>
        </Card>
        <Card title={t('company_career_form_section_gallery')}>
          <div className={styles.wrapper}>
            <FileListField
              isImage
              name='images'
              accept={[FileUploadAcceptType.Image]}
              className={styles.dropZone}
              fileListClassName={styles.fileList}
              dropzoneTitle=
                {
                  <div className={styles.text}>
                    Drag & drop image upload<br/>You can use 5 images smaller than 3.5MB<br/> and at least 752px by
                    480px.</div>
                }
            />
            <div className={styles.why}>
              <div className={styles.title}>
                {t('company_career_form_why_upload')}
              </div>
              <div className={styles.desc}>
                {t('company_career_form_why_upload_desc_1')}
              </div>
            </div>
          </div>
        </Card>
        <FormSaveStickyFooter boundaryElement={`.${styles.root}`} formRef={ref} loading={companyOwnerContext.editLoading}/>
      </Form>
    </FormikProvider>
  )
}
