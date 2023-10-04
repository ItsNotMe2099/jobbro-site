import Radio from '@/components/ui/Radio'
import styles from './index.module.scss'
import { IOption } from '@/types/types'
import classNames from 'classnames'

interface Props<T> {
  val: T | undefined
  setVal: (val: T | undefined) => void
  options: IOption<T>[]
  className?: string
}

export default function SortDropdown<T>(props: Props<T>) {

  return (
    <div className={classNames(styles.root, props.className)}>
      <Radio options={props.options} styleType='default' value={props.val} setVal={(val) =>  props.setVal(val)} />
      
    </div>
  )
}
