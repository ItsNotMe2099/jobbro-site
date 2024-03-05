import styles from './index.module.scss'

import classnames from 'classnames'
import { useRef } from 'react'

type Button<T> = {
  name: string, 
  type: T
}

interface Props<T> {
  buttons: [Button<T>, Button<T>]
  activeButton: T
  onSet: (type: T) => void
  className?: string
  buttonClassName?: string
}

export default function Modes<T extends string>(props: Props<T>) {
  
  const usrBtn = useRef<HTMLButtonElement>(null!)
  const cmpBtn = useRef<HTMLButtonElement>(null!)

  return (<div className={classnames(styles.modeWrapper, props.className)}>
    <div 
    className={classnames(styles.buttonBack, props.activeButton === props.buttons[1].type&&styles.buttonBack_active)} 
    style={{width: props.activeButton === props.buttons[1].type?cmpBtn.current?.clientWidth: usrBtn?.current?.clientWidth}}
    >
    </div>

    <button 
    type='button'
    ref={usrBtn} 
    className={classnames(styles.modeButton, props.activeButton === props.buttons[0].type&&styles.modeButton_active, props.buttonClassName)} 
    onClick={()=>props.onSet(props.buttons[0].type)}
    >
      {props.buttons[0].name}
    </button>

    <button 
    type='button'
    ref={cmpBtn} 
    className={classnames(styles.modeButton, props.activeButton === props.buttons[1].type&&styles.modeButton_active, props.buttonClassName)} 
    onClick={()=>props.onSet(props.buttons[1].type)}
    >
      {props.buttons[1].name}
    </button>
  </div>)
}