// @ts-nocheck
import styles from './index.module.scss'
import {IOption} from '@/types/types'
import {ReactElement} from 'react'
import CloseSvg from '@/components/svg/CloseSvg'
import {colors} from '@/styles/variables'




interface Props<T> {
  values: IOption<T>[]
  select: ReactElement
  onDelete: (value: IOption<T>) => void
}

export default function SelectMultiple<T>(props: Props<T>) {

  return (
   <div className={styles.root}>
     <div className={styles.options}>
       {props.values?.map(i => <div className={styles.option}>
         <div className={styles.label}>{i.label}</div><CloseSvg onClick={() => props.onDelete(i)} color={colors.textSecondary} variant={'small'}/></div>)}
     </div>
     {props.select}
   </div>
  )
}
