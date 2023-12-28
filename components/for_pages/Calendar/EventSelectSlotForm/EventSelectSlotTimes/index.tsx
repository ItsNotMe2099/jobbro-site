import styles from './index.module.scss'
import {colors} from '@/styles/variables'
import {format} from 'date-fns'
import ClockSvg from '@/components/svg/ClockSvg'
import RadioField from '@/components/fields/RadioField'
import {useEventSlotListContext} from '@/context/event_slot_list_context'
import Validator from '@/utils/validator'
import useTranslation from 'next-translate/useTranslation'

interface Props {

}


export default function EventSelectSlotTimes(props: Props) {
  const eventListContext = useEventSlotListContext()
  const {t} = useTranslation()
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div
          className={styles.day}>{eventListContext.currentDate ? format(eventListContext.currentDate, 'EEEE, MMMM dd') : '&nbsp;'}</div>
        <div className={styles.timezone}>
          <ClockSvg color={colors.simpleGrey}/>
          <div className={styles.label}>{t('event_select_slot_timezone')}</div>
          <div className={styles.value}>{format(new Date(), 'zzz')}</div>
        </div>
      </div>
      <div className={styles.bottom}>
        <RadioField<string> validate={Validator.required} name={'slot'} options={eventListContext.currentDateSlots.map(i => ({
          label: `${format(new Date(i.start), 'HH:mm')} - ${format(new Date(i.end), 'HH:mm')}`,
          value: `${i.start}//${i.end}`
        }))}/>
      </div>
    </div>
  )
}

