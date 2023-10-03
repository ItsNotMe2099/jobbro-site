import styles from './index.module.scss'
import classNames from 'classnames'
import {IButton, Nullable} from 'types/types'
import {ReactElement, RefObject} from 'react'
import Spinner from '@/components/ui/Spinner'

interface Props extends IButton{
  children: React.ReactNode
  className?: string
  buttonRef?: RefObject<any>
  bgColor?: 'transparent' | 'white' | 'green'
  size?: 'normal' | 'medium' | 'large'
  badge?: Nullable<ReactElement>
}

export default function IconButton(props: Props) {
  if (props.onClick && props.href) {
    console.warn('IconButton: must have either onClick or href') // eslint-disable-line
  }

  if (props.href) {
    return (
      <a // eslint-disable-line
        ref={props.buttonRef}
        href={typeof props.href == 'object' ? props.href.href! : props.href}
        target={props.isExternalHref ? '_blank' : ''}
        rel={props.isExternalHref ? 'noreferrer' : ''}
        className={classNames([styles.root, props.className],  props.bgColor && styles[props.bgColor], styles[props.size ?? 'normal'])}
        onClick={(e) => props.disabled ? props.onClick?.(e) : null}
      >
        {props.children}
        {props.badge}
      </a>
    )
  }

  return (
    <button
      ref={props.buttonRef}
      className={classNames([styles.root, props.className], props.bgColor && styles[props.bgColor], styles[props.size ?? 'normal'])}
      type={props.type ?? 'button'}
      form={props.form}
      disabled={props.disabled}
      onClick={(e) => props.onClick?.(e)}
    >
      <span className={classNames({
        [styles.text]: true,
        [styles.textHidden]: props.spinner,
      })}>{props.children}</span>
      <div className={classNames({
        [styles.spinner]: true,
        [styles.spinnerVisible]: props.spinner,
      })}>
         <Spinner size={22} color="#fff" secondaryColor="rgba(255,255,255,0.4)" />
      </div>
      {props.badge}
    </button>
  )
}

