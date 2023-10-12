import styles from './index.module.scss'
import CardViewSvg from '@/components/svg/CardViewSvg'
import { colors } from '@/styles/variables'
import RowViewSvg from '@/components/svg/RowViewSvg'
import { useAppContext } from '@/context/state'
import { SidePanelType } from '@/types/enums'
import { ReactElement } from 'react'
import CircleSvg from '@/components/svg/CircleSvg'
import { useJobFilterContext } from '@/context/job_filter_state'


interface Props {
  view: 'card' | 'row'
  onSetView: () => void
  showChild?: () => void
  children?: ReactElement | ReactElement[]
  sort?: boolean
}

export default function Filter(props: Props) {

  const appContext = useAppContext()

  const handleClickOnFilter = () => {
    appContext.showSidePanel(SidePanelType.JobsFilter, 'Filters')
    appContext.showOverlay()
  }

  const jobFilterContext = useJobFilterContext()

  const filtersCount = [
    jobFilterContext.published,
    jobFilterContext.draft,
    jobFilterContext.paused,
    jobFilterContext.market,
    jobFilterContext.mobileApp,
    jobFilterContext.showClosed,
    jobFilterContext.date,
    jobFilterContext.projectName
  ]

  const filtered = filtersCount.filter(i => i)

  console.log(filtered)

  return (
    <div className={styles.root}>
      <div className={styles.left}>
        <div onClick={handleClickOnFilter} className={styles.text}>
          <span>Filter</span>{filtered.length > 0 && <div className={styles.count}>{filtered.length}</div>}
        </div>
        <div className={styles.sort} onClick={props.showChild}>
          <span>Sort</span>{props.sort && <CircleSvg className={styles.circle} color={colors.green} />}
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
