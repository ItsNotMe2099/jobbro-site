import styles from './index.module.scss'
import {ChatMessageProps} from '@/types/types'
import ChatMessageCardLayout from 'components/for_pages/Chat/ChatDialog/ChatMessage/components/ChatMessageCardLayout'
import {format} from 'date-fns'
import {ChatDialogRoute, useChatDialogContext} from '@/context/chat_dialog_state'
import {EventStatus} from '@/data/enum/EventStatus'
import Button from '@/components/ui/Button'
import {useAppContext} from '@/context/state'
import {ProfileType} from '@/data/enum/ProfileType'
import useTranslation from 'next-translate/useTranslation'


interface Props extends ChatMessageProps {
}

export default function ChatMessageEvent(props: Props) {
  const date = new Date()
  const appContext = useAppContext()
  const chatDialogContext = useChatDialogContext()
  const {t} = useTranslation()
  const event = props.message.event
  if(!event){
    return null
  }
  return <ChatMessageCardLayout message={props.message} side={props.side}>
    <div className={styles.root}>
      <div className={styles.date}>
        <div className={styles.label}>{t('chat_message_type_event_today')}</div>
        <div className={styles.day}>{format(date, 'dd MMM')}</div>
        <div className={styles.weekDay}>{format(date, 'EEEE')}</div>
      </div>
      <div className={styles.right}>
        {event.status === EventStatus.Confirmed && <div className={styles.title}>
          {t('chat_message_type_event_selected_slot')}
        </div>}
        {event.status === EventStatus.Confirmed && <div className={styles.slot}>
          <div className={styles.day}>{format(new Date(event.start!), 'dd MMM EEEE')}</div>
          <div className={styles.time}>{format(new Date(event.start!), 'HH:mm')} - {format(new Date(event.end!), 'HH:mm')}</div>
        </div>}
          {event.status !== EventStatus.Confirmed && event.slots.slice(0, 2).map((i) => <div className={styles.slot}>
          <div className={styles.day}>{format(new Date(i.start), 'dd MMM EEEE')}</div>
          <div className={styles.time}>{format(new Date(i.start), 'HH:mm')} - {format(new Date(i.end), 'HH:mm')}</div>
        </div>)}
        {appContext.aboutMe?.profileType === ProfileType.Employee && event.status !== EventStatus.Confirmed &&
          <div
            className={styles.edit}
            onClick={() => chatDialogContext.setRoute(ChatDialogRoute.SelectEventSlot, {eventId: event.id})}
          >
            {event.slots.length > 2 &&
              <p className={styles.count}>{event.slots.length - 2} +</p>
            }
            {t('chat_message_type_event_select_slot')}
          </div>
        }
        {appContext.aboutMe?.profileType === ProfileType.Hirer && event.status !== EventStatus.Confirmed &&
          <div
            className={styles.edit}
            onClick={() => chatDialogContext.setRoute(ChatDialogRoute.EditEvent, {eventId: event.id})}
          >
            {event.slots.length > 2 &&
              <p className={styles.count}>{event.slots.length - 2} +</p>
            }
            {t('chat_message_type_event_edit')}
          </div>
        }
        {event.status == EventStatus.Confirmed && !!event.place  &&  <div className={styles.startMeet}><Button  type='button' href={event.place} isExternalHref={true}  styleType='medium' color='green'>
          {t('chat_message_type_event_start_meet')}
        </Button></div>}
      </div>
    </div>
  </ChatMessageCardLayout>
}


