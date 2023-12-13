import styles from './index.module.scss'
import { useField } from 'formik'
import { IField, IOption, RadioStyleType } from 'types/types'
import FieldError from 'components/fields/FieldError'
import classNames from 'classnames'
import CheckboxWithLabel from '@/components/ui/CheckboxWithLabel'
import FieldLabel, {LabelStyleType} from '@/components/fields/FieldLabel'


interface Props<T> extends IField<T[]> {
  options: IOption<T>[],
  label?: string
  labelStyleType?: LabelStyleType
  disabled?: boolean
  styleType?: RadioStyleType
  errorClassName?: string
  onChange?: (value: T[] | undefined) => void
}

export default function CheckboxMultipleField<T>(props: Props<T>) {
  const { options, label, disabled } = props
  const [field, meta, helpers] = useField(props as any)
  const { value } = field
  const showError = meta.touched && !!meta.error
  const handleCheckboxChanged = (value: T | undefined) => {
    console.log('handleCheckboxChanged', value)
    if (disabled) {
      return
    }
    let newValue = field.value
    if(field.value.includes(value)){
      newValue = field.value.filter((i: any) => i as any !== value as any)
    }else{
      newValue = [...field.value, value]
    }
    helpers.setTouched(true)
    helpers.setValue(newValue)
    props.onChange?.(newValue)
  }

  return (
    <div className={classNames(styles.root, {
      [styles.styleTiles]: props.styleType === 'tile',
      [styles.styleRow]: props.styleType === 'row'
    })} data-field={props.name}>
      {props.label &&
        <FieldLabel label={props.label} styleType={props.labelStyleType} />
      }
      <div className={styles.list}>
        {options.map(item => (
          <CheckboxWithLabel label={item.label} checked={field.value.includes(item.value)} onClick={() => handleCheckboxChanged(item.value)} />
        ))}
      </div>
      <FieldError className={classNames(props.errorClassName, styles.error)} showError={showError}>{meta.error}</FieldError>
    </div>
  )
}
