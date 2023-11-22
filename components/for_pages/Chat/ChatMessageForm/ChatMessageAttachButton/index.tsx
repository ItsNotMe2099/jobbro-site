import React, {ReactElement, useRef, useState} from 'react'
import {useDetectOutsideClick} from '@/components/hooks/useDetectOutsideClick'
import {usePopper} from 'react-popper'
import IconButton from '@/components/ui/IconButton'
import {MenuDropdown} from '@/components/ui/MenuDropdown'
import styles from './index.module.scss'
import AttachSvg from '@/components/svg/AttachSvg'
import {colors} from '@/styles/variables'
import FileSvg from '@/components/svg/FileSvg'
import CalendarSvg from '@/components/svg/CalendarSvg'
import {useAppContext} from '@/context/state'
interface MenuItemProps{
  title: string
  description: string
  icon: ReactElement
  onClick: () => void
}
const MenuItem = (props: MenuItemProps) => {
  return ( <div className={styles.menuItem} onClick={props.onClick}>
    <div className={styles.icon}>{props.icon}</div>
    <div className={styles.info}>
      <div className={styles.title}>{props.title}</div>
      <div className={styles.description}>{props.description}</div>
    </div>
  </div>)
}
interface Props<T> {
  onFileClick: () => void,
  onEventClick: () => void
  disabled: boolean
}

export default function ChatMessageAttachButton<T>(props: Props<T>) {
  const appContext = useAppContext()
  const dropdownRef = useRef(null)
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false)
  const [referenceElement, setReferenceElement] = useState(null)
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null)
  const {styles: popperStyles, attributes, forceUpdate, update} = usePopper(referenceElement, popperElement, {
    strategy: 'absolute',
    placement: 'top-start',
    modifiers: [
      {
        name: 'computeStyles',
        options: {
          adaptive: false,
        },
      },
      {
        name: 'flip',
        enabled: false,
      },
      {
        name: 'offset',
        options: {
          offset: [-8, 12],
        },
      },

    ]
  })

  const handleClick = () => {
    setIsActive(!isActive)
  }
  const handleClickItem = (value: T) => {

  }
  const handleRootRef = (ref: any) => {
    dropdownRef.current = ref
    setReferenceElement(ref)
  }
  const handleFileClick = () => {
    setIsActive(false)
    props.onFileClick()
  }
  const handleCalendarClick = () => {
    setIsActive(false)
    props.onEventClick()
  }
  return (
    <IconButton disabled={props.disabled} bgColor='grey' onClick={handleClick} ref={handleRootRef}>
      <AttachSvg color={colors.textSecondary}/>
      <MenuDropdown ref={setPopperElement}
                       isOpen={isActive as boolean}
                       onClick={handleClickItem}
                       style={popperStyles.popper}
                       {...attributes.popper} >
        <div className={styles.list}>
          <MenuItem icon={<FileSvg color={colors.green}/>} title={'File'} description={'Select file on your computer'} onClick={handleFileClick}/>
          <MenuItem icon={<CalendarSvg color={colors.green}/>} title={'Calendar'} description={'Select available time'} onClick={handleCalendarClick}/>
        </div>
      </MenuDropdown>
    </IconButton>
  )
}

