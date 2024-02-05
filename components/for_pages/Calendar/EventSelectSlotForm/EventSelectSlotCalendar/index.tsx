import styles from './index.module.scss'
import useTranslation from 'next-translate/useTranslation'
import CalendarToolbar from '@/components/for_pages/Common/Calendar/CalendarToolbar'
import EventCalendar from '@/components/ui/EventCalendar'
import {useEventSlotListContext} from '@/context/event_slot_list_context'
import classNames from 'classnames'
import {endOfMonth, format, startOfMonth} from 'date-fns'
import {Nullable} from '@/types/types'

interface Props {
  selectSlotDateStr: Nullable<string>
  onClickDay?: () => void
}

export default function EventSelectSlotCalendar(props: Props) {
  const eventListContext = useEventSlotListContext()
  const {t} = useTranslation()
  return (
    <div className={styles.root}>
      <CalendarToolbar onChangeDate={(date) => eventListContext.setRange(startOfMonth(date), endOfMonth(date))} currentDate={eventListContext.rangeStartDate}/>
      <EventCalendar
        onClickDay={props.onClickDay}
        onChange={(value) => eventListContext.setCurrentDate(value! as Date)}
        {...(eventListContext.currentDate? {value: eventListContext.currentDate} : {})}
        activeStartDate={eventListContext.rangeStartDate}
        defaultActiveStartDate={eventListContext.rangeEndDate}
        showNavigation={false}
        view={'month'}
        tileClassName={({
          activeStartDate,
          date,
          view,
        })=> classNames({
          [styles.hasSlots]: !!eventListContext.slots.find(i => i.date === format(date, 'yyyy-MM-dd')),
          [styles.hasSelectedSlot]: props.selectSlotDateStr === format(date, 'yyyy-MM-dd')
        })}
      />
    </div>
  )
}

