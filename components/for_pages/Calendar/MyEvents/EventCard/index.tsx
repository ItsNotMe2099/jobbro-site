import styles from './index.module.scss'
import IEvent from '@/data/interfaces/IEvent'
import AvatarCircular from '@/components/ui/AvatarCircular'
import ClockSvg from '@/components/svg/ClockSvg'
import {colors} from '@/styles/variables'
import {format} from 'date-fns'
import {useAppContext} from '@/context/state'
import {ProfileType} from '@/data/enum/ProfileType'

interface Props {
  event: IEvent
}

export const EventCard = (props: Props) => {
  const appContext = useAppContext()
  const company = props.event.vacancy?.company

  const name = appContext.aboutMe?.profileType === ProfileType.Hirer ? props.event.vacancy.name : props.event.vacancy.name
  const desc = ''
  return (
    <div className={styles.root}>
      {props.event.start && <div className={styles.startTime}>{format(new Date(props.event.start), 'HH:mm')}</div>}
      <div className={styles.wrapper}>
        <div className={styles.photo}>
          {company && <AvatarCircular file={company?.logo} initials={company?.name?.charAt(0) ?? null}/>}
        </div>
        <div className={styles.right}>
          <div className={styles.title}>{name}</div>
          {desc && 
            <div className={styles.desc}>{desc}</div>
          }
          {props.event.start && props.event.end && <div className={styles.times}>
            <ClockSvg color={colors.green}/>
            <div >
              {format(new Date(props.event.start), 'HH:mm')} - {format(new Date(props.event.end), 'HH:mm')}
            </div>
          </div>}
        </div>
      </div>
    </div>
  )
}
