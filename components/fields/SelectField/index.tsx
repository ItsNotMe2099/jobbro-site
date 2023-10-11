import React from 'react'
import { useField } from 'formik'
import { IField, IOption, Nullable } from '@/types/types'
import styles from './index.module.scss'
import classNames from 'classnames'
import Select, { SelectAsync } from '@/components/fields/Select'
import FieldError from '@/components/fields/FieldError'
// @ts-ignore
import { Props as SelectProps } from 'react-select/dist/declarations/src'
import {InputActionMeta} from 'react-select'


export interface SelectFieldProps<T> extends IField<T> {
  options: IOption<T>[]
  onChange?: (value: Nullable<T>) => void
  placeholder?: string
  className?: string
  errorClassName?: string
  noOptionsMessage?: Nullable<string>
  selectProps?: Nullable<SelectProps> | undefined,
  async?: boolean
  loadOptions?: (search: string, loadedOptions: IOption<T>[], data: any) => Promise<{ options: IOption<T>[], hasMore: boolean, additional?: any | null }>
  initialAsyncData?: any
  resettable?: boolean
  menuPosition?: string
  onInputChange?: (newValue: string, actionMeta: InputActionMeta) => void
  isSearchable?: boolean
}

export default function SelectField<T>(props: SelectFieldProps<T>) {

  const [field, meta, helpers] = useField(props as any)
  const showError = meta.touched && !!meta.error
  const handleChange = (selectedOption: any) => {
    helpers.setValue(selectedOption)
  }

  const getValue = () => {
    if (props.options) {
      return props.options.find((option) => option === field.value)
    } else {
      return ''
    }
  }

  // Generate a unique key based on Formik field name and value
  const uniqueKey = `${props.name}_${field.value}`

  return (
    <div className={classNames(styles.root, props.className)} data-field={props.name}>
      {props.async ? <SelectAsync<T>
        label={props.label as string}
        key={uniqueKey} // Add a unique key to trigger re-render
        value={field.value}
        hasError={showError}
        onInputChange={props.onInputChange}
        noOptionsMessage={props.noOptionsMessage}
        menuPosition={!props.menuPosition ? 'fixed' : props.menuPosition}
        placeholder={props.placeholder ?? ''}
        selectProps={props.selectProps}
        onChange={(value) => {
          helpers.setValue(value)
          props.onChange?.(value)
        }}
        resettable={props.resettable ?? false}
        loadOptions={props.loadOptions!}
        initialAsyncData={props.initialAsyncData}
      /> : <Select<T>
        label={props.label as string}
        key={uniqueKey} // Add a unique key to trigger re-render
        options={props.options}
        value={field.value}
        hasError={showError}
        onInputChange={props.onInputChange}
        menuPosition={!props.menuPosition ? 'fixed' : props.menuPosition}
        noOptionsMessage={props.noOptionsMessage}
        resettable={props.resettable ?? false}
        placeholder={props.placeholder ?? ''}
        selectProps={props.selectProps}
        onChange={(value) => {
          helpers.setValue(value)
          props.onChange?.(value)
        }}
      />}
      <FieldError className={props.errorClassName} showError={showError}>{meta.error?.toString()}</FieldError>
    </div>
  )
}

