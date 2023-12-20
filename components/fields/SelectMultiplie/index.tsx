// @ts-nocheck
import styles from './index.module.scss'
import {IOption} from '@/types/types'
import {ReactElement} from 'react'
import CloseSvg from '@/components/svg/CloseSvg'
import {colors} from '@/styles/variables'
import ChipList from '@/components/ui/ChipList'
import Chip from '@/components/ui/Chip'




interface Props<T> {
  values: T[]
  select: ReactElement
  onDelete: (value: T) => void
  formatLabel?: (value:  IOption<T> | T) => string
}

export default function SelectMultiple<T>(props: Props<T>) {

  return (
   <div className={styles.root}>
     {props.values.length > 0 && <ChipList className={styles.chips}>
       {props.values.map((i) =>
         <Chip className={styles.chip}>{props.formatLabel ? props.formatLabel(i) :(typeof i === 'string' ? i : '')}
           <CloseSvg className={styles.delete} onClick={() => props.onDelete(i)} color={colors.textSecondary} variant={'small'}/>
         </Chip>
       )}
     </ChipList>}
     {props.select}
   </div>
  )
}
