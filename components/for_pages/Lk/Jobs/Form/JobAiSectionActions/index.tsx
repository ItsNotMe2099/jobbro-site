import styles from './index.module.scss'
import SparksSvg from '@/components/svg/SparksSvg'
import {colors} from '@/styles/variables'
import {ReactElement} from 'react'
import classNames from 'classnames'
import LockSvg from '@/components/svg/LockSvg'
import UnlockSvg from '@/components/svg/UnlockSvg'
import RefreshSvg from '@/components/svg/RefreshSvg'

interface ActionButtonProps{
  active?: boolean,
  title: string
  icon: ReactElement
  onClick: () => void
}
const ActionButton = (props: ActionButtonProps) => {
  return <div className={classNames(styles.btn, {[styles.active]: props.active})} onClick={props.onClick}>
    {props.icon}
    <span>{props.title}</span>
  </div>
}
interface Props {
  isLocked: boolean
  onClickLock: () => void
  onClickRefresh: () => void
}

export default function JobAiSectionActions(props: Props) {
  return (<div className={styles.root}>
      <SparksSvg color={colors.white} className={styles.icon} />
      <ActionButton title={props.isLocked ? 'Unlock' : 'Lock'} active={props.isLocked} icon={props.isLocked ? <UnlockSvg color={colors.white}/> :<LockSvg color={colors.white}/>} onClick={props.onClickLock}/>
      <ActionButton title={'Regenerate'} icon={<RefreshSvg color={colors.white}/>} onClick={props.onClickRefresh}/>
    </div>
  )
}
