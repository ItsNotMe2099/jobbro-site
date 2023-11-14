import Card from '@/components/for_pages/Common/Card'
import styles from './index.module.scss'
import classNames from 'classnames'
import LocationSvg from '@/components/svg/LocationSvg'
import {colors} from '@/styles/variables'
import IconInCircleSvg from '@/components/svg/IconInCircleSvg'
import {ICV} from '@/data/interfaces/ICV'
import UserUtils from '@/utils/UserUtils'
import VacancyUtils from '@/utils/VacancyUtils'
import {Relocation} from '@/data/enum/Relocation'
import AvatarCircular from '@/components/ui/AvatarCircular'

interface Props {
  cv: ICV
}

export default function CardWithPhoto(props: Props) {
  const {cv} = props
  return (
    <Card>
      <div className={styles.container}>
        <AvatarCircular size={120} file={cv.image ?? cv.profile?.image}/>
        <div className={styles.right}>
          <div className={styles.positionAndSalary}>
            <div className={styles.position}>
              <div>{cv.position}</div>
              <div className={styles.name}>
                {UserUtils.getName(cv)}
              </div>
            </div>
            <div className={styles.salary}>
              {VacancyUtils.formatSalary(cv)}
            </div>
          </div>
          <div className={styles.location}>
            <div className={classNames(styles.ready, { [styles.notReady]: cv.relocation !== Relocation.yes  })}>
              {cv.relocation === Relocation.yes ? 'Ready to relocate' : 'Not ready to relocate'}
            </div>
            {cv.country && <div className={styles.country}>
              <LocationSvg color={colors.textSecondary} />
              <div>{cv.country?.name}</div>
            </div>}
          </div>
          {(cv.contacts?.length > 0) && <div className={styles.contacts}>
            <div className={styles.title}>
              Contacts
            </div>
            {cv.contacts.filter(i => !!i.email).length > 0 && <div className={styles.email}>
              <IconInCircleSvg color={colors.green} circleColor='#DBF9DD' />
              {cv.contacts?.filter(i => !!i.email).map(i => <a href={`mailto:${i.email}`}>{i.email}</a>)}
            </div>}
            {cv.contacts.filter(i => !!i.phone).length > 0  && <div className={styles.email}>
              <IconInCircleSvg color={colors.green} circleColor='#DBF9DD' phone />
              {cv.contacts?.filter(i => !!i.phone).map(i => <a href={`tel:${i.phone}`}>{i.phone}</a>)}
            </div>}
          </div>}
        </div>
      </div>
    </Card>
  )
}
