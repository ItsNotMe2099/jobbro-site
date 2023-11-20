import styles from './index.module.scss'
import { IField } from 'types/types'
import { useField } from 'formik'
import classNames from 'classnames'
import TimePicker from 'rc-time-picker'
import usePressAndHover from '@/components/hooks/usePressAndHover'
import FieldError from '@/components/fields/FieldError'
import moment from 'moment'
import FieldLabel from '@/components/fields/FieldLabel'
import {useState} from 'react'
import CloseSvg from '@/components/svg/CloseSvg'
import {colors} from '@/styles/variables'
interface Props extends IField<string | null> {
  minuteStep?: number
  onChange?: (val: string | null) => void
  className?: string
  resettable?: boolean
}

export default function TimeField(props: Props) {
  const [wrapperRef, press, hover] = usePressAndHover()
  const [field, meta, helpers] = useField<string | null>(props as any)
  const [focused, setFocus] = useState<boolean>(false)

  const showError = meta.touched && !!meta.error

  return (
    <div className={classNames(styles.root, props.className)} data-field={props.name}>
      {props.label && <FieldLabel label={`${props.label}`} className={styles.label} focusedClassName={styles.labelFocused} focused={focused || !!field.value}/>}
      <div className={classNames({
        [styles.wrapper]: true,
        [styles.withLabel]: !!props.label,
        [styles.inputFocused]: focused,
        [styles.inputError]: showError,
      })} ref={wrapperRef}>
        <TimePicker
          showSecond={false}
          popupClassName={classNames({
            [styles.popup]: true,
            [styles.withIcon]: props.iconName,
          })}
          {...(field.value ? {value: moment(field.value, 'HH:mm:ss')} : {value: undefined})}
          className={classNames({
            [styles.timePicker]: true,
            //[styles.inputError]: showError,
            [styles.withLabel]: !!props.label,
            [styles.withValue]: !!field.value,
            [styles.inputFocused]: focused,
            [styles.withClear]: props.resettable && !!field.value,
            [styles.disabled]: props.disabled
          })}
          placeholder={props.placeholder}
          inputReadOnly
          onOpen={() => setFocus(true)}
          onClose={() => setFocus(false)}
          onChange={(date) => {
            console.log('onChangeData', date)
            if (date) {
              console.log('onChangeData2', date.format('HH:mm'))
              helpers.setValue(`${date.format('HH:mm')}:00`)
            }else{
              helpers.setValue(null)
            }
          }}
          minuteStep={props.minuteStep ?? 1}
          clearIcon={props.resettable ? <CloseSvg className={styles.clear} color={colors.simpleGrey}/> : null}
        />
      </div>

      <FieldError showError={showError}>{meta.error}</FieldError>
    </div>
  )
}

