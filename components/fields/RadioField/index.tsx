import styles from './index.module.scss'
import { useField } from 'formik'
import RadioFieldItem from 'components/fields/RadioField/RadioFieldItem'
import { IField, IOption, RadioStyleType } from 'types/types'
import FieldError from 'components/fields/FieldError'
import classNames from 'classnames'


interface Props<T> extends IField<T> {
  options: IOption<T>[],
  label?: string
  disabled?: boolean
  styleType?: RadioStyleType
  errorClassName?: string
  onChange?: (value: T | undefined) => void
  listClassName?: string
  className?: string
  itemClassName?: string
}

export default function RadioField<T>(props: Props<T>) {
  const { options, label, disabled } = props
  const [field, meta, helpers] = useField(props as any)
  const { value } = field
  const showError = meta.touched && !!meta.error
  const handleCheckboxChanged = (value: T | undefined) => {
    if (disabled) {
      return
    }
    helpers.setTouched(true)
    helpers.setValue(value)
    props.onChange?.(value)
  }

  return (
    <div className={classNames(styles.root, props.className, {
      [styles.styleTiles]: props.styleType === 'tile',
      [styles.styleRow]: props.styleType === 'row'
    })} data-field={props.name}>
      {props.label && <div className={classNames({
        [styles.label]: true,
        [styles.hasError]: showError
      })} data-field-label={props.name}>{props.label}</div>}
      <div className={classNames(styles.list, props.listClassName)}>
        {options.map(item => (
          <RadioFieldItem
            key={`${item.value}`}
            isActive={item.value === value}
            value={item}
            disabled={item.disabled}
            label={item.label}
            description={item.description}
            styleType={props.styleType}
            className={props.itemClassName}
            onChange={() => handleCheckboxChanged(item.value)}
          />
        ))}
      </div>
      <FieldError className={classNames(props.errorClassName, styles.error)} showError={showError}>{meta.error}</FieldError>
    </div>
  )
}
