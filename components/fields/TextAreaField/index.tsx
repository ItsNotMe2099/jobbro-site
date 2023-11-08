import styles from './index.module.scss'
import { IField } from 'types/types'
import { useField } from 'formik'
import classNames from 'classnames'
import FieldIconSvg from 'components/svg/FieldIconSvg'
import React, { useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import { InputStyleType } from '@/types/enums'
import FieldError from '../FieldError'
import usePressAndHover from '@/components/hooks/usePressAndHover'

const TextAreaInner = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement> & {autoSize?: boolean}) => {
  if(props.autoSize){
    return <TextareaAutosize {...props as any}/>
  }else{
    return <textarea {...props}/>
  }
}
interface Props extends IField<string> {
  styleType: InputStyleType
  autoSize?: boolean
}

export default function TextAreaField(props: Props) {
  const [ref, press, hover] = usePressAndHover()
  const [field, meta, helpers] = useField(props as any)
  const [focused, setFocused] = useState(false)
  const showError = meta.touched && !!meta.error

  return (
    <div className={styles.root} ref={ref} data-field={props.name}>
      {props.iconName && (
        <FieldIconSvg
          iconName={props.iconName}
          error={showError}
          className={classNames([styles.icon, styles[props.styleType]])}
        />
      )}
      {props.styleType === 'default' && (
        <div className={classNames({
          [styles.label]: true,
          [styles.withIcon]: props.iconName,
        })}>
          {props.label}
        </div>
      )}
      <TextAreaInner
        {...field}
        autoSize={props.autoSize}
        placeholder={props.placeholder ?? props.label as string}
        onFocus={() => {
          setFocused(true)
        }}
        onBlur={() => {
          if (!field.value) {
            setFocused(false)
          }
        }}
        className={classNames({
          [styles.input]: true,
          [styles.hover]: hover,
          [styles.focused]: focused || field.value,
          [styles.withIcon]: props.iconName,
          [styles.error]: showError,
        }, styles[props.styleType])}
      />
      <FieldError showError={showError}>{meta.error}</FieldError>
    </div>
  )
}
