import styles from './index.module.scss'
import { useField } from 'formik'
import classNames from 'classnames'
import { ReactElement, useEffect, useState } from 'react'
import { FieldValidator } from 'formik/dist/types'
import { useIMask } from 'react-imask'
import { AsYouType, isValidPhoneNumber } from 'libphonenumber-js'
import cx from 'classnames'
import Converter from 'utils/converter'
import { IField } from 'types/types'
import FieldError from 'components/fields/FieldError'
import EyeSvg from '@/components/svg/EyeSvg'
import { colors } from '@/styles/variables'
import Formatter from '@/utils/formatter'
import SearchSvg from '@/components/svg/SearchSvg'
import FieldLabel from '@/components/fields/FieldLabel'

export type InputValueType<T> = T | null | undefined
type FormatType = 'phone' | 'phoneAndEmail' | 'cardExpiry' | 'cardPan' | 'cardCvv' | 'number' | 'price' | 'weight'

export interface InputFieldProps<T> extends IField<InputValueType<T>> {
  obscure?: boolean
  format?: FormatType
  blurValidate?: FieldValidator
  className?: string
  label?: string
  errorClassName?: string
  suffix?: 'clear' | 'arrow' | 'search' | string | ReactElement
  prefix?: 'search' | string | ReactElement
  prefixClassName?: string
  suffixClassName?: string
  onChange?: (val: InputValueType<T>) => void
  noAutoComplete?: boolean
  max?: number,
  min?: number
  resettable?: boolean
  formatValue?: (val: InputValueType<T>) => InputValueType<T>
  parseValue?: (val: InputValueType<T>) => InputValueType<T>
}

