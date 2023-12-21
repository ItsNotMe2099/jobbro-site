import AvatarCircular from '@/components/ui/AvatarCircular'
import styles from './index.module.scss'
import UserUtils from '@/utils/UserUtils'
import {IDashBoardManager} from '@/data/interfaces/IDashboardResponse'
import PolygonSvg from '@/components/svg/PolygonSvg'
import {colors} from '@/styles/variables'
import classNames from 'classnames'
import {CardViewType} from '@/types/enums'
import {Routes} from '@/types/routes'
import Link from 'next/link'

interface Props {
  manager: IDashBoardManager
  view: CardViewType
}

export default function DashBoardManagerCard(props: Props) {
  const {manager} = props
  const options = [
    { label: 'Average response time', value: manager.average_response_time_in_week, up: manager.average_response_time_in_week >= manager.average_response_time_in_prev_week  },
    { label: 'Average move time', value: manager.average_move_time_in_week, up: manager.average_move_time_in_week >= manager.average_move_time_in_prev_week  },
  //  { label: 'Feedback received',  value:  0  },
  //  { label: 'Politeness index',  value:  0  },
    { label: 'Responses sent',  value:  0  },
  //  { label: 'Staff workload',  value:  0  },
    ]
  return (
    <Link href={Routes.lkDashboardTeamManager(manager.id)} className={classNames(styles.root, {[styles.card]: props.view === CardViewType.Card, [styles.row]: props.view === CardViewType.Row})}>
      <div className={styles.profile}>
        <AvatarCircular size={64} className={styles.avatar} file={manager.image}  />
        <div className={styles.profileRight}>
          <div className={styles.profilePosition}></div>
          <div className={styles.profileName}>{UserUtils.getName(manager)}</div>
        </div>
      </div>
      <div className={styles.stats}>
        {options.map((i, index) =>
          <div className={styles.statItem} key={index}>
            <div className={styles.statItemLabel}>
              {i.label}
            </div>
            <div className={styles.statItemRight}>
              <div >
                {i.value}
              </div>
              <PolygonSvg color={i.up ? colors.green : colors.red} className={classNames({ [styles.statItemIconReverted]: !i.up })} />
            </div>
          </div>
        )}
      </div>

    </Link>
  )
}
