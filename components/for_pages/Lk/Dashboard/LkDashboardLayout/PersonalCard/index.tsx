import AvatarCircular from '@/components/ui/AvatarCircular'
import styles from './index.module.scss'
import Card from '@/components/for_pages/Common/Card'
import LocationSvg from '@/components/svg/LocationSvg'
import { colors } from '@/styles/variables'
import {useAppContext} from '@/context/state'
import UserUtils from '@/utils/UserUtils'
import {IManager} from '@/data/interfaces/IManager'
import {Nullable} from '@/types/types'


interface Props {
  manager?: Nullable<IManager> | undefined
}

export default function PersonalCard(props: Props) {
  const appContext = useAppContext()
  return (
    <Card className={styles.root}>
      <AvatarCircular className={styles.avatar} file={props.manager ? props.manager.image : appContext.aboutMe?.image} />
      <div className={styles.right}>
        <div className={styles.position}>

        </div>
        <div className={styles.name}>
          {UserUtils.getName(props.manager ?? appContext.aboutMe)}
        </div>
        {appContext.aboutMe?.country && <div className={styles.location}>
          <LocationSvg color={colors.textSecondary} />
          <div>{props.manager ? props.manager.country?.name : appContext.aboutMe?.country?.name}</div>
        </div>}
      </div>
    </Card>
  )
}
