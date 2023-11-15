import styles from './index.module.scss'
import {useAppContext} from 'context/state'
import IChat from 'data/interfaces/IChat'
import {ReactElement} from 'react'
import VacancyUtils from '@/utils/VacancyUtils'

interface Props {
  chat: IChat | null
  title?: string | ReactElement | null
  actions?: ReactElement
  hasBack?: boolean
  onBackClick?: () => void | undefined
  showBothChatNames?: boolean | undefined
}

export default function ChatHeader(props: Props) {
  const appContext = useAppContext()

  return (<div className={styles.root}>
      <div className={styles.title}>{props.chat?.vacancy?.name}</div>
      <div className={styles.details}>

        {props.chat?.vacancy && <div className={styles.detail}> <div className={styles.label}>Salary:</div>
          <div className={styles.value}>{VacancyUtils.formatSalary(props.chat.vacancy)}</div>
        </div>}
        {props.chat?.vacancy?.office?.country && <div className={styles.detail}> <div className={styles.label}>Location:</div>
          <div className={styles.value}>{props.chat?.vacancy?.office?.country?.name}</div>
        </div>}
      </div>
    </div>
  )
}


