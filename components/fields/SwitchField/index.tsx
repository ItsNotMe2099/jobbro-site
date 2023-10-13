import styles from './index.module.scss'
import { FieldConfig, useField, useFormikContext } from 'formik'
import React from 'react'
import Switch from 'components/ui/Switch'
import classNames from 'classnames'

interface Props {
  onChange?: (val: boolean) => void
  label?: string
  className?: string
}

export default function SwitchField(props: Props & FieldConfig) {
  //@ts-ignore
  const [field, meta] = useField(props as any)
  const { setFieldValue } = useFormikContext()
  const hasError = !!meta.error && meta.touched

  const handleChange = (val: boolean) => {
    props.onChange?.(val)
    setFieldValue(field.name, val)
  }

  return (
    <div className={classNames(styles.root, props.className)} data-field={props.name}>
      <Switch
          onChange={(val) => handleChange(val)}
          checked={field.value}
          />
          {props.label ?
          <div className={styles.label} onClick={() => handleChange(!field.value)}>
            {props.label}
          </div> : null}
    </div>
  )
}
