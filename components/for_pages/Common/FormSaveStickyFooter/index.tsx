import FormStickyFooter, {FormStickyFooterProps} from '@/components/for_pages/Common/FormStickyFooter'
import Button from '@/components/ui/Button'

interface Props extends FormStickyFooterProps{
  loading?: boolean
}

export default function FormSaveStickyFooter(props: Props) {
  return (
    <FormStickyFooter boundaryElement={props.boundaryElement} formRef={props.formRef}>
      <Button spinner={props.loading ?? false} type='submit' styleType='large' color='green'>
        Save
      </Button>
    </FormStickyFooter>
  )
}
