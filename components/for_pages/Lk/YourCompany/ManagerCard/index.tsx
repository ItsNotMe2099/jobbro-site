import styles from './index.module.scss'
import { colors } from '@/styles/variables'
import {IManager} from '@/data/interfaces/IManager'
import {ManagerOwnerWrapper, useManagerOwnerContext} from '@/context/manager_owner_state'
import AvatarCircular from '@/components/ui/AvatarCircular'
import CloseSvg from '@/components/svg/CloseSvg'

interface Props {
  manager: IManager
}
const ManagerCardInner = (props: Props) => {
  const managerContext = useManagerOwnerContext()
  return <div className={styles.root}>
    <AvatarCircular file={managerContext.manager!.image}/>
    <div className={styles.center}>
      <div className={styles.name}>{managerContext.manager!.email}</div>
    </div>
    <div className={styles.delete} onClick={managerContext.delete}>
      <CloseSvg color={colors.textSecondary}/>
    </div>
  </div>
}

export default function ManagerCard(props: Props) {
return <ManagerOwnerWrapper managerId={props.manager.id!} manager={props.manager}>
  <ManagerCardInner manager={props.manager}/>
</ManagerOwnerWrapper>
}
