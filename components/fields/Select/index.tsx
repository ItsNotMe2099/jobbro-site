// @ts-nocheck
import styles from './index.module.scss'
import { IOption, Nullable } from 'types/types'
import ReactSelect from 'react-select'
import classNames from 'classnames'
import usePressAndHover from '@/components/hooks/usePressAndHover'
import type {
  DropdownIndicatorProps,
  GroupBase,
  SelectInstance,
  Props as SelectProps,
} from 'react-select'

import Creatable, {CreatableProps} from 'react-select/creatable'
import {AsyncPaginate, ComponentProps, UseAsyncPaginateParams, withAsyncPaginate} from 'react-select-async-paginate'
import {ReactElement, ReactNode, useRef, useState} from 'react'
import ChevronDownSvg from '@/components/svg/ChevronDownSvg'
import { colors } from '@/styles/variables'
import SearchSvg from '@/components/svg/SearchSvg'
import FieldLabel from '@/components/fields/FieldLabel'
import useTranslation from 'next-translate/useTranslation'

interface Props<T> {
  selectProps?: Nullable<SelectProps>,
  label?: string
  options: IOption<T>[]
  value: T
  onChange: (value: Nullable<T>) => void
  hasError?: boolean
  placeholder?: string
  className?: string
  name?: string
  noOptionsMessage?: Nullable<string>
  resettable?: boolean
  menuPosition?: string
  isLoading?: boolean | undefined
 }

export default function Select<T>(props: Props<T>) {
  const selected = props.options.find(item => item.value == props.value)
  const [focused, setFocus] = useState(false)
  const [ref, press, hover] = usePressAndHover()
  const {t} = useTranslation()

  return (
    <div className={classNames(styles.root, props.className)} ref={ref} data-field={props.name}>
      {props.label &&
        <FieldLabel label={props.label} focused={focused || !!props.value}/>
      }
      <ReactSelect<IOption<T>, false, GroupBase<IOption<T>>>
        value={selected as any}
        isClearable={props.resettable}
        noOptionsMessage={(v) => props.noOptionsMessage ?? t('form_field_select_no_results')}
        menuPosition={!props.menuPosition ? 'fixed' : props.menuPosition}
        menuPlacement={'bottom'}
        className={classNames({
          [styles.input]: true,
          [styles.default]: true,
          [styles.error]: props.hasError,
          [styles.hover]: hover,
          [styles.press]: press,
          [styles.withLabel]: props.label,
          [styles.inputFocused]: focused,
          [styles.withValue]: !!props.value,
        })}
        onFocus={(e) => {
          setFocus(true)
        }}
        onBlur={(e) => {
          setFocus(false)
        }}
        isLoading={props.isLoading}
        classNamePrefix="yg-select"
        isSearchable={true}
        placeholder={props.placeholder}
        onChange={(option) => {
          props.onChange((option as IOption<T>)?.value)
        }}
        options={props.options as any}
        components={{  DropdownIndicator: DropdownChevronIndicator } as any}
        {...(props.selectProps ? { ...props.selectProps } : {})}
        {...(selected ? { defaultValue: selected } : {})}
      />
    </div>
  )
}
interface AsyncProps<T> {
  loadOptions?: (search: string, loadedOptions: IOption<T>[], data: any) => Promise<{ options: IOption<T>[], hasMore: boolean, additional?: any | null }>
  initialAsyncData: any,
  label?: string
  value: T
  onChange: (value: Nullable<T>) => void
  hasError?: boolean
  placeholder?: string
  className?: string
  name?: string
  noOptionsMessage?: Nullable<string>
  selectProps?: Nullable<SelectProps>
  resettable?: boolean
  menuPosition?: 'fixed' | 'absolute'
  defaultOption?: Nullable<IOption<T>>
}
export function SelectAsync<T>(props: AsyncProps<T>) {
  const [ref, press, hover] = usePressAndHover()
  const selectRef = useRef<SelectInstance<IOption<T>, false, GroupBase<IOption<T>>> | null>(null)
  const mainRef = useRef<any | null>(null)
  const [selected, setSelected] = useState<any>(null)
  const [focused, setFocus] = useState(false)
  return (
    <div className={classNames(styles.root, props.className)} ref={ref} data-field={props.name}>
      {props.label &&
        <FieldLabel label={props.label} focused={focused || !!props.value}/>
      }
      <AsyncPaginate<IOption<T>, false, GroupBase<IOption<T>>>
        defaultValue={selected ?? props.defaultOption}
        value={selected ?? props.defaultOption}
        ref={mainRef}
        selectRef={(ref) => selectRef.current = ref as any}
        loadOptions={props.loadOptions!}
        additional={props.initialAsyncData}
        menuPlacement={'bottom'}
        menuPosition={!props.menuPosition ? 'fixed' : props.menuPosition}
        className={classNames({
          [styles.input]: true,
          [styles.default]: true,
          [styles.error]: props.hasError,
          [styles.hover]: hover,
          [styles.press]: press,
          [styles.withLabel]: props.label,
          [styles.inputFocused]: focused,
          [styles.withValue]: !!props.value,
        })}
        //  onFocus={props.onFocus}
        classNamePrefix="yg-select"
        isSearchable={true}
        isClearable={true}
        placeholder={props.placeholder}
        onFocus={(e) => {
          setFocus(true)
        }}
        onBlur={(e) => {
          setFocus(false)
        }}
        onChange={(option) => {
          setSelected(option)
          props.onChange((option as IOption<T>)?.value)
        }}
        components={{ DropdownIndicator: DropdownChevronIndicator } as any}
        {...props.selectProps}

      />
    </div>
  )
}



