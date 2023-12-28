import styles from './index.module.scss'
import { ReactElement } from 'react'
import CalendarPictureSvg from '@/components/svg/CalendarPictureSvg'
import useTranslation from 'next-translate/useTranslation'

interface Props {
  children?: ReactElement | ReactElement[]
}

export const MyEventsEmpty = (props: Props) => {
  const { t } = useTranslation()
  return (
      <div className={styles.root}>
        <CalendarPictureSvg className={styles.pic} />
        <div className={styles.schedule}>
          {t('event_select_events_stub_title')}
        </div>
        <div className={styles.bottom}>
          {t('event_select_events_stub_desc')}
        </div>
      </div>
  )
}
