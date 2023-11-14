import styles from 'components/for_pages/Common/CvOwnerCard/index.module.scss'
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

enum MenuKey{
  Publish = 'publish',
  Pause = 'pause',
  Edit = 'edit',
  Download = 'download',
  Duplicate = 'duplicate',
  Delete = 'delete'
}
interface Props {
  cv: ICV
}

const CvOwnerCardInner = (props: Props) => {
  const cvContext = useCVOwnerContext()
  const cv = cvContext.cv!
  const router = useRouter()

  const menuOptions: IOption<MenuKey>[] = [
    ...(!([PublishStatus.Published, PublishStatus.Closed] as PublishStatus[]).includes(cv.status) ? [
      {label: 'Show for hiring', value: MenuKey.Publish},
    ] : []),
    ...(!([PublishStatus.Paused, PublishStatus.Draft] as PublishStatus[]).includes(cv.status) ? [
      {label: 'Hide for hiring', value: MenuKey.Pause},
    ] : []),

        {label: 'Edit', value: MenuKey.Edit},
        {label: 'Duplicate', value: MenuKey.Duplicate},
        {label: 'Delete', value: MenuKey.Delete},

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
