import { useState } from 'react'
import styles from './index.module.scss'
import { useField } from 'formik'
import { IField } from '@/types/types'
import classNames from 'classnames'


export interface InputColorFieldProps<T> extends IField<T> {
  maxLength?: number
  onChange?: (value: string) => void
  inputClassName?: string
  className?: string
}

export default function InputColorField<T extends string | number>(props: InputColorFieldProps<T>)  {
  const [focused, setFocus] = useState(false)
  const [obscureShow, setObscureShow] = useState(false)
  const [field, meta, helpers] = useField(props as any)

  // const formatValue = (value: string) => {
  //   const reg = /^#([A-Fa-f0-9]{6})$/g
  //   const newValue = value.replaceAll(reg, '')
  //   console.log(newValue)
  // }

  return (
  <div className={classNames(styles.root, props.className)}> 
    <input
    maxLength={props.maxLength||7}
    name={field.name}
    value={field.value}
    disabled={props.disabled}
    type={'text'}
    className={classNames(styles.input, props.inputClassName)}
    onChange={(e)=> {
      const target = e.currentTarget.value
      // formatValue(target)
      helpers.setValue(target)
      props.onChange?.(target)
    }}
    placeholder={props.placeholder}
    onFocus={(e) => {
      setFocus(true)
    }}
    onBlur={(e) => {
      setFocus(false)
      field.onBlur(e)
    }}          
    />
  </div>)
}