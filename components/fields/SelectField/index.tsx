import React, {useState} from 'react'
import { useField } from 'formik'
import { IField, IOption, Nullable } from '@/types/types'
import styles from './index.module.scss'
import classNames from 'classnames'
import Select, { SelectAsync, CreateSelectAsync } from '@/components/fields/Select'
import FieldError from '@/components/fields/FieldError'

// @ts-ignore
import { Props as SelectProps } from 'react-select/dist/declarations/src'


export interface SelectFieldProps<T> extends IField<T> {
  options: IOption<T>[]
  onChange?: (value: Nullable<T>) => void
  placeholder?: string
  className?: string
  errorClassName?: string
  noOptionsMessage?: Nullable<string>
  selectProps?: Nullable<SelectProps> | undefined,
  async?: boolean
  creatable?: boolean
  loadOptions?: (search: string, loadedOptions: IOption<T>[], data: any) => Promise<{ options: IOption<T>[], hasMore: boolean, additional?: any | null }>
  initialAsyncData?: any
  resettable?: boolean
  menuPosition?: 'fixed' | 'absolute'
  onCreateOption?: (data: string) => Promise<T>
  selectKey?: string
  defaultOption?: Nullable<IOption<T>>
  isLoading?: boolean | undefined
  fluid?: boolean
  selectInputClassName?: string
}

export default function SelectField<T>(props: SelectFieldProps<T>) {
  

  const [field, meta, helpers] = useField(props as any)
  const [isAddingLoading, setIsAddingLoading] = useState(false)

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

  const uniqueKey = props.selectKey ?? `${props.name}`

  return (
    <div className={classNames(styles.root, props.className, {[styles.fluid]: props.fluid})} data-field={props.name}>
      {props.creatable ? <CreateSelectAsync<T>
        label={props.label as string}
        key={uniqueKey}
        value={field.value}
        hasError={showError}
        isLoading={isAddingLoading}
        noOptionsMessage={props.noOptionsMessage}
        menuPosition={!props.menuPosition ? 'fixed' : props.menuPosition}
        placeholder={props.placeholder ?? ''}
       // onCreateOption={handleCreateOption}
        onChange={(value) => {
          helpers.setValue(value)
          props.onChange?.(value)
        }}
        defaultOption={props.defaultOption}
        resettable={props.resettable ?? false}
        loadOptions={props.loadOptions!}
        initialAsyncData={props.initialAsyncData}
      /> : props.async ? <SelectAsync<T>
        label={props.label as string}
        key={uniqueKey} // Add a unique key to trigger re-render
        value={field.value}
        defaultOption={props.defaultOption}
        hasError={showError}
        noOptionsMessage={props.noOptionsMessage}
        menuPosition={!props.menuPosition ? 'fixed' : props.menuPosition}
        placeholder={props.placeholder ?? ''}
        selectProps={{defaultValue: field.value}}
        onChange={(value) => {
          helpers.setValue(value)
          props.onChange?.(value)
        }}
        resettable={props.resettable ?? false}
        className={props.className}
        loadOptions={props.loadOptions!}
        initialAsyncData={props.initialAsyncData}
      /> : <Select<T>
        label={props.label as string}
        key={uniqueKey} // Add a unique key to trigger re-render
        options={props.options}
        value={field.value}
        hasError={showError}
        menuPosition={!props.menuPosition ? 'fixed' : props.menuPosition}
        noOptionsMessage={props.noOptionsMessage}
        resettable={props.resettable ?? false}
        placeholder={props.placeholder ?? ''}
        selectProps={props.selectProps}
        isLoading={props.isLoading}
        className={props.className}
        onChange={(value) => {
          helpers.setValue(value)
          props.onChange?.(value)
        }}
      />}
      <FieldError className={props.errorClassName} showError={showError}>{meta.error?.toString()}</FieldError>
    </div>
  )
}

