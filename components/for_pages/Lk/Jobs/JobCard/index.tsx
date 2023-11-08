import PersonSvg from '@/components/svg/PersonSvg'
import styles from './index.module.scss'
import {colors} from '@/styles/variables'
import classNames from 'classnames'
import Link from 'next/link'
import {Routes} from '@/types/routes'
import {CardViewType} from '@/types/enums'
import {IVacancy} from '@/data/interfaces/IVacancy'
import {PublishStatus} from '@/data/enum/PublishStatus'
import {IOptionGroup} from '@/types/types'
import {useVacancyOwnerContext, VacancyOwnerWrapper} from '@/context/vacancy_owner_state'
import Dictionary from '@/utils/Dictionary'
import VacancyUtils from '@/utils/VacancyUtils'
import {format} from 'date-fns'
import MenuButton from '@/components/ui/MenuButton'
import {useRouter} from 'next/router'

enum MenuKey{
  Publish = 'publish',
  Pause = 'pause',
  Close = 'close',
  Edit = 'edit',
  Duplicate = 'duplicate',
  Delete = 'delete'
}
interface Props {
  vacancy: IVacancy
  className?: string
  view: CardViewType
}

const JobCardInner = (props: Props) => {
  const vacancyContext = useVacancyOwnerContext()
  const vacancy = vacancyContext.vacancy!
  const router = useRouter()
  const getColor = (status: PublishStatus) => {
    switch (status) {
      case PublishStatus.Draft:
        return colors.blue
      case PublishStatus.Published:
        return colors.grey
      case PublishStatus.Paused:
        return colors.lightOrange
    }
  }

  const getColorStatus = (status: PublishStatus) => {
    switch (status) {
      case PublishStatus.Draft:
        return colors.darkBlue
      case PublishStatus.Published:
        return colors.green
      case PublishStatus.Paused:
        return colors.darkOrange
    }
  }

  const menuGroups: IOptionGroup<MenuKey>[] = [
    ...(!([PublishStatus.Closed] as PublishStatus[]).includes(vacancy.status) ? [
      {title: 'Status', options: [
          ...(!([PublishStatus.Published, PublishStatus.Closed] as PublishStatus[]).includes(vacancy.status) ? [
            {label: 'Publish', value: MenuKey.Publish},
          ] : []),
          ...(!([PublishStatus.Paused] as PublishStatus[]).includes(vacancy.status) ? [
            {label: 'Pause', value: MenuKey.Pause},
          ] : []),

          {label: 'Close', value: MenuKey.Close},
        ]},
]: []),

    {title: 'Operations', options: [
        {label: 'Edit', value: MenuKey.Edit},
        {label: 'Duplicate', value: MenuKey.Duplicate},
        {label: 'Delete', value: MenuKey.Delete},
      ]},
  ]
  const handleMenuItemClick = (key: MenuKey) => {
    switch (key){
      case MenuKey.Publish:
        vacancyContext.publish()
        break
      case MenuKey.Pause:
        vacancyContext.pause()
        break
      case MenuKey.Close:
        vacancyContext.close()
        break
      case MenuKey.Edit:
          router.push(Routes.lkJobEdit(vacancy.id))
        break
      case MenuKey.Duplicate:
        break
      case MenuKey.Delete:
        vacancyContext.delete()
        break
    }
  }
  const formattedPublishDate = format(new Date(vacancy.schedulePublishAt ?? vacancy.createdAt),'dd MMMM yyyy')
  return (
    <div className={classNames(styles.root, props.className, { [styles.row]: props.view === 'row' })}>
      <Link href={Routes.lkJob(vacancy.id)} className={classNames(styles.container, { [styles.rowContainer]: props.view === CardViewType.Row })}
        style={{ backgroundColor: getColor(props.vacancy.status) }}>
        <div className={styles.wrapper}>
          {props.view !== 'row' && <div className={styles.top}>
            <div className={styles.publish}>
              <div className={styles.published}>
                Publish Date:
              </div>
              <div className={styles.date}>
                {formattedPublishDate}
              </div>
            </div>
            <div className={styles.employees}>
              <PersonSvg color={colors.textSecondary} />
              <div className={styles.quantity}>
                {props.vacancy.totalApplications}
              </div>
            </div>
          </div>}
          <div className={styles.middle}>
            <div className={styles.published}>
              Market
            </div>
            <div className={styles.name}>
              {vacancy.name}
            </div>
          </div>
          {props.view === CardViewType.Row && <div className={styles.status} style={{ color: getColorStatus(vacancy.status) }}>
            {Dictionary.getVacancyStatusName(vacancy.status)}
          </div>}
        </div>
        {props.view === CardViewType.Row &&
          <div className={styles.rowBottom}>
            <div className={styles.left}>
              <div className={styles.salary}>
                {VacancyUtils.formatSalary(vacancy)}
              </div>
              <div className={styles.country}>
                {vacancy.office?.name}
              </div>
            </div>
            <div className={styles.right}>
              <div className={styles.employees}>
                <PersonSvg color={colors.textSecondary} />
                <div className={styles.quantity}>
                  {props.vacancy.totalApplications}
                </div>
              </div>
              <div className={styles.publish}>
                <div className={styles.published}>
                  Publish Date:
                </div>
                <div className={styles.date}>
                  {formattedPublishDate}
                </div>
              </div>
            </div>
          </div>}
        {props.view === CardViewType.Card && <div className={styles.status} style={{ color: getColorStatus(vacancy.status) }}>
          {Dictionary.getVacancyStatusName(vacancy.status)}
        </div>}
      </Link>
      <div className={styles.bottom}>
        {props.view === CardViewType.Card && <div className={styles.left}>
          <div className={styles.salary}>
            {VacancyUtils.formatSalary(vacancy)}
          </div>
          <div className={styles.country}>
            {vacancy.office?.name}
          </div>
        </div>}
        <MenuButton<MenuKey> groups={menuGroups} onClick={handleMenuItemClick}/>
      </div>
    </div>
  )
}
export default function JobCard(props: Props) {
  return <VacancyOwnerWrapper vacancy={props.vacancy} vacancyId={props.vacancy.id}>
    <JobCardInner className={props.className} vacancy={props.vacancy} view={props.view}/>
  </VacancyOwnerWrapper>
}
