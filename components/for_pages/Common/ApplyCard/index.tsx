import styles from './index.module.scss'
import AvatarCircular from '@/components/ui/AvatarCircular'
import {IVacancyWithApply} from '@/data/interfaces/IVacancy'
import ChipList from '@/components/ui/ChipList'
import Chip from '@/components/ui/Chip'
import Formatter from '@/utils/formatter'
import Button from '@/components/ui/Button'
import HideSvg from '@/components/svg/HideSvg'
import StatisticSvg from '@/components/svg/StatisticSvg'
import VacancyUtils from '@/utils/VacancyUtils'
import Card from '@/components/for_pages/Common/Card'

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


  return (
    <Card className={styles.root}>
      <div className={styles.top}>
        <div className={styles.avatar}>
          <AvatarCircular size={68} initials={vacancy.company?.name?.slice(0, 2) ?? null} file={vacancy.company.logo}/>
        </div>
        <div className={styles.topRight}>
          <div className={styles.topRightTop}>
            <div className={styles.title}>{vacancy.name}</div>
            <div className={styles.status}>Closed</div>
          </div>

          <div className={styles.salary}>{VacancyUtils.formatSalary(vacancy)}</div>
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
        <div className={styles.createdAt}>{Formatter.formatDate(vacancy.createdAt)}</div>
      </div>
      <div className={styles.bottom}>
        <Button icon={<HideSvg/>} color={'transparent'}>Hide</Button>
        <Button icon={<StatisticSvg/>} color={'transparent'}>Statistic</Button>
      </div>
    </Card>
  )
}
export const ApplyCard = (props: Props) => {
  return <ApplyCardInner {...props}/>

}
