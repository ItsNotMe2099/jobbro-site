import classNames from 'classnames'
import styles from './index.module.scss'

interface Props {
 className?: string
 total?: number
 empty?: boolean
 color: 'green' | 'white' | 'red'
  position?: 'static' | 'absolute',
  size?: 'small' | 'large'
  style?: 'normal' | 'border'
}

export default function NotificationBadge(props: Props) {
  if(!props.empty && (!props.total || props.total === 0)){
    return null
  }
  return (<div className={classNames({
    [styles.root]: true,
    [styles.empty]: props.empty,
    [styles[props.color]]: true,
    [styles[props.position ?? 'absolute']]: true,
    [styles[props.size ?? 'small']]: true,
    [styles[props.style ?? 'normal']]: true,
  },props.className)}>{(!props.style || props.style === 'normal') && props.total ? `${props.total}` : ''}</div>)
}

