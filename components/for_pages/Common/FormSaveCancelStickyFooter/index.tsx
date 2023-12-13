import FormStickyFooter, {FormStickyFooterProps} from '@/components/for_pages/Common/FormStickyFooter'
import Button from '@/components/ui/Button'

interface Props extends FormStickyFooterProps{
  onCancel: () => void
  loading?: boolean
}

export default function FormSaveCancelStickyFooter(props: Props) {
  return (
    <FormStickyFooter boundaryElement={props.boundaryElement} formRef={props.formRef}>
      <Button spinner={props.loading ?? false} type='submit' styleType='large' color='green'>
        Save
      </Button>
      <Button type={'button'} styleType='large' color='white' onClick={() => props.onCancel()}>
        Cancel
      </Button>
    </FormStickyFooter>
  )
}
