import styles from './index.module.scss'
import {MouseEventHandler} from 'react'
import {colors} from 'styles/variables'
import MenuSvg from '@/components/svg/MenuSvg'
import {IOption, IOptionGroup} from '@/types/types'
import {MenuDropdown} from '@/components/ui/MenuDropdown'
import { useDropDown } from '@/components/hooks/useDropDown'
import classNames from 'classnames'
import { Placement} from '@popperjs/core'




interface Props<T> {
  options?: IOption<T>[]
  groups?: IOptionGroup<T>[]
  onClick: (value: T) => void
  className?: string
  activeClassName?: string
  placement?: Placement|undefined
  isLast?: boolean
}

export default function MenuButton<T>(props: Props<T>) {
  const options = {
    placement: props.placement
  }
  if(props.isLast) {
    options.placement = 'top-end'
  }
  const {setRootRef, isActive, setIsActive, popperStyles, setPopperElement, attributes} = useDropDown(options)

  const handleClick: MouseEventHandler = (e) => {
    e.preventDefault()
    // e.stopPropagation()
    setIsActive(!isActive)
  }
  const handleClickItem = (value: T) => {
    props.onClick?.(value)
    setIsActive(false)
  }

  return (
    <div className={classNames(styles.root, props.className, isActive&&props.activeClassName)} ref={setRootRef}>
      <MenuSvg onClick={handleClick}  className={styles.menu} color={colors.textPrimary}/>
      <MenuDropdown<T> 
      ref={setPopperElement}  
      isOpen={isActive as boolean} 
      onClick={handleClickItem} 
      className={styles.drop} 
      options={props.options} 
      groups={props.groups} 
      style={popperStyles.popper}  
      {...attributes.popper} />
    </div>
  )
}

