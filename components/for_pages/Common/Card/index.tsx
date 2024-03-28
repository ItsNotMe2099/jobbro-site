import styles from './index.module.scss'
import { ReactElement } from 'react'
import classNames from 'classnames'
import { useRouter } from 'next/navigation'

interface Props {
  title?: string | ReactElement
  children: ReactElement | ReactElement[] | boolean
  actions?: ReactElement | undefined | false
  className?: string | undefined
  link?: string
  ref?: (element: HTMLElement | null) => void
}

export default function Card(props: Props) {
  const router = useRouter()

  return (
    <div ref={props.ref} onClick={()=> {props.link&&router.push(props.link)}} className={classNames(styles.root, props.className)}>
      {(props.title || props.actions) && <div className={styles.header}>
      {props.title && <div className={styles.title}>
        {props.title}
      </div>}
        <div className={styles.actions}>
          {props.actions}
        </div>

      </div>}
      {props.children}
    </div>
  )
}
