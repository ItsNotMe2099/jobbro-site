import Image from 'next/image'
import styles from './index.module.scss'
import Link from 'next/link'
import { Routes } from '@/types/routes'

interface Props {
  item: any
}

export default function SocialNetworkCard({ item }: Props) {
  return (
    <Link href={Routes.chatId(item.id)} className={styles.root}>
      <Image className={styles.icon} src={item.icon} alt='' fill />
      <div className={styles.content}>
        <div className={styles.main}>
          <div className={styles.name}>
            {item.name}
          </div>
          <div className={styles.message}>
            <div className={styles.messenger}>
              {item.lastMsg.name}:
            </div>
            <div className={styles.msg}>
              {item.lastMsg.msg}
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.date}>
            {item.lastMsg.date}
          </div>
          <div className={styles.unread}>
            {item.unreadMsgs > 99 ? '99+' : item.unreadMsgs}
          </div>
        </div>
      </div>
    </Link>
  )
}
