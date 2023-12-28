import styles from './index.module.scss'
import {DeepPartial, IField} from 'types/types'
import { useField } from 'formik'
import DatePicker, {ReactDatePickerProps} from 'react-datepicker'
import classNames from 'classnames'
import FieldIconSvg from 'components/svg/FieldIconSvg'
import { format, parse } from 'date-fns'
import usePressAndHover from '@/components/hooks/usePressAndHover'
import FieldError from '../FieldError'
import { colors } from '@/styles/variables'
import FieldLabel, {LabelStyleType} from '@/components/fields/FieldLabel'

interface Props extends IField<string> {
  maxDate?: Date
  minDate?: Date
  labelStyleType?: LabelStyleType
  visibleYearSelector?: boolean
  excludeDates?: Date[]
  datePickerProps?: DeepPartial<ReactDatePickerProps<string, false>>
}

export default function DateField(props: Props) {
  const [wrapperRef, press, hover] = usePressAndHover()
  const [field, meta, helpers] = useField<string>(props as any)
  const showError = meta.touched && !!meta.error
  return (
    <div className={styles.root} data-field={props.name}>
      {props.label &&
        <FieldLabel label={props.label} styleType={props.labelStyleType} />
      }
      <div className={styles.wrapper} ref={wrapperRef}>

        <DatePicker<string, false>
          name={props.name}
          className={classNames({
            [styles.input]: true,
            [styles.error]: showError,
            [styles.withIcon]: props.iconName,
            [styles.hover]: hover,
            [styles.press]: press,
          },)}
         // locale={en}
          selected={field.value ? parse(field.value, 'dd.MM.yyyy', new Date()) : null}
          dateFormat="dd.MM.yyyy"
          placeholderText={props.placeholder}
          forceShowMonthNavigation={false}
          popperPlacement="bottom"
          showYearDropdown={props.visibleYearSelector}
          showMonthDropdown={props.visibleYearSelector}
          dropdownMode="select"
          maxDate={props.maxDate}
          minDate={props.minDate}
          excludeDates={props.excludeDates}
          onFocus={(e) => {
            e.target.blur()
          }}
          onChange={(date) => {
            if (date) {
              helpers.setValue(format(date, 'dd.MM.yyyy'))
            }
          }}
          {...props.datePickerProps as any}
        />
        {props.iconName && (
          <FieldIconSvg
            iconName={props.iconName}
            error={showError}
            color={colors.textSecondary}
            className={classNames([styles.icon])}
          />
        )}
        <FieldError showError={showError}>{meta.error}</FieldError>
      </div>
    </div>
  )
}

