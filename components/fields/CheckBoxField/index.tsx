import { useField } from 'formik'
import styles from 'components/fields/CheckBoxField/index.module.scss'
import { IField } from '@/types/types'
// @ts-ignore
import CheckBoxSvg from '@/components/svg/CheckBoxSvg'
import classNames from 'classnames'
import usePressAndHover from '@/components/hooks/usePressAndHover'
import MarkdownText from '@/components/ui/MarkdownText'

interface Props extends IField<boolean> {
  label?: string | React.ReactNode
  checked?: boolean
  disabled?: boolean
  onChange?: (val: boolean) => void
}

const CheckBoxField = (props: Props) => {
  const [field, meta, helpers] = useField(props as any)
  const [ref, press, hover] = usePressAndHover()
  const showError = meta.touched && !!meta.error

  const handleChange = () => {
    helpers.setValue(!field.value)
    props.onChange?.(!field.value)
  }
  return (
    <div ref={ref} className={styles.root} onClick={handleChange} data-field={props.name}>
      <div
        className={classNames({
          [styles.checkbox]: true,
          [styles.hover]: hover,
          [styles.checked]: field.value,
          [styles.error]: showError,
        })}
      >
        {field.value && <CheckBoxSvg />}
      </div>
      <div
        className={classNames({
          [styles.label]: true,
          [styles.error]: showError,
        })}
      >
        {(props.label && typeof props.label === 'string') ? <MarkdownText>{props.label as string}</MarkdownText> : props.label}
      </div>
      {/*<FieldError showError={showError}>{meta.error}</FieldError>*/}
    </div>

  )
}
export default CheckBoxField
