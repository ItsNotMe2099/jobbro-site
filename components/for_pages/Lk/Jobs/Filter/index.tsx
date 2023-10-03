import styles from './index.module.scss'
import CardViewSvg from '@/components/svg/CardViewSvg'
import { colors } from '@/styles/variables'
import RowViewSvg from '@/components/svg/RowViewSvg'
import { useAppContext } from '@/context/state'
import { SidePanelType } from '@/types/enums'


interface Props {
  view: 'card' | 'row'
  onSetView: () => void
}

export default function Filter(props: Props) {

  const appContext = useAppContext()

  return (
    <div className={styles.root}>
      <div className={styles.left}>
        <div onClick={() => appContext.showSidePanel(SidePanelType.JobsFilter)} className={styles.text}>
          Filter
        </div>
        <div className={styles.text}>
          Sort
        </div>
      </div>
      {props.view === 'card' ?
        <CardViewSvg className={styles.view} onClick={props.onSetView} color={colors.simpleGrey} />
        :
        <RowViewSvg className={styles.view} onClick={props.onSetView} color={colors.simpleGrey} />
      }
    </div>
  )
}
