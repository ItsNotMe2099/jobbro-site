import AvatarCircular from '@/components/ui/AvatarCircular'
import styles from './index.module.scss'
import Card from '@/components/for_pages/Common/Card'
import LocationSvg from '@/components/svg/LocationSvg'
import { colors } from '@/styles/variables'


interface Props {
  data: any
}

export default function PersonalCard(props: Props) {

  return (
    <Card className={styles.root}>
      <AvatarCircular className={styles.avatar} file={null} />
      <div className={styles.right}>
        <div className={styles.position}>
          {props.data.position}
        </div>
        <div className={styles.name}>
          {props.data.firstName} {props.data.lastName}
        </div>
        <div className={styles.location}>
          <LocationSvg color={colors.textSecondary} />
          <div>{props.data.location}</div>
        </div>
      </div>
    </Card>
  )
}
