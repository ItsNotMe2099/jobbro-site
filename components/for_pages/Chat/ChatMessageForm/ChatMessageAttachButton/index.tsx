import React, {ReactElement} from 'react'
import IconButton from '@/components/ui/IconButton'
import {MenuDropdown} from '@/components/ui/MenuDropdown'
import styles from './index.module.scss'
import AttachSvg from '@/components/svg/AttachSvg'
import {colors} from '@/styles/variables'
import FileSvg from '@/components/svg/FileSvg'
import CalendarSvg from '@/components/svg/CalendarSvg'
import {useDropDown} from '@/components/hooks/useDropDown'
import {useAppContext} from '@/context/state'
import {ProfileType} from '@/data/enum/ProfileType'

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
  const {isTabletWidth} = appContext.size
  const {setRootRef, isActive, setIsActive, popperStyles, setPopperElement, attributes} = useDropDown({offset: [-8, 12], placement: 'top-start'})

  const handleClick = () => {
    setIsActive(!isActive)
  }
  const handleClickItem = (value: T) => {

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
    <IconButton disabled={props.disabled} bgColor={isTabletWidth?'transparent':'grey'} onClick={handleClick} ref={setRootRef}>
      <AttachSvg color={colors.textSecondary}/>
      <MenuDropdown ref={setPopperElement}
                       isOpen={isActive as boolean}
                       onClick={handleClickItem}
                       style={popperStyles.popper}
                       {...attributes.popper} >
        <div className={styles.list}>
          <MenuItem icon={<FileSvg color={colors.green}/>} title={'File'} description={'Select file on your computer'} onClick={handleFileClick}/>
          {appContext.aboutMe?.profileType === ProfileType.Hirer && <MenuItem icon={<CalendarSvg color={colors.green}/>} title={'Calendar'} description={'Select available time'} onClick={handleCalendarClick}/>}
        </div>
      </MenuDropdown>
    </IconButton>
  )
}

