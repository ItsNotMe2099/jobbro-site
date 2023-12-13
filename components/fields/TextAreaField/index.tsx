import styles from './index.module.scss'
import { IField } from 'types/types'
import { useField } from 'formik'
import classNames from 'classnames'
import React, { useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import FieldError from '../FieldError'
import usePressAndHover from '@/components/hooks/usePressAndHover'
import FieldLabel, {LabelStyleType} from '@/components/fields/FieldLabel'

const TextAreaInner = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement> & {autoSize?: boolean}) => {
  if(props.autoSize){
    return <TextareaAutosize {...props as any}/>
  }else{
    return <textarea {...props}/>
  }
}
interface Props extends IField<string> {
  autoSize?: boolean
  labelStyleType?: LabelStyleType
}

export default function TextAreaField(props: Props) {
  const [ref, press, hover] = usePressAndHover()
  const [field, meta, helpers] = useField(props as any)
  const [focused, setFocused] = useState(false)
  const showError = meta.touched && !!meta.error

  return (
    <div className={styles.root} ref={ref} data-field={props.name}>
      <div className={styles.wrapper}>
      {props.label &&
        <FieldLabel label={props.label} styleType={props.labelStyleType} focused={focused || field.value} />
      }
      <TextAreaInner
        {...field}
        autoSize={true}
        placeholder={props.placeholder}
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
          [styles.withLabel]: props.label,
          [styles.withValue]: !!field.value,
          [styles.hover]: hover,
          [styles.focused]: focused || field.value,
          [styles.withIcon]: props.iconName,
          [styles.error]: showError,
        })}
      />
      </div>
      <FieldError showError={showError}>{meta.error}</FieldError>
    </div>
  )
}
