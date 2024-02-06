import styles from './index.module.scss'
import {ChatMessageProps} from '@/types/types'
import ChatMessageCardLayout from 'components/for_pages/Chat/ChatDialog/ChatMessage/components/ChatMessageCardLayout'
import {format} from 'date-fns'
import {ChatDialogRoute, useChatDialogContext} from '@/context/chat_dialog_state'
import {EventStatus} from '@/data/enum/EventStatus'
import Button from '@/components/ui/Button'


interface Props extends ChatMessageProps {
}

export default function ChatMessageEvent(props: Props) {
  const date = new Date()
  const chatDialogContext = useChatDialogContext()
  const event = props.message.event
  if(!event){
    return null
  }
  return <ChatMessageCardLayout message={props.message} side={props.side}>
    <div className={styles.root}>
      <div className={styles.date}>
        <div className={styles.label}>Today</div>
        <div className={styles.day}>{format(date, 'dd MMM')}</div>
        <div className={styles.weekDay}>{format(date, 'EEEE')}</div>
      </div>
      <div className={styles.right}>
        {event.status === EventStatus.Confirmed && <div className={styles.title}>
          Selected slot
        </div>}
        {event.status === EventStatus.Confirmed && <div className={styles.slot}>
          <div className={styles.day}>{format(new Date(event.start!), 'dd MMM EEEE')}</div>
          <div className={styles.time}>{format(new Date(event.start!), 'HH:mm')} - {format(new Date(event.end!), 'HH:mm')}</div>
        </div>}
          {event.status !== EventStatus.Confirmed && event.slots.slice(0, 2).map((i) => <div className={styles.slot}>
          <div className={styles.day}>{format(new Date(i.start), 'dd MMM EEEE')}</div>
          <div className={styles.time}>{format(new Date(i.start), 'HH:mm')} - {format(new Date(i.end), 'HH:mm')}</div>
        </div>)}
        {event.status !== EventStatus.Confirmed && 
          <div 
          className={styles.edit} 
          onClick={() => chatDialogContext.setRoute(ChatDialogRoute.SelectEventSlot, {eventId: event.id})}
          >
            {event.slots.length > 2 && 
              <p className={styles.count}>{event.slots.length - 2} +</p>
            }
            Select a slot
          </div>
        }
        {event.status == EventStatus.Confirmed && !!event.place  &&  <div className={styles.startMeet}><Button  type='button' href={event.place} isExternalHref={true}  styleType='medium' color='green'>
          Start Meet
        </Button></div>}
      </div>
    </div>
  </ChatMessageCardLayout>
}


