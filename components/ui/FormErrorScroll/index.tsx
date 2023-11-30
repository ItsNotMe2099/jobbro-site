import {FormikProps} from 'formik'
import {useAppContext} from 'context/state'
import useFormErrorScroll from '@/components/hooks/useFormErrorScroll'

interface Props {
  formik: FormikProps<any>
}

export default function FormErrorScroll(props: Props) {
  const appContext = useAppContext()
  const offset = appContext.isMobile ? -50 : -64
  const res = useFormErrorScroll(props.formik, offset + -15 )
  return null
}

