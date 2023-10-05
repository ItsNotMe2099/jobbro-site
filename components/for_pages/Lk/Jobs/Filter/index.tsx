import styles from './index.module.scss'
import CardViewSvg from '@/components/svg/CardViewSvg'
import { colors } from '@/styles/variables'
import RowViewSvg from '@/components/svg/RowViewSvg'
import { useAppContext } from '@/context/state'
import { SidePanelType } from '@/types/enums'
import { ReactElement } from 'react'


interface Props {
  view: 'card' | 'row'
  onSetView: () => void
  showChild?: () => void
  children?: ReactElement | ReactElement[]
}

export default function Filter(props: Props) {

  const appContext = useAppContext()

  return (
    <div className={styles.root}>
      <div className={styles.left}>
        <div onClick={() => appContext.showSidePanel(SidePanelType.JobsFilter, 'Filters')} className={styles.text}>
          Filter
        </div>
        <div className={styles.sort} onClick={props.showChild}>
          Sort
          {props.children}
        </div>
      </div>
      {props.view === 'row' ?
        <CardViewSvg className={styles.view} onClick={props.onSetView} color={colors.simpleGrey} />
        :
        <RowViewSvg className={styles.view} onClick={props.onSetView} color={colors.simpleGrey} />
      }
    </div>
  )
}
