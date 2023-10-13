import React from 'react'
import { IOption} from '@/types/types'
import styles from './index.module.scss'
import Tab, {TabStyleType} from '@/components/ui/Tab'
import classNames from 'classnames'


interface Props<T> {
  options: IOption<T>[]
  styleType?: TabStyleType
  fluid?: boolean
  tabClassName?: string
  onClick?: (value: T) => void
  value?: T | T[]
  isMulti?: boolean
}

function Tabs<T>(props: Props<T>){
  return (
    <div className={classNames(styles.root, {[styles.fluid]: props.fluid, [styles[props.styleType ?? 'default']]: true})}>
      {props.options.map( i => <Tab
        styleType={props.styleType ?? 'default'}
        className={styles.tab}
        active={props.isMulti ? (props.value as T[])?.includes(i.value!) : i.value === props.value}
        text={`${i.label}`}
        key={`${i.value}`}
        badge={i.badge}
        href={i.href}
        onClick={() => props.onClick?.(i.value!)}/>
      )}
      </div>
  )
}

export default Tabs
