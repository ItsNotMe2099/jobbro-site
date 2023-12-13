import styles from './index.module.scss'
import classNames from 'classnames'
import {useAppContext} from 'context/state'
import {MouseEventHandler} from 'react'

interface Props{

}

export default function AppOverlay(props: Props) {
 const appContext = useAppContext()
  const handleClick: MouseEventHandler = (e) => {
    console.log('HideOverlay')
    //appContext.hideOverlay()
  }
  return (
    <div className={classNames(styles.root, {[styles.show]: appContext.isOverlayShown})} onClick={handleClick}/>
  )
}
