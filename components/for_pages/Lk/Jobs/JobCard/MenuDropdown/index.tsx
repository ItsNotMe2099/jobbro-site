import styles from './index.module.scss'
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
}

function MenuDropdownInner<T>(props: Props<T>,  ref: React.ForwardedRef<HTMLDivElement>) {

  const handleClick = (option: IOption<T>) => {
    props.onClick?.(option.value!)

  }
  return (
    <div ref={ref} className={classNames(styles.root, props.className, {[styles.opened]: props.isOpen})} style={props.style} {...props.attributes}>
      {(props.groups?.length ??0) > 0 && props.groups?.map((group) => <div className={styles.group}>
        <div className={styles.groupName}>{group.title}</div>
        <div className={styles.options}>
          {group.options.map((option) => <div className={styles.option} key={`${option.label}`} onClick={() => handleClick(option)}>{option.label}</div>)}
        </div>
      </div>)}

      {!props.groups?.length && <div className={styles.options}>
          {props.options?.map((option) => <div className={styles.option} key={`${option.label}`} onClick={() => handleClick(option)}>{option.label}</div>)}
        </div>}
    </div>
  )
}

export const MenuDropdown = React.forwardRef(MenuDropdownInner)
