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
import { AsyncPaginate } from 'react-select-async-paginate'
import { useEffect, useRef, useState } from 'react'
import ChevronDownSvg from '@/components/svg/ChevronDownSvg'
import { colors } from '@/styles/variables'

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
}

export default function Select<T>(props: Props<T>) {
  const selected = props.options.find(item => item.value == props.value)
  const [ref, press, hover] = usePressAndHover()

  return (
    <div className={classNames(styles.root, props.className)} ref={ref} data-field={props.name}>
      {props.label && (
        <div className={classNames({
          [styles.label]: true,
        })}>
          {props.label}
        </div>
      )}
      <ReactSelect<IOption<T>, false, GroupBase<IOption<T>>>
        value={selected as any}
        isClearable={props.r}
        noOptionsMessage={(v) => props.noOptionsMessage ?? 'Нет результатов'}
        menuPosition={!props.menuPosition ? 'fixed' : props.menuPosition}
        menuPlacement={'bottom'}
        className={classNames({
          [styles.input]: true,
          [styles.default]: true,
          [styles.error]: props.hasError,
          [styles.hover]: hover,
          [styles.press]: press,
        })}
        classNamePrefix="yg-select"
        isSearchable={false}
        placeholder={props.placeholder}
        onChange={(option) => {
          props.onChange((option as IOption<T>)?.value)
        }}
        options={props.options as any}
        components={{ DropdownIndicator } as any}
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
  menuPosition?: string
}
export function SelectAsync<T>(props: AsyncProps<T>) {
  const [ref, press, hover] = usePressAndHover()
  const selectRef = useRef<SelectInstance<IOption<T>, false, GroupBase<IOption<T>>> | null>(null)
  const mainRef = useRef<any | null>(null)
  const [selected, setSelected] = useState<any>(null)
  useEffect(() => {

  }, [props.value])
  return (
    <div className={classNames(styles.root, props.className)} ref={ref} data-field={props.name}>
      {props.label && (
        <div className={classNames({
          [styles.label]: true,
        })}>
          {props.label}
        </div>
      )}
      <AsyncPaginate<IOption<T>, false, GroupBase<IOption<T>>>
        defaultValue={selected}
        value={selected}
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
        })}
        //  onFocus={props.onFocus}
        classNamePrefix="yg-select"
        isSearchable={true}
        isClearable={true}
        placeholder={props.placeholder}
        onChange={(option) => {
          setSelected(option)
          props.onChange((option as IOption<T>)?.value)
        }}
        components={{ DropdownIndicator } as any}

      />
    </div>
  )
}
function DropdownIndicator<T>(props: DropdownIndicatorProps<IOption<T>, false, GroupBase<IOption<T>>>) {
  return (
    <div>
      <ChevronDownSvg color={colors.grey500} className={classNames({
        [styles.indicator]: true,
        [styles.indicatorInverse]: props.selectProps.menuIsOpen,
      })} />
    </div>
  )
}
