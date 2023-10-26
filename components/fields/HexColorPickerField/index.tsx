import styles from './index.module.scss'
import { FieldConfig, useField, useFormikContext } from 'formik'
import React from 'react'
import { HexColorPicker } from 'react-colorful'

interface Props {
  onChange?: (val: string) => void
  label?: string | React.ReactNode
  className?: string
}

export default function HexColorPickerField(props: Props & FieldConfig) {
  //@ts-ignore
  const [field, meta] = useField(props as any)
  const { setFieldValue } = useFormikContext()
  const hasError = !!meta.error && meta.touched

  const handleChange = (val: string) => {
    props.onChange?.(val)
    setFieldValue(field.name, val)
  }

  return (
    <HexColorPicker className={styles.colors} color={field.value} onChange={handleChange} />
  )
}
