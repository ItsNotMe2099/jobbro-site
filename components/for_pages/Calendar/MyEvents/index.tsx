import styles from 'components/for_pages/Calendar/MyEvents/index.module.scss'
import { ReactElement } from 'react'
import Card from '@/components/for_pages/Common/Card'
import CalendarSvg from '@/components/svg/CalendarSvg'
import { colors } from '@/styles/variables'
import { format } from 'date-fns'
import {useEventListContext} from '@/context/event_list_context'
import {MyEventsEmpty} from '@/components/for_pages/Calendar/MyEvents/MyEventsEmpty'
import ContentLoader from '@/components/ui/ContentLoader'
import {EventCard} from '@/components/for_pages/Calendar/MyEvents/EventCard'

interface Props {
  children?: ReactElement | ReactElement[]
}

export const MyEvents = (props: Props) => {
  const eventListContext = useEventListContext()
  return (
    <Card className={styles.root}>
      <div className={styles.wrapper}>
        <div className={styles.top}>
          <div className={styles.calendar}>
            <CalendarSvg color={colors.white} />
          </div>
          <div className={styles.date}>
            {format(new Date(), 'EEEE, MMM dd')}
          </div>
        </div>
        <div className={styles.separator} />
        {eventListContext.loading && <ContentLoader isOpen={true}/>}
        {!eventListContext.loading && eventListContext.events.length === 0 && <MyEventsEmpty/>}

        {!eventListContext.loading && eventListContext.events.length > 0 && <div className={styles.events}>
          {eventListContext.events.map(i => <EventCard key={i.id} event={i}/>)}
        </div>}
      </div>
    </Card>
  )
}
