import { useField } from 'formik'
import styles from 'components/fields/CheckBoxField/index.module.scss'
import { IField } from '@/types/types'
// @ts-ignore
import usePressAndHover from '@/components/hooks/usePressAndHover'
import CheckboxWithLabel from '@/components/ui/CheckboxWithLabel'
import {ReactElement} from 'react'

interface Props extends IField<boolean> {
  label?: string | ReactElement
  checked?: boolean
  disabled?: boolean
  onChange?: (val: boolean) => void
}

const CheckBoxField = (props: Props) => {
  const [field, meta, helpers] = useField(props as any)
  const [ref, press, hover] = usePressAndHover()
  const showError = meta.touched && !!meta.error

  const handleChange = () => {
    helpers.setTouched(true)
    helpers.setValue(!field.value)
    props.onChange?.(!field.value)
  }
  return (
    <div ref={ref} className={styles.root} onClick={handleChange} data-field={props.name}>
      <CheckboxWithLabel label={props.label} checked={field.value} onClick={handleChange} showError={showError}/>
    </div>

  )
}
export default CheckBoxField
