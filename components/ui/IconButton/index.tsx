import styles from './index.module.scss'
import classNames from 'classnames'
import {IButton, Nullable} from 'types/types'
import React, {ReactElement} from 'react'
import Spinner from '@/components/ui/Spinner'

interface Props extends IButton{
  children: React.ReactNode
  className?: string
  bgColor?: 'transparent' | 'white' | 'green' | 'grey' | 'lightGreen'
  size?: 'normal' | 'medium' | 'large' | 'small'
  badge?: Nullable<ReactElement>
}

function IconButtonInner(props: Props,  ref: React.ForwardedRef<HTMLAnchorElement> | React.ForwardedRef<HTMLButtonElement>) {
  if (props.onClick && props.href) {
    console.warn('IconButton: must have either onClick or href') // eslint-disable-line
  }

  if (props.href) {
    return (
      <a // eslint-disable-line
        ref={ref as React.ForwardedRef<HTMLAnchorElement>}
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
      ref={ref as React.ForwardedRef<HTMLButtonElement>}
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



const IconButton = React.forwardRef(IconButtonInner)

export default IconButton
