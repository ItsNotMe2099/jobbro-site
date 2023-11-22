import styles from './index.module.scss'
import CircleSvg from '@/components/svg/CircleSvg'
import {colors} from '@/styles/variables'
import React, {ReactElement} from 'react'

interface Props {
  hasValue?: boolean
  children: ReactElement | string | null
  onClick: () => void
}

function FilterButtonInner(props: Props,  ref: React.ForwardedRef<HTMLDivElement>) {
  return (
    <div className={styles.root} onClick={props.onClick} ref={ref}>
      <span>Sort</span>{props.hasValue && <CircleSvg className={styles.circle} color={colors.green}/>}
    </div>
  )
}
const FilterButton = React.forwardRef(FilterButtonInner)

export default FilterButton