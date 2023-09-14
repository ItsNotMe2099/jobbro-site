import { useState } from 'react'
import styles from './index.module.scss'
import classNames from 'classnames'

interface Props {
  label: string
  onClickNew: () => void
  onClickOld: () => void
}

export default function Switch(props: Props) {

  const [active, setActive] = useState<'new' | 'old'>('old')

  const handleClick = (active: 'new' | 'old') => {
    setActive(active)
    active === 'new' ? props.onClickNew() : props.onClickOld()
  }

  return (
    <div className={styles.root}>
      <div onClick={() => handleClick('new')} className={classNames(styles.btn, { [styles.active]: active === 'new' })}>
        {props.label}
      </div>
      <div onClick={() => handleClick('old')}  className={classNames(styles.btn, { [styles.active]: active === 'old' })}>
        Из имеющихся
      </div>
    </div>
  )
}
