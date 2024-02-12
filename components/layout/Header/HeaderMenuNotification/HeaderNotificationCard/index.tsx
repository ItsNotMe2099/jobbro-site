import styles from './index.module.scss'
import INotification, {NotificationType} from '@/data/interfaces/INotification'
import {useRouter} from 'next/router'
import {Routes} from '@/types/routes'
interface Props {
  notification: INotification
}

export default function HeaderNotificationCard(props: Props) {
  const router = useRouter()
  const handleClick = () => {

    switch (props.notification.type) {
      case NotificationType.chatMessage:
        if(props.notification.message?.chatId) {
          router.push(Routes.chatId(props.notification.message?.chatId!))
        }else{
          router.push(Routes.chatAll)
        }
        break
      case NotificationType.newApplication:
        router.push(Routes.lkJob(props.notification.vacancyId!))
        break
      case NotificationType.newProposal:
        router.push(Routes.lkApplies)
        break
      case NotificationType.cvRejected:
        router.push(Routes.lkApplies)
        break
      case NotificationType.vacancyRejected:
        router.push(Routes.lkJob(props.notification.vacancyId!))
        break
    }
  }
  return (
    <div className={styles.root} onClick={handleClick}>
         <div className={styles.name}>
            {props.notification.title}
          </div>
        <div className={styles.message}>
          {props.notification.body}
          </div>
    </div>
  )
}
