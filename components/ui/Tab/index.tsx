import styles from './index.module.scss'
import classNames from 'classnames'
import {Nullable} from '@/types/types'
import NotificationBadge from '@/components/ui/NotificationBadge'
import Link from 'next/link'
import useIsActiveLink from '@/components/hooks/useIsActiveLink'
export type TabStyleType = 'default'

interface Props {
  text: string
  styleType?: TabStyleType
  active?: boolean
  onClick?: () => void
  className?: string
  badge?: Nullable<number>
  href?: string
}

export default function Tab(props: Props) {
  const isActive = useIsActiveLink(props.href ?? '')
  const content = (<>
    <div className={styles.text}>{props.text}</div>
    {(props.badge ?? 0) > 0 && <NotificationBadge className={styles.badge} position={'static'} color={'green'} total={props.badge!}/>}
  </>)
  const className = classNames(styles.root, props.className, {[styles.active]: (props.href && isActive) || (!props.href && props.active), [styles[props.styleType ?? 'default']]: true})
  if(props.href){
    return (
      <Link href={props.href} className={className}>
        {content}
      </Link>
    )
  }else{
    return (
      <div onClick={props.onClick} className={className}>
        {content}
      </div>
    )
  }

}
