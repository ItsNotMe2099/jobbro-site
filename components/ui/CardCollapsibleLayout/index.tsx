import styles from './index.module.scss'

import Collapsible from 'react-collapsible'
import * as React from 'react'
import {ReactElement, useState} from 'react'
import ChevronDownSvg from '@/components/svg/ChevronDownSvg'
import classNames from 'classnames'
import {colors} from '@/styles/variables'


interface CardHeaderProps{
  title: string
  isOpened: boolean
  onClick: () => void
}
const CardHeader = (props: CardHeaderProps) => {
return <div className={classNames(styles.header, {[styles.opened]: props.isOpened})} onClick={props.onClick}>
  <div className={styles.left}>
    <div className={styles.title}>{props.title}</div>
    <ChevronDownSvg color={colors.textSecondary} className={classNames(styles.chevron, {[styles.reversed]: props.isOpened})} />
  </div>
</div>
}
interface Props{
  title: string
  children: ReactElement | ReactElement[]
  initialOpen?: boolean
}
export default function CardCollapsibleLayout(props: Props) {
  const [open, setOpen] = useState<boolean>(props.initialOpen ?? false)
  const handleClick = () => [
    setOpen(!open)
  ]
  const trigger = (<CardHeader title={props.title}  isOpened={open} onClick={handleClick}/>)
  return <div className={styles.root}><Collapsible
    open={open}
    trigger={trigger}
    triggerWhenOpen={trigger}
  >
    <div className={styles.content}>
    {props.children}
    </div>
  </Collapsible>
  </div>
}
