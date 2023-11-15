import {ChatMessageProps, Nullable} from '@/types/types'
import {useMemo} from 'react'
import {ChatMessageType} from '@/data/enum/ChatMessageType'
import ChatMessageCardLayout from 'components/for_pages/Chat/ChatDialog/ChatMessage/components/ChatMessageCardLayout'


interface Props extends ChatMessageProps {
}

export default function ChatMessageSystemOwner(props: Props) {
  const text = useMemo<Nullable<string>>(() => {
    switch (props.message.type) {
      case ChatMessageType.Proposal:
        return 'New proposal'
      case ChatMessageType.Application:
        return 'New Application'
      case ChatMessageType.Event:
        return 'new Event'
      default:
        return null
    }
  }, [props.message])
  if (!text) {
    return null
  }
  return <ChatMessageCardLayout message={props.message} side={props.side}>
    {text}
  </ChatMessageCardLayout>
}


