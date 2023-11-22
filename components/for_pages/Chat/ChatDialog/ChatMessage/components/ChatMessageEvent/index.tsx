import styles from './index.module.scss'
import {ChatMessageProps} from '@/types/types'
import ChatMessageCardLayout from 'components/for_pages/Chat/ChatDialog/ChatMessage/components/ChatMessageCardLayout'
import {format} from 'date-fns'
import {ChatDialogRoute, useChatDialogContext} from '@/context/chat_dialog_state'


interface Props extends ChatMessageProps {
}

export default function ChatMessageEvent(props: Props) {
  const date = new Date()
  const chatDialogContext = useChatDialogContext()
  return <ChatMessageCardLayout message={props.message} side={props.side}>
    <div className={styles.root}>
      <div className={styles.date}>
        <div className={styles.label}>Today</div>
        <div className={styles.day}>{format(date, 'dd MMM')}</div>
        <div className={styles.weekDay}>{format(date, 'EEEE')}</div>
      </div>
      <div className={styles.right}>
        {props.message.event?.slots.map((i) => <div className={styles.slot}>
          <div className={styles.day}>{format(new Date(i.start), 'dd MMM EEEE')}</div>
          <div className={styles.time}>{format(new Date(i.start), 'HH:mm')} - {format(new Date(i.end), 'HH:mm')}</div>
        </div>)}
        <div className={styles.edit} onClick={() => chatDialogContext.setRoute(ChatDialogRoute.SelectEventSlot, {eventId: props.message.event?.id})}>Edit</div>
      </div>
    </div>
  </ChatMessageCardLayout>
}


