import styles from './index.module.scss'
import {useAppContext} from 'context/state'
import IChat from 'data/interfaces/IChat'
import {ReactElement, useMemo} from 'react'
import VacancyUtils from '@/utils/VacancyUtils'
import AvatarCircular from '@/components/ui/AvatarCircular'
import { ProfileType } from '@/data/enum/ProfileType'
import Link from 'next/link'

interface Props {
  chat?: IChat
  title?: string | ReactElement | null
  actions?: ReactElement
  hasBack?: boolean
  showBothChatNames?: boolean | undefined
}

export default function ChatHeader(props: Props) {
  const appContext = useAppContext()

  const image = useMemo(() => {
    switch (appContext.aboutMe?.profileType){
      case ProfileType.Employee:
        return props.chat?.vacancy?.company?.logo
      case ProfileType.Hirer:
        return props.chat?.cv?.image
    }
  }, [props.chat])

  const initials = useMemo(() => {
    switch (appContext.aboutMe?.profileType){
      case ProfileType.Employee:
        return props.chat?.vacancy?.company?.name?.charAt(0)
      case ProfileType.Hirer:
        return props.chat?.cv?.name?.charAt(0)
    }
  }, [props.chat])

  return (
    <div className={styles.root}>
      <AvatarCircular size={42} file={image} initials={initials} className={styles.logo}/>
      <div className={styles.title}>{props.chat?.vacancy?.name}</div>
      {props.chat?.vacancy && 
        <div className={styles.salary}>{VacancyUtils.formatSalary(props.chat.vacancy)}</div>
      }
      {props.chat?.vacancy?.office?.country && 
        <div className={styles.office}>{props.chat?.vacancy?.office?.country?.name}</div>
      }
      <Link href={
        {
          pathname: '/job/' + props.chat?.vacancy?.id,
          query: {},
        }
        /*'/job/' + props.chat?.vacancy?.id*/} onClick={()=> appContext.hideModal()} className={styles.link}>Read more</Link>
    </div>
  )
}


