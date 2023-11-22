import styles from 'components/for_pages/Chat/ChatDialog/ChatMessage/components/ChatMessageFiles/index.module.scss'
import {ChatMessageProps} from '@/types/types'
import ChatMessageCardLayout from 'components/for_pages/Chat/ChatDialog/ChatMessage/components/ChatMessageCardLayout'
import DocumentPreview from '@/components/ui/DocumentPreview'
import Link from 'next/link'
import IFile from '@/data/interfaces/IFile'
import ImageHelper from '@/utils/ImageHelper'
interface Props extends ChatMessageProps{
}

export default function ChatMessageFiles(props: Props) {
  return <ChatMessageCardLayout message={props.message} side={props.side}>
    <div className={styles.root}>
      {props.message.assets?.map((i: IFile) => <Link href={ImageHelper.urlFromSource(i.source)} target={'_blank'} className={styles.file}>
          <DocumentPreview file={i.source}  className={styles.icon}/>
        <div className={styles.name}>{i.name}</div>
      </Link>)}
    </div>
    {props.message.message ? <div className={styles.text}>{props.message.message!}</div> : <></>}

  </ChatMessageCardLayout>
}


