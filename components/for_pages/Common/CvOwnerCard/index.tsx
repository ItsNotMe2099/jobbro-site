import styles from './index.module.scss'
import Card from '@/components/for_pages/Common/Card'
import Link from 'next/link'
import {Routes} from '@/types/routes'
import {ICV} from '@/data/interfaces/ICV'
import Formatter from '@/utils/formatter'
import {IOption} from '@/types/types'
import {PublishStatus} from '@/data/enum/PublishStatus'
import {CVOwnerWrapper, useCVOwnerContext} from '@/context/cv_owner_state'
import {useRouter} from 'next/router'
import MenuButton from '@/components/ui/MenuButton'
import CvOwnerCardStatus from '@/components/for_pages/Common/CvOwnerCard/CvOwnerCardStatus'
import Analytics from '@/utils/goals'
import {Goal} from '@/types/enums'
import {runtimeConfig} from '@/config/runtimeConfig'
import {colors} from '@/styles/variables'

enum MenuKey{
  Publish = 'publish',
  Pause = 'pause',
  Edit = 'edit',
  Duplicate = 'duplicate',
  Delete = 'delete',
  DownloadPdf = 'downloadPdf'
}
interface Props {
  cv: ICV
}

const CvOwnerCardInner = (props: Props) => {
  const cvContext = useCVOwnerContext()
  const cv = cvContext.cv!
  const router = useRouter()

  const menuOptions: IOption<MenuKey>[] = [
        {label: 'Edit', value: MenuKey.Edit},
        {label: 'Duplicate', value: MenuKey.Duplicate},
    ...(!([PublishStatus.Published, PublishStatus.Closed] as PublishStatus[]).includes(cv.status) ? [
      {label: 'Show for hiring', value: MenuKey.Publish},
    ] : []),
    ...(!([PublishStatus.Paused, PublishStatus.Draft] as PublishStatus[]).includes(cv.status) ? [
      {label: 'Hide for hiring', value: MenuKey.Pause},
    ] : []),
        {label: 'Download', value: MenuKey.DownloadPdf},
        {label: 'Delete', value: MenuKey.Delete, color: colors.textRed},

  ]
  const handleMenuItemClick = (key: MenuKey) => {
    switch (key){
      case MenuKey.Publish:
        cvContext.publish()
        break
      case MenuKey.Pause:
        cvContext.pause()
        break

      case MenuKey.Edit:
        router.push(Routes.profileResumeEdit(cv.id))
        break
      case MenuKey.Duplicate:
        break
      case MenuKey.DownloadPdf:
        Analytics.goal(Goal.CvDownloadPdf)
        window.open(`${runtimeConfig.HOST}/api/cv/${cv!.id}/exportToPdf`, '_blank')
        break
      case MenuKey.Delete:
        cvContext.delete()
        break
    }
  }

  return (
    <div className={styles.root}>
      <Card>
        <div className={styles.wrapper}>
          <div className={styles.top}>
            <div className={styles.title}>{cv.title}</div>
            <CvOwnerCardStatus cv={cv}/>
            <MenuButton<MenuKey> options={menuOptions} onClick={handleMenuItemClick}/>
          </div>
          <div className={styles.updated}>
            Update: {Formatter.formatDateTime(cv.updatedAt)}
          </div>
          <div className={styles.stats}>
            <div className={styles.item}>
              0 jobs
            </div>
            <div className={styles.item}>
              0 impressions
            </div>
            <div className={styles.item}>
              {cv.totalProposals} invites
            </div>
            <div className={styles.item}>
              {cv.totalViews} views
            </div>
          </div>
          <Link className={styles.show} href={''}>
            Show jobs
          </Link>
        </div>
      </Card>
    </div>
  )
}
export const CvOwnerCard = (props: Props) => {
  return <CVOwnerWrapper cv={props.cv} cvId={props.cv.id}>
    <CvOwnerCardInner {...props}/>
  </CVOwnerWrapper>
}
