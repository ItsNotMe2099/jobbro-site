import styles from './index.module.scss'
import { IField } from 'types/types'
import { FieldHelperProps, useField } from 'formik'
import classNames from 'classnames'
import TimePicker from 'rc-time-picker'
import usePressAndHover from '@/components/hooks/usePressAndHover'
import FieldError from '@/components/fields/FieldError'
import moment from 'moment'
import FieldLabel from '@/components/fields/FieldLabel'
import {useState} from 'react'
// import TimePicker from '../TimePicker'
import CloseSvg from '@/components/svg/CloseSvg'
import {colors} from '@/styles/variables'
interface Props extends IField<string | null> {
  minuteStep?: number
  onChange?: (helpers: FieldHelperProps<string | null>, date: moment.Moment) => void
  className?: string
  resettable?: boolean
  minTime?: Date
}

export default function TimeField(props: Props) {
  const [wrapperRef, press, hover] = usePressAndHover()
  const [field, meta, helpers] = useField<string | null>(props as any)
  const [focused, setFocus] = useState<boolean>(false)

  const showError = meta.touched && !!meta.error


  return (
    <div className={classNames(styles.root, props.className)} data-field={props.name} >
      <div className={classNames(
        styles.rootWrapper,
        {
        [styles.wrapper]: true,
        [styles.withLabel]: !!props.label,
        [styles.inputFocused]: focused,
        [styles.inputError]: showError,
      })} ref={wrapperRef}>
        {props.label && <FieldLabel label={`${props.label}`} className={styles.label} focusedClassName={styles.labelFocused} focused={focused || !!field.value}/>}
        
        {/* <TimePicker minTime={props.minTime} focused={focused} onSet={onSet} value={field.value}   /> */}
        <TimePicker
          use12Hours
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
            if (date) {
              helpers.setValue(`${date.format('HH:mm')}:00`)
            }else{
              helpers.setValue(null)
            }
            props.onChange&&props.onChange(helpers, date)
          }}
          minuteStep={props.minuteStep ?? 1}
          clearIcon={props.resettable ? <CloseSvg className={styles.clear} color={colors.simpleGrey}/> : null}
        />
      </div>
      <FieldError showError={showError}>{meta.error}</FieldError>
    </div>
  )
}

