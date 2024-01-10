import styles from '@/components/ui/MenuDropdown/index.module.scss'
import {IOption, IOptionGroup} from '@/types/types'

import classNames from 'classnames'
import React, {CSSProperties} from 'react'
declare module 'react' {
  function forwardRef<T, P = {}>(
    render: (props: P, ref: React.Ref<T>) => React.ReactNode | null
  ): (props: P & React.RefAttributes<T>) => React.ReactNode | null;
}

interface Props<T> {
  options?: IOption<T>[] | undefined
  groups?: IOptionGroup<T>[] | undefined
  className?: string
  style?: CSSProperties | undefined;
  attributes?: { [key: string]: { [key: string]: string } | undefined };
  isOpen?: boolean
  onClick?: (value: T) => void
  children?: JSX.Element|JSX.Element[]
  styleType?: 'normal' | 'separator'
}

function MenuDropdownInner<T>(props: Props<T>,  ref: React.ForwardedRef<HTMLDivElement>) {

  const handleClick = (e: React.MouseEvent<HTMLDivElement>, option: IOption<T>) => {
    e.preventDefault()
    e.stopPropagation()
    props.onClick?.(option.value!)
  }
  return (
    <div ref={ref} 
         className={classNames(styles.root, props.className, {[styles.opened]: props.isOpen}, props.styleType ? styles[props.styleType] : null)}
         style={props.style}
         {...props.attributes}>
      {(props.groups?.length ?? 0) > 0 && props.groups?.map((group, index) => <div className={styles.group}>
        {props.styleType === 'separator' && index > 0 && <div className={styles.separator}/>}
        {group.title && <div className={styles.groupName}>{group.title}</div>}

        <div className={styles.options}>
          {group.options.map((option) => <div className={styles.option} key={`${option.label}`}  style={{...(option.color ? {color: option.color} : {})}}  onClick={(e) => handleClick(e, option)}>{option.label}</div>)}
        </div>
      </div>)}
      {!props.groups?.length && (props.options?.length ?? 0) > 0 && <div className={styles.options}>
          {props.options?.map((option) => <div className={styles.option} style={{...(option.color ? {color: option.color} : {})}} key={`${option.label}`} onClick={(e) => handleClick(e, option)}>{option.label}</div>)}
        </div>}
      {props.children ? props.children : null}
    </div>
  )
}

export const MenuDropdown = React.forwardRef(MenuDropdownInner)
