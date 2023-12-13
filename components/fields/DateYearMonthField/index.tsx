import { IField } from 'types/types'
import DateField from '@/components/fields/DateField'

interface Props extends IField<string> {
  maxDate?: Date
  minDate?: Date
  visibleYearSelector?: boolean
  excludeDates?: Date[]
}

export default function DateYearMonthField(props: Props) {
 return <DateField {...props} datePickerProps={{
   dateFormat: 'MM/yyyy',
   showMonthYearPicker: true
 }}/>
}