const defaultPhonePattern = '+0[00000000000000000000]'
const defaultCardExpiryPattern = '00/00'
const defaultCardPanPattern = '0000 0000 0000 0000000b gj'
const defaultCardCvvPattern = '0000'
const defaultPricePattern = '0 000'
const getInitialPatternFromFormat = (format: FormatType | undefined) => {
  switch (format) {
    case 'phone':
      return defaultPhonePattern
    case 'cardExpiry':
      return defaultCardExpiryPattern
    case 'number':
    case 'price':
    case 'weight':
      return Number
    case 'cardPan':
      return defaultCardPanPattern
    case 'cardCvv':
      return defaultCardCvvPattern
    case 'phoneAndEmail':
    default:
      return null
  }
}
export default function InputField<T extends string | number>(props: InputFieldProps<T>) {

  const [focused, setFocus] = useState(false)
  const [obscureShow, setObscureShow] = useState(false)
  const [field, meta, helpers] = useField(props as any)
  const [phoneIsValid, setPhoneIsValid] = useState(false)
  const [pattern, setPattern] = useState<string | null | NumberConstructor>(getInitialPatternFromFormat(props.format))
  const showError = meta.touched && !!meta.error && !focused
  const formatValue = (value: InputValueType<T>) => {
    return props.formatValue ? props.formatValue(value) : value
  }
  const parseValue = (value: InputValueType<T>) => {
    return props.parseValue ? props.parseValue(value) : value
  }

  const formatValueByType = (format: FormatType, value: InputValueType<T>): string | number | null | undefined => {
    switch (format) {
      case 'phone':
        return value ? Formatter.cleanPhone(`${value}`) : null
      case 'number':
      case 'price':
      case 'weight':
        return value ? parseInt(`${value}`.replace(/\D+/g, ''), 10) : null
      case 'cardExpiry':
      case 'cardPan':
      case 'cardCvv':
      case 'phoneAndEmail':
      default:
        return value
    }
  }
  const { ref, maskRef } = useIMask({
    mask: pattern as any || /.*/, ...(props.format && ['number', 'price', 'weight'].includes(props.format) ? {
      mask: Number,
      max: props.max ?? 10000000,
      min: props.min ?? 0,

    } : {})
  }, {
    onAccept: (value) => {
      const formatted = formatValue(formatValueByType(props.format!, value as any as InputValueType<T>) as InputValueType<T>)
      helpers.setValue(formatted)
      props.onChange?.(formatted)
      setTimeout(() => {
        maskRef.current?.updateValue()
      }, 50)
    }
  })
  const autoCompleteProps: any = props.noAutoComplete ? { autoComplete: 'off', autoCorrect: 'off' } : {}
  useEffect(() => {

    if (maskRef.current && (props.format === 'phone' || props.format === 'phoneAndEmail')) {
      const phone = `${field.value && !`${field.value}`.startsWith('+') ? '+' : ''}${field.value}`
      if (isValidPhoneNumber(phone || '')) {
        if (!phoneIsValid) {
          setPhoneIsValid(true)
          const asYouType = new AsYouType()
          asYouType.input(phone || '')
          setPattern(Converter.convertLibphonenumberToMask(asYouType.getTemplate()))
          updateValueFromMask()
        }
      } else if (phoneIsValid) {
        setPhoneIsValid(false)
        setPattern(defaultPhonePattern)
        updateValueFromMask()
      }
      if (props.format === 'phoneAndEmail') {
        const looksLikePhone = /^\+?\d\s?\d\s?\d/.test(field.value || '') || /\d/.test(field.value || '')
        const looksLikeEmail = /[@.]/.test(field.value || '')
        if (!looksLikeEmail && looksLikePhone && !pattern && !setPhoneIsValid) {
          setPattern(defaultPhonePattern)
          updateValueFromMask()
        } else if (pattern && (field.value?.length < 4 || looksLikeEmail)) {
          setPattern(null)
          updateValueFromMask()
        }
      }
    } else {
      maskRef.current?.updateValue()
    }


  }, [ref.current, field.value])

  const updateValueFromMask = () => {
    setTimeout(() => {
      helpers.setValue(maskRef.current?.value ?? null)
    }, 50)
  }

  const blurValidator = async () => {
    if (props.blurValidate) {
      const err = await props.blurValidate(field.value)
      if (err) {
        helpers.setError(err)
      }
    }
  }
  const renderSuffix = () => {
    if (props.suffix === 'search') {
      return <div className={cx(styles.suffix)}><SearchSvg color={colors.black} /></div>
    } else if (typeof props.suffix === 'string') {
      return <div className={cx(styles.suffix)}>{props.suffix}</div>
    }
    return props.suffix
  }
  const renderPrefix = () => {
    if (props.prefix === 'search') {
      return <div className={cx(styles.prefix)}><SearchSvg color={colors.black} /></div>
    } else if (typeof props.prefix === 'string') {
      return <div className={cx(styles.prefix)}>{props.prefix}</div>
    }
    return props.prefix
  }
  const handleClear = () => {
    const formatted = props.format ? formatValue(formatValueByType(props.format!, '' as any as InputValueType<T>) as InputValueType<T>) : formatValue('' as InputValueType<T>)
    helpers.setValue(formatted)
    props.onChange?.(formatted)
    setTimeout(() => {
      maskRef.current?.updateValue()
    }, 50)
    helpers.setValue(formatted)
  }
  return (
    <div className={classNames(styles.root, props.className, {
      [props.errorClassName as string]: showError,
    })} data-field={props.name}>
      <div className={styles.wrapper}>
        {props.label &&
          <FieldLabel label={props.label} focused={focused || field.value}/>
        }
        <div className={classNames(styles.inputWrapper, {
          [styles.withLabel]: props.label,
          [styles.withPrefix]: !!props.prefix,
          [styles.withSuffix]: !!props.suffix,
          [styles.inputFocused]: focused,
          [styles.inputError]: showError,
        })}>

          {props.prefix && (
            renderPrefix()
          )}
          <input
            name={field.name}
            value={`${parseValue(field.value) ?? ''}`}
            disabled={props.disabled}
            ref={props.format && ref as any}
            type={props.obscure ? (obscureShow ? 'text' : 'password') : props.type ?? 'text'}
            className={classNames({
              [styles.input]: true,
              //[styles.inputError]: showError,
              [styles.withLabel]: props.label,
              [styles.withValue]: !!field.value,
              [styles.inputFocused]: focused,
              [styles.withPrefix]: !!props.prefix,
              [styles.withClear]: props.resettable && !!field.value,
              [styles.disabled]: props.disabled
            })}
            {...!props.format ? {
              onChange: (e) => {
                const formatted = formatValue(e.currentTarget.value as InputValueType<T>)
                helpers.setValue(formatted)
                props.onChange?.(formatted)
              }
            } : {}}
            placeholder={props.placeholder}
            onFocus={(e) => {

              setFocus(true)
            }}
            onBlur={(e) => {
              setFocus(false)
              field.onBlur(e)
              blurValidator()
            }}
            {...autoCompleteProps}
          />
          {props.obscure && (
            <div className={classNames(styles.obscure)} onClick={() => {
              setObscureShow(!obscureShow)
            }}>
              {obscureShow ? <EyeSvg color={colors.black} />
                :
                <EyeSvg color={colors.textSecondary} />}

            </div>
          )}
          {props.resettable && !!field.value && <div className={classNames(styles.clear, { [styles.withSuffix]: !!props.suffix })} onClick={handleClear}>Clear</div>}
          {props.suffix && (
            renderSuffix()
          )}
        </div>
        <FieldError showError={showError}>{meta.error}</FieldError>
      </div>
    </div>
  )
}

