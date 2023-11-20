import styles from './index.module.scss'
import Link from 'next/link'
import INotification from '@/data/interfaces/INotification'
interface Props {
  notification: INotification
}

export default function HeaderNotificationCard(props: Props) {

  return (
    <Link href={'#'} className={styles.root}>
         <div className={styles.name}>
            {props.notification.title}
          </div>
        <div className={styles.message}>
          {props.notification.body}
          </div>
    </Link>
  )
}
