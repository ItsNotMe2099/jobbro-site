import styles from './index.module.scss'
import AvatarCircular from '@/components/ui/AvatarCircular'
import {IVacancyWithApply} from '@/data/interfaces/IVacancy'
import ChipList from '@/components/ui/ChipList'
import Chip from '@/components/ui/Chip'
import Formatter from '@/utils/formatter'
import VacancyUtils from '@/utils/VacancyUtils'
import Card from '@/components/for_pages/Common/Card'
import {useNotificationContext} from '@/context/notifications_state'
import {NotificationUnreadType} from '@/data/interfaces/INotification'
import {useEffect} from 'react'

enum MenuKey{
  Publish = 'publish',
  Pause = 'pause',
  Edit = 'edit',
  Download = 'download',
  Duplicate = 'duplicate',
  Delete = 'delete'
}
interface Props {
  vacancy: IVacancyWithApply
}

const ApplyCardInner = (props: Props) => {
  const vacancy = props.vacancy
  const notifyContext = useNotificationContext()
  const active = vacancy.applications.length > 0 ? notifyContext.store[NotificationUnreadType.application].find(i => i.eId === vacancy.applications[0].id) : (vacancy.applications.length > 0 ? notifyContext.store[NotificationUnreadType.proposal].find(i => i.eId === vacancy.proposals[0].id)  : false)
  useEffect(() => {
    if(vacancy.applications.length > 0){
      notifyContext.addRecord(vacancy.applications[0].id, NotificationUnreadType.application)
      return () => {
        notifyContext.removeRecord(vacancy.applications[0].id, NotificationUnreadType.application)
      }
    }else if(vacancy.proposals.length > 0){
      notifyContext.addRecord(vacancy.proposals[0].id, NotificationUnreadType.proposal)
      return () => {
        notifyContext.removeRecord(vacancy.proposals[0].id, NotificationUnreadType.proposal)
      }
    }

  }, [])
  useEffect(() => {
    if (active) {
      if(vacancy.applications.length > 0){
        notifyContext.markRead(vacancy.applications[0].id, NotificationUnreadType.application, false)
      }else if(vacancy.proposals.length > 0){
        notifyContext.markRead(vacancy.proposals[0].id, NotificationUnreadType.proposal, false)
      }

    }
  }, [active])
  return (
    <Card className={styles.root} link={`/job/${vacancy.id}`} >
      <div className={styles.top}>
        <div className={styles.avatar}>
          <AvatarCircular size={68} initials={vacancy.company?.name?.slice(0, 2) ?? null} file={vacancy.company.logo}/>
        </div>
        <div className={styles.topRight}>
          <div className={styles.topRightTop}>
            <div className={styles.title}>{vacancy.name}</div>
            <div className={styles.status}></div>
          </div>

          <div className={styles.salary}>
            {VacancyUtils.formatSalary(vacancy)}
          </div>
        </div>

      </div>
      <div className={styles.center}>
        <div className={styles.company}>
          <div className={styles.companyName}>{vacancy.company.name}</div>
          <div className={styles.companyLocation}>{vacancy.company.country?.name}</div>
        </div>
        <div className={styles.skills}>
        {(vacancy.skills?.length ?? 0) > 0 && <ChipList>
          {vacancy.skills.map(i => <Chip>{i.title}</Chip>)}
        </ChipList>}
        </div>
        <div className={styles.createdAt}>{vacancy.createdAt&&Formatter.formatDate(vacancy.createdAt)}</div>
      </div>
      {/*<div className={styles.bottom}>
        <Button icon={<HideSvg/>} color={'transparent'}>Hide</Button>
        <Button icon={<StatisticSvg/>} color={'transparent'}>Statistic</Button>
      </div>*/}
    </Card>
  )
}
export const ApplyCard = (props: Props) => {
  return <ApplyCardInner {...props}/>

}
