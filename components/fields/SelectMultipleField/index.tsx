import React, {useState} from 'react'
import { useField } from 'formik'
import { IField, IOption, Nullable } from '@/types/types'
import styles from './index.module.scss'
import classNames from 'classnames'
import FieldError from '@/components/fields/FieldError'
import { Props as SelectProps } from 'react-select/dist/declarations/src'
import SelectMultiple from '@/components/fields/SelectMultiplie'
import {CreateSelectAsync} from '@/components/fields/Select'

type WithId = {id: number| string}
export interface SelectMultipleFieldProps<T extends WithId> extends IField<T[]> {
  options: IOption<T>[]
  values: IOption<T>[]
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
  onCreateOption: (inputValue: string) => Promise<T>
}
// @ts-ignore
export default function SelectMultipleField<T extends WithId>(props: SelectMultipleFieldProps<T>) {

  const [field, meta, helpers] = useField<T[]>(props as any)
  const showError = meta.touched && !!meta.error
  const [isAddingLoading, setIsAddingLoading] = useState(false)

  const handleCreateOption = async (inputValue: string) => {
    setIsAddingLoading(true)
    const res = await props.onCreateOption(inputValue)
    if(!field.value?.find(i => i.id === res.id)) {
      console.log('Field11', field, props)
      helpers.setValue([...(field.value ?? []), res])
    }
    setIsAddingLoading(false)

  }
  const handleOnSelect = (value: T) => {
    if(!field.value?.find(i => i.id === value.id)) {
      helpers.setValue([...(field.value ?? []), value])
    }
  }

  const handleDelete = (option: IOption<T>) => {
    console.log('handleDelete', option.value)
    helpers.setValue(field.value.filter(i => i.id !== option.value?.id))
  }
  // Generate a unique key based on Formik field name and value
  const uniqueKey = `${props.name}_${field.value}`

  return (
    <div className={classNames(styles.root, props.className)} data-field={props.name}>
      <SelectMultiple<T> values={props.values} onDelete={handleDelete} select={ <CreateSelectAsync<T[]>
        label={props.label as string}
        key={uniqueKey} // Add a unique key to trigger re-render
        options={props.options}
        value={field.value}
        isLoading={isAddingLoading}
        hasError={showError}
        initialAsyncData={props.initialAsyncData}
        formatCreateLabel={(value: string) => `Create «${value}»`}
        menuPosition={!props.menuPosition ? 'fixed' : props.menuPosition}
        // @ts-ignore
        loadOptions={props.loadOptions}
        noOptionsMessage={props.noOptionsMessage}
        resettable={props.resettable ?? false}
        placeholder={props.placeholder ?? ''}
        selectProps={props.selectProps}
        onCreateOption={handleCreateOption}
        // @ts-ignore
        onChange={handleOnSelect}
      />}/>
      <FieldError className={props.errorClassName} showError={showError}>{meta.error?.toString()}</FieldError>
    </div>
  )
}
