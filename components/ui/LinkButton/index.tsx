import styles from './index.module.scss'
import { IButton } from 'types/types'
import Link from 'next/link'
import classNames from 'classnames'
import { RefObject } from 'react'

interface Props extends IButton {
  children: React.ReactNode
  buttonRef?: RefObject<any>
  className?: string
  styleType?: 'small' | 'normal'
}

export default function LinkButton(props: Props) {
  const cn = classNames({
    [styles.root]: true,
    [styles.disabled]: props.disabled,
    [styles.small]: props.styleType === 'small'
  }, props.className)

  if (props.href) {
    return (
      <Link href={props.href}>
        <a
          ref={props.buttonRef}
          className={classNames(cn)}
          target={props.isExternalHref ? '_blank' : ''}
          rel={props.isExternalHref ? 'noreferrer' : ''}
        >
          {props.children}
        </a>
      </Link>
    )
  }

  return (
    <button
      ref={props.buttonRef}
      type={props.type ?? 'button'}
      form={props.form}
      onClick={(e) => {
        if (props.onClick && !props.spinner && !props.disabled) {
          props.onClick(e)
        }
      }}
      disabled={props.disabled}
      className={classNames(cn)}
    >
      {props.children}
    </button>
  )
}

