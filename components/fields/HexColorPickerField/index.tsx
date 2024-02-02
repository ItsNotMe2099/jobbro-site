import styles from './index.module.scss'
import { FieldConfig, useField, useFormikContext } from 'formik'
import React from 'react'
import { HexColorPicker } from 'react-colorful'
import classNames from 'classnames'

interface Props {
  onChange?: (val: string) => void
  label?: string | React.ReactNode
  className?: string
  visible?: boolean
  setVisible: (v?: boolean) => void
  color: string
  disabled?: boolean
}

export default function HexColorPickerField(props: Props & FieldConfig) {
  //@ts-ignore
  const [field, meta] = useField(props as any)
  const { setFieldValue } = useFormikContext()
  const hasError = !!meta.error && meta.touched

  const handleChange = (val: string) => {
    props.onChange?.(val)
  }

  return (
    <div

      className={classNames(styles.picker, props.className,
        { [styles.default]: !props.visible, [styles.disabled]: props.disabled })}
      onClick={() => !props.disabled ? props.setVisible() : null}>
      <div className={styles.color} style={{ backgroundColor: props.color }} />
      <div className={styles.hex}>{props.color}</div>
      {props.visible && !props.disabled && 
      <div onMouseLeave={()=>props.setVisible(false)}>
        <HexColorPicker className={styles.colors} color={field.value}  onChange={(s)=>setFieldValue(field.name, s)} />
      </div>
      }
    </div>
  )
}
