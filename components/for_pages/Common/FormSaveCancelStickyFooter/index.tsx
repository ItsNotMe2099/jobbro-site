import FormStickyFooter, {FormStickyFooterProps} from '@/components/for_pages/Common/FormStickyFooter'
import Button from '@/components/ui/Button'
import useTranslation from 'next-translate/useTranslation'

interface Props extends FormStickyFooterProps{
  onCancel?: () => void
  loading?: boolean
}

export default function FormSaveCancelStickyFooter(props: Props) {
  const {t} = useTranslation()
  return (
    <FormStickyFooter boundaryElement={props.boundaryElement} formRef={props.formRef}>
      <Button spinner={props.loading ?? false} type='submit' styleType='large' color='green'>
        {t('form_button_save')}
      </Button>
      {props.onCancel ? <Button type={'button'} styleType='large' color='white' onClick={props.onCancel}>
        {t('form_button_cancel')}
      </Button> : <></>}
    </FormStickyFooter>
  )
}
