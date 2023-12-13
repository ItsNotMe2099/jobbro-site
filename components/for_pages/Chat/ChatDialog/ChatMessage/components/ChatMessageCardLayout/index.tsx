import styles from 'components/for_pages/Chat/ChatDialog/ChatMessage/components/ChatMessageCardLayout/index.module.scss'
import classNames from 'classnames'
import {format} from 'date-fns'
import {ReactElement} from 'react'
import {ChatMessageProps} from '@/types/types'

interface Props extends ChatMessageProps{
  children?: ReactElement | ReactElement[] | string | undefined
  color?: 'default' | 'yellow' | undefined
}

export default function ChatMessageCardLayout(props: Props) {

  return (<div className={classNames(styles.root, {
    [styles.sideMy]: props.side === 'my',
    [styles.sideOther]: props.side === 'other',
  }, styles[props.color ?? 'default'])}>
    <div className={styles.message}>
      {props.children}
      <div className={styles.time}>{format(new Date(props.message.createdAt), 'HH:mm')}</div>
    </div>
  </div>)
}


