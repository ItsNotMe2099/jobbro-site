import FormStickyFooter, {FormStickyFooterProps} from '@/components/for_pages/Common/FormStickyFooter'
import Button from '@/components/ui/Button'
import useTranslation from 'next-translate/useTranslation'

interface Props extends FormStickyFooterProps{
  loading?: boolean
}

export default function FormSaveStickyFooter(props: Props) {
  const {t} = useTranslation()
  return (
    <FormStickyFooter boundaryElement={props.boundaryElement} formRef={props.formRef}>
      <Button spinner={props.loading ?? false} type='submit' styleType='large' color='green'>
        {t('form_button_save')}
      </Button>
    </FormStickyFooter>
  )
}