type AsyncPaginateCreatableProps<
  OptionType,
  Group extends GroupBase<OptionType>,
  Additional,
  IsMulti extends boolean
  > = CreatableProps<OptionType, IsMulti, Group> &
  UseAsyncPaginateParams<OptionType, Group, Additional> &
  ComponentProps<OptionType, Group, IsMulti>;

type AsyncPaginateCreatableType = <
  OptionType,
  Group extends GroupBase<OptionType>,
  Additional,
  IsMulti extends boolean = false
  >(
  props: AsyncPaginateCreatableProps<OptionType, Group, Additional, IsMulti>
) => ReactElement;

const CreatableAsyncPaginate = withAsyncPaginate(
  Creatable
) as AsyncPaginateCreatableType


interface CreateAsyncProps<T> extends AsyncProps<T>{
  onCreateOption?: (inputValue: string) => void
  isLoading?: boolean
  formatCreateLabel?: (inputValue: string) => ReactNode;
}
export function CreateSelectAsync<T>(props: CreateAsyncProps<T>) {
  const [ref, press, hover] = usePressAndHover()
  const selectRef = useRef<SelectInstance<IOption<T>, false, GroupBase<IOption<T>>> | null>(null)
  const mainRef = useRef<any | null>(null)
  const [selected, setSelected] = useState<any>(null)
  const [focused, setFocus] = useState(false)
  return (
    <div className={classNames(styles.root, props.className)} ref={ref} data-field={props.name}>
      {props.label &&
        <FieldLabel label={props.label} focused={focused || !!props.value}/>
      }
      <CreatableAsyncPaginate<IOption<T>, false, GroupBase<IOption<T>>>
        defaultValue={selected ?? props.defaultOption}
        value={selected ?? props.defaultOption}
       // isLoading={props.isLoading}
        ref={mainRef}
        formatCreateLabel={props.formatCreateLabel}
        onCreateOption={props.onCreateOption}
        selectRef={(ref) => selectRef.current = ref as any}
        loadOptions={props.loadOptions!}
        additional={props.initialAsyncData}
        menuPlacement={'bottom'}
        menuPosition={!props.menuPosition ? 'fixed' : props.menuPosition}
        className={classNames({
          [styles.input]: true,
          [styles.default]: true,
          [styles.error]: props.hasError,
          [styles.hover]: hover,
          [styles.press]: press,
          [styles.withLabel]: props.label,
          [styles.inputFocused]: focused,
          [styles.withValue]: !!props.value,
        })}
        onFocus={(e) => {
          setFocus(true)
        }}
        onBlur={(e) => {
          setFocus(false)
        }}
        classNamePrefix="yg-select"
        isSearchable={true}
        isClearable={true}
        isLoading={props.isLoading}
        placeholder={props.placeholder}
        onChange={(option) => {
          setSelected(option)
          props.onChange((option as IOption<T>)?.value)
        }}
        components={{  DropdownIndicator: DropdownChevronIndicator } as any}

      />
    </div>
  )
}



function DropdownChevronIndicator<T>(props: DropdownIndicatorProps<IOption<T>, false, GroupBase<IOption<T>>>) {
  return (
    <div>
        <ChevronDownSvg color={colors.textSecondary} className={classNames({
          [styles.indicator]: true,
          [styles.indicatorInverse]: props.selectProps.menuIsOpen,
        })} />
    </div>
  )
}


function DropdownSearchIndicator<T>(props: DropdownIndicatorProps<IOption<T>, false, GroupBase<IOption<T>>>) {
  return (
    <div>
     <SearchSvg color={colors.textSecondary} className={classNames({
          [styles.indicator]: true,
        })} />

    </div>
  )
}
