import PersonSvg from '@/components/svg/PersonSvg'
import styles from './index.module.scss'
import {colors} from '@/styles/variables'
import classNames from 'classnames'
import Link from 'next/link'
import {Routes} from '@/types/routes'
import {CardViewType, Goal} from '@/types/enums'
import {IVacancy} from '@/data/interfaces/IVacancy'
import {PublishStatus} from '@/data/enum/PublishStatus'
import {IOptionGroup} from '@/types/types'
import {useVacancyOwnerContext, VacancyOwnerWrapper} from '@/context/vacancy_owner_state'
import VacancyUtils from '@/utils/VacancyUtils'
import {format} from 'date-fns'
import MenuButton from '@/components/ui/MenuButton'
import {useRouter} from 'next/router'
import useTranslation from 'next-translate/useTranslation'
import Analytics from '@/utils/goals'
import JobStatus from '@/components/for_pages/Lk/Jobs/JobCard/JobStatus'

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
  const { t } = useTranslation()
  const getColor = (status: PublishStatus) => {
    switch (status) {
      case PublishStatus.Draft:
        return colors.blue
      case PublishStatus.Published:
        return colors.grey
      case PublishStatus.Paused:
        return colors.lightOrange
      case PublishStatus.Closed:
        return colors.grey
    }
  }



  const menuGroups: IOptionGroup<MenuKey>[] = [
    ...(!([PublishStatus.Closed] as PublishStatus[]).includes(vacancy.status) ? [
      {title: t('job_card_menu_status'), options: [
          ...(!([PublishStatus.Published, PublishStatus.Closed] as PublishStatus[]).includes(vacancy.status) ? [
            {label: t('job_card_menu_publish'), value: MenuKey.Publish},
          ] : []),
          ...(!([PublishStatus.Paused] as PublishStatus[]).includes(vacancy.status) ? [
            {label: t('job_card_menu_pause'), value: MenuKey.Pause},
          ] : []),

          {label: t('job_card_menu_close'), value: MenuKey.Close},
        ]},
]: []),

    {title: t('job_card_menu_operations'), options: [
        {label: t('job_card_menu_edit'), value: MenuKey.Edit},
        {label: t('job_card_menu_duplicate'), value: MenuKey.Duplicate},
        {label: t('job_card_menu_delete'), value: MenuKey.Delete, color: colors.textRed},
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
        Analytics.goal(Goal.JobClose)
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
      <Link href={Routes.lkJob(vacancy.id)} className={classNames(styles.container)}
        style={{ backgroundColor: getColor(props.vacancy.status) }}>
        <div className={styles.wrapper}>
          {props.view !== 'row' && <div className={styles.top}>
            <div className={styles.publish}>
              <div className={styles.published}>
                {t('job_card_publish_date')}:
              </div>
              <div className={styles.date}>
                {formattedPublishDate}
              </div>
            </div>
            <div className={styles.employees}>
              <PersonSvg color={colors.textSecondary} />
              <div className={styles.quantity}>
                {parseInt(props.vacancy.totalApplications, 10) + parseInt(props.vacancy.totalProposals, 10)}
              </div>
            </div>
          </div>}
          <div className={styles.middle}>
            <div className={styles.published}>
              {vacancy.project?.title ?? <>&nbsp;</>}
            </div>
            <div className={styles.name}>
              {vacancy.name}
            </div>
          </div>
          {props.view === CardViewType.Row && <JobStatus/>}
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
                  {parseInt(props.vacancy.totalApplications, 10) + parseInt(props.vacancy.totalProposals, 10)}
                </div>
              </div>
              <div className={styles.publish}>
                <div className={styles.published}>
                  {t('job_card_publish_date')}:
                </div>
                <div className={styles.date}>
                  {formattedPublishDate}
                </div>
              </div>
            </div>
          </div>}
        {props.view === CardViewType.Card && <JobStatus/>}
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
