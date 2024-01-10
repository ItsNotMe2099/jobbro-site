import styles from './index.module.scss'
import {colors} from '@/styles/variables'
import React, {ReactElement} from 'react'

interface Props {
  hasValue?: boolean
  counter?: number
  children: ReactElement | string | null | undefined
  onClick: () => void
  disabled?: boolean | undefined
}

function FilterButtonInner(props: Props,  ref: React.ForwardedRef<HTMLDivElement>) {
  return (
    <div className={styles.root} onClick={props.disabled ? () =>{} : props.onClick} ref={ref}>
      <span>{props.children}</span>{(props.hasValue || (props.counter !== undefined &&props.counter > 0 ))&& <div className={styles.circle} color={colors.green}>{props.counter}</div>}
    </div>
  )
}
const FilterButton = React.forwardRef(FilterButtonInner)

export default FilterButton
