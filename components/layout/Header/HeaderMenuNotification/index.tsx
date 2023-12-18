import styles from './index.module.scss'
import {useEffect, useRef, useState} from 'react'
import Link from 'next/link'
import {Routes} from '@/types/routes'
import NotificationRepository from '@/data/repositories/NotificationRepository'
import {IPagination} from '@/data/interfaces/IPaginationRequest'
import INotification from '@/data/interfaces/INotification'
import HeaderNotificationCard from '@/components/layout/Header/HeaderMenuNotification/HeaderNotificationCard'
import {useTranslation} from 'next-i18next'

interface Props {
  isOpen: boolean
}

export default function HeaderMenuNotification(props: Props) {
  const [data, setData] = useState<IPagination<INotification>>({data: [], total: 0})
  const initOpenRef = useRef<boolean>(false)
  const { t } = useTranslation()

  useEffect(() => {
    if(!props.isOpen){
      return
    }
    if(!initOpenRef.current) {
      initOpenRef.current = true
    }
    NotificationRepository.fetch({ page: 1, limit: 10}).then(i => setData(i))
  }, [props.isOpen])
  return (
   <div className={styles.root}>
     <div className={styles.title}>{t('header_notifications')}</div>
     <div className={styles.chats}>
       {data.data.map(i => <HeaderNotificationCard notification={i}/>)}
     </div>

     <Link href={Routes.chat} className={styles.viewMore}>{t('header_notifications_view_more')}</Link>
   </div>
  )
}

