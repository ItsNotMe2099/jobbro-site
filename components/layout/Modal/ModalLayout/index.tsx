import styles from './index.module.scss'
import classNames from 'classnames'
import {ReactElement} from 'react'
import {useAppContext} from 'context/state'


interface Props {
  fixed?: boolean
  children?: ReactElement | ReactElement[]
  className?: string
  size?: 'small' | 'normal' | 'large'
  mobileFullScreen?:boolean
}

export default function ModalLayout(props: Props) {
  const context = useAppContext()

  return (
    <div className={classNames(styles.root, {
      [styles.fixed]: props.fixed || context.isMobile,
      [styles[props.size ?? 'normal']]: true
    }, 
    props.className,
    props.mobileFullScreen&&styles.fullScreen
    )}>
      {props.children}
    </div>
  )
}
