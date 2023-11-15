import {ChatMessageProps} from '@/types/types'
import ChatMessageCardLayout from 'components/for_pages/Chat/ChatDialog/ChatMessage/components/ChatMessageCardLayout'
interface Props extends ChatMessageProps{
}

export default function ChatMessageText(props: Props) {
  return <ChatMessageCardLayout message={props.message} side={props.side}>
    {props.message?.message}
  </ChatMessageCardLayout>
}


