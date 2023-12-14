import Link from 'next/link'
import styles from './index.module.scss'
import CheckBoxSvg from '@/components/svg/CheckBoxSvg'

interface Props {
  title?: string
  text?: string
  link?: string
  linkName?: string
  icon?: JSX.Element
  progress?: number
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

  return (<div className={styles.root}> 
    <div className={styles.left}>
      {props.icon||<CheckBoxSvg className={styles.check}/>}
    </div>
    <div className={styles.body}>
      {props.title && <div className={styles.title}>{props.title}</div>}
      {props.text && <div className={styles.text}>{props.text}</div>}
      {props.link && <Link href={props.link} className={styles.link}>{props.linkName}</Link>}
    </div>
  </div>)
}