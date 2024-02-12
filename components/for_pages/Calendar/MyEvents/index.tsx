import styles from './index.module.scss'
import { ReactElement, useState } from 'react'
import Card from '@/components/for_pages/Common/Card'
import CalendarSvg from '@/components/svg/CalendarSvg'
import { colors } from '@/styles/variables'
import { format } from 'date-fns'
import {useEventListContext} from '@/context/event_list_context'
import {MyEventsEmpty} from '@/components/for_pages/Calendar/MyEvents/MyEventsEmpty'
import ContentLoader from '@/components/ui/ContentLoader'
import {EventCard} from '@/components/for_pages/Calendar/MyEvents/EventCard'
import classNames from 'classnames'
import { useAppContext } from '@/context/state'
import useTranslation from 'next-translate/useTranslation'

interface Props {
  children?: ReactElement | ReactElement[]
  className?: string
}

export const MyEvents = (props: Props) => {
  const {isTabletWidth} = useAppContext().size
  const eventListContext = useEventListContext()
  const {t} = useTranslation()
  const [open, setOpen] = useState<boolean>(false)

  return (
    <Card className={classNames(styles.root, props.className)}>
      <div className={styles.wrapper}>
        <div className={styles.top}>
          <div className={styles.calendar}>
            <CalendarSvg color={colors.white} />
          </div>
          <div className={styles.date}>
            {format(new Date(), 'EEEE, MMM dd')}
          </div>
          {isTabletWidth &&
          <p className={styles.counter}>{t('events_my_meets', {count: eventListContext.events.length})}</p>
          }
        </div>
        {!isTabletWidth &&
          <div className={styles.separator} />
        }
        {eventListContext.loading &&
          <ContentLoader isOpen={true}/>
        }
        {!eventListContext.loading && eventListContext.events.length === 0 &&
          <MyEventsEmpty/>
        }
        {!eventListContext.loading && eventListContext.events.length > 0 &&
          <>
          <div className={classNames(styles.events, open && isTabletWidth && styles.open) }>
            {(open ? eventListContext.events : eventListContext.events.slice(0, 2)).map(i => <EventCard key={i.id} event={i}/>)}
          </div>
            {isTabletWidth &&
              <p className={styles.watchAllMobile} onClick={() => setOpen(!open)}>{t('events_my_view_all')}</p>
            }
            {!isTabletWidth && !open &&  eventListContext.events.length > 2 &&
              <p className={styles.watchAllDesktop} onClick={() => setOpen(!open)}>{t('events_my_view_all')}</p>
            }
          </>
        }
      </div>
    </Card>
  )
}
