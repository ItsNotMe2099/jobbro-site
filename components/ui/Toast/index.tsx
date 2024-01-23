import Link from 'next/link'
import styles from './index.module.scss'
import CheckBoxGreenSvg from '@/components/svg/CheckBoxGreenSvg'
import {MouseEventHandler} from 'react'

interface Props {
  title?: string
  text?: string
  link?: string
  linkName?: string
  icon?: JSX.Element
  progress?: number
  linkOnClick: MouseEventHandler | undefined
}


/**
 * @title ?: string
 * @text ?: string
 * @link ?: string
 * @icon ?: JSX.Element
 * @progress ?: number
 * @linkName ?: string
 */
export default function Toast(props: Props) {
  console.log('ToastProps', props)
  return (<div className={styles.root}>
    <div className={styles.left}>
      {props.icon||<CheckBoxGreenSvg className={styles.check}/>}
    </div>
    <div className={styles.body}>
      {props.title && <div className={styles.title}>{props.title}</div>}
      {props.text && <div className={styles.text}>{props.text}</div>}
      {props.link && <Link href={props.link} onClick={props.linkOnClick} className={styles.link}>{props.linkName}</Link>}
    </div>
  </div>)
}
