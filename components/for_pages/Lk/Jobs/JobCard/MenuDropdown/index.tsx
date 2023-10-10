import styles from './index.module.scss'
import { IOption } from '@/types/types'
import classNames from 'classnames'
import { LegacyRef } from 'react'

interface Props<T> {
  options: IOption<T>[]
  operations: IOption<T>[]
  className?: string
  ref: LegacyRef<HTMLDivElement>
}

export default function MenuDropdown<T>(props: Props<T>) {

  return (
    <div ref={props.ref} className={classNames(styles.root, props.className)}>
      <div className={styles.status}>
        Status
      </div>
      <div className={styles.separator} />
      {props.options.map((i, index) =>
        <div className={styles.option} key={index}>
          {i.label}
        </div>
      )}
      <div className={styles.operations}>
        Operations
      </div>
      <div className={styles.separator} />
      {props.operations.map((i, index) =>
        <div className={styles.option} key={index}>
          {i.label}
        </div>
      )}
    </div>
  )
}
