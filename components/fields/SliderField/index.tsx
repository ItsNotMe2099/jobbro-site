import styles from './index.module.scss'
import { useField} from 'formik'
import RcSlider from 'rc-slider'
import React, {ReactElement, useEffect, useState} from 'react'
import {IField} from '@/types/types'
import 'rc-slider/assets/index.css'
import InputField from '@/components/fields/InputField'
interface Props extends IField<number> {
  label?: string
  min: number,
  max: number
  defaultValue: number
  mappings?: {[key: number]: number}
  marks?: {[key: number]: number | string | ReactElement}
  suffix?: string
}

export default function SliderField(props: Props) {
  const {defaultValue, min, max} = props
  const [field, meta, helpers] = useField(props as any)
  const hasError = !!meta.error && meta.touched
  const [value, setValue] = useState<number>(field.value)
  const valueMapped = props.mappings ? (Object.keys(props.mappings) as any[] as number[]).find(i => props.mappings![i] === field.value) ?? field.value : field.value
 useEffect(() => {
   setValue(valueMapped)
 }, [field.value])
  return (
    <div className={styles.root}>
      <InputField autoSize={true} max={props.max} min={props.min} format={'number'} autoSizeSuffix={props.suffix} name={props.name} label={props.label}/>
      <RcSlider marks={props.marks} className={styles.slider} defaultValue={valueMapped} min={min} max={max}
                        onChange={(value) => helpers.setValue(
                          props.mappings ? (props.mappings[value as number] ?? value) : value as number)} value={value}/>
      </div>
  )
}
