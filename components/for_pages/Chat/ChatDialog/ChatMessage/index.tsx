import IChatMessage from '@/data/interfaces/IChatMessage'
import {ChatMessageType} from '@/data/enum/ChatMessageType'
import {ChatMessageProps} from '@/types/types'
import ChatMessageText from 'components/for_pages/Chat/ChatDialog/ChatMessage/components/ChatMessageText'
import ChatMessagePhotos from 'components/for_pages/Chat/ChatDialog/ChatMessage/components/ChatMessagePhotos'
import ChatMessageFiles from 'components/for_pages/Chat/ChatDialog/ChatMessage/components/ChatMessageFiles'
import ChatMessageSystemOwner
  from 'components/for_pages/Chat/ChatDialog/ChatMessage/components/ChatMessageSystemOwner'


interface Props extends ChatMessageProps{
  message: IChatMessage
  side: 'my' | 'other'
}

export default function ChatMessage(props: Props) {
  switch (props.message.type){
    case ChatMessageType.Text:
      return <ChatMessageText {...props}/>
    case ChatMessageType.Asset:
      if((props.message.assets?? []).every((i) => i.type === 'IMAGE')){
        return <ChatMessagePhotos  {...props}/>
      }else{
        return <ChatMessageFiles {...props}/>
      }
    case ChatMessageType.Application:
    case ChatMessageType.Proposal:
      return <ChatMessageSystemOwner {...props}/>
    default:
      return null

  }
}


