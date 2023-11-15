import React, {forwardRef, KeyboardEventHandler, RefObject} from 'react'
import styles from './index.module.scss'
import {ItemComponentProps} from '@webscopeio/react-textarea-autocomplete'
import { useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import {IField} from 'types/types'
import {useField} from 'formik'
import classNames from 'classnames'
import usePressAndHover from '@/components/hooks/usePressAndHover'

const ResizeTextArea = forwardRef<HTMLTextAreaElement,  React.TextareaHTMLAttributes<HTMLTextAreaElement>>((props, ref) => {
  return <TextareaAutosize ref={ref} {...props as any} />
})
interface ItemType{
  name: string
  char: string
}
interface ItemProps extends ItemComponentProps<ItemType>{

}

const Item = ({ entity: { name, char } }: ItemProps) => <div>{`${name}: ${char}`}</div>

interface Props extends IField<string>{
  pickerClassName?: string
  className?: string
  onKeyDown?: KeyboardEventHandler
  styleType:  'message'
  fieldRef?: RefObject<HTMLTextAreaElement>
}

const TextAreaWithEmoji = forwardRef<HTMLTextAreaElement, Props>((props, ref) => {
  const [field, meta, helpers] = useField(props as any)
  const [hoverRef, press, hover] = usePressAndHover()
  const [focused, setFocused] = useState(false)
  const showError = meta.touched && !!meta.error

  const [showEmojiPicker, setShowEmojiPicker] = useState(false)



  return (
    <div className={classNames(styles.root, {[styles.message]: props.styleType === 'message'},  styles[props.styleType], props.className)} data-field={props.name}>
      <div onClick={() => setShowEmojiPicker(false)}>
        <ResizeTextArea
          {...field}
          disabled={props.disabled}
          placeholder={props.placeholder}
          className={classNames({
            [styles.input]: true,
            [styles.inputHover]: hover,
            [styles.inputFocused]: focused || field.value,
          //  [styles.withIcon]: props.iconName,
            [styles.inputError]: showError,
          }, styles[props.styleType])}
          onKeyDown={props.onKeyDown}
        />
      </div>
    </div>
  )
})

export default  TextAreaWithEmoji
