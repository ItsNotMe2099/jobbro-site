import PersonSvg from '@/components/svg/PersonSvg'
import styles from './index.module.scss'
import {colors} from '@/styles/variables'
import classNames from 'classnames'
import Link from 'next/link'
import {Routes} from '@/types/routes'
import {CardViewType, ModalType} from '@/types/enums'
import {IVacancy} from '@/data/interfaces/IVacancy'
import {PublishStatus} from '@/data/enum/PublishStatus'
import {IOption} from '@/types/types'
import {useVacancyOwnerContext, VacancyOwnerWrapper} from '@/context/vacancy_owner_state'
import VacancyUtils from '@/utils/VacancyUtils'
import {format} from 'date-fns'
import MenuButton from '@/components/ui/MenuButton'
import {useRouter} from 'next/router'
import useTranslation from 'next-translate/useTranslation'
import JobStatus from '@/components/for_pages/Lk/Jobs/JobCard/JobStatus'
import {useAppContext} from '@/context/state'
import {IShareModalArgs} from '@/components/modals/ShareModal'

enum MenuKey{
  Edit = 'edit',
  Duplicate = 'duplicate',
  Share = 'share',
  Delete = 'delete'
}
interface Props {
  vacancy: IVacancy
  className?: string
  view: CardViewType
}

const JobCardInner = (props: Props) => {
  const vacancyContext = useVacancyOwnerContext()
  const appContext = useAppContext()
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



  const menuOptions: IOption<MenuKey>[] =  [
    {label: t('job_card_menu_edit'), value: MenuKey.Edit},
    {label: t('job_card_menu_duplicate'), value: MenuKey.Duplicate},
    {label: t('job_card_menu_share'), value: MenuKey.Share},
    {label: t('job_card_menu_delete'), value: MenuKey.Delete, color: colors.textRed},
  ]
  const handleMenuItemClick = (key: MenuKey) => {
    switch (key){
      case MenuKey.Edit:
          router.push(Routes.lkJobEdit(vacancy.id))
        break
      case MenuKey.Duplicate:
        router.push(Routes.lkJobClone(vacancy.id))
        break
      case MenuKey.Share:
        appContext.showModal<IShareModalArgs>(ModalType.ShareModal, {link: Routes.getGlobal(Routes.job(vacancy.id))})
        // navigator.clipboard.writeText(Routes.getGlobal(Routes.job(vacancy.id)))
        // showToast({title: t('toast_job_share_copied_link')})
        break
      case MenuKey.Delete:
        vacancyContext.delete()
        break
    }
  }
  const formattedPublishDate = format(new Date(vacancy.schedulePublishAt ?? vacancy.createdAt),'dd MMMM yyyy')
  return (
    <div className={classNames(styles.root, props.className, { [styles.row]: props.view === 'row', [styles.closed]: props.vacancy.status === PublishStatus.Closed })}>
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
        <MenuButton<MenuKey> key={vacancy.id} options={menuOptions} onClick={handleMenuItemClick}/>
      </div>
    </div>
  )
}
export default function JobCard(props: Props) {
  return <VacancyOwnerWrapper vacancy={props.vacancy} vacancyId={props.vacancy.id}>
    <JobCardInner className={props.className} vacancy={props.vacancy} view={props.view}/>
  </VacancyOwnerWrapper>
}
