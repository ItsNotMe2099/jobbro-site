import {ReactElement, useRef, useState} from 'react'
import {IOption, IOptionGroup} from '@/types/types'
import {useDetectOutsideClick} from '@/components/hooks/useDetectOutsideClick'
import {usePopper} from 'react-popper'
import IconButton from '@/components/ui/IconButton'
import {MenuDropdown} from '@/components/ui/MenuDropdown'
import styles from './index.module.scss'
import NotificationBadge from '@/components/ui/NotificationBadge'
import classNames from 'classnames'


interface Props<T> {
  options?: IOption<T>[]
  groups?: IOptionGroup<T>[]
  icon: ReactElement
  menuRender?: (isOpen: boolean) => ReactElement
  badge?: number
  onClickItem?: (value: T) => void
  dropdownClassName?: string
}

export default function HeaderButton<T>(props: Props<T>) {
  const dropdownRef = useRef(null)
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false)
  const [referenceElement, setReferenceElement] = useState(null)
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null)
  const {styles: popperStyles, attributes, forceUpdate, update} = usePopper(referenceElement, popperElement, {
    strategy: 'absolute',
    placement: 'bottom-end',
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
          offset: [0, 4],
        },
      },

    ]
  })

  const handleClick = () => {
    setIsActive(isActive)
  }
  const handleClickItem = (value: T) => {
    props.onClickItem?.(value)
    setIsActive(false)

  }
  const handleRootRef = (ref: any) => {
    dropdownRef.current = ref
    setReferenceElement(ref)
  }
  return (
    <IconButton bgColor='green' onClick={handleClick} ref={handleRootRef} badge={<NotificationBadge className={styles.badge} color={'red'} total={props.badge ?? 0}/>}>
      {props.icon}
      <MenuDropdown ref={setPopperElement}
                       styleType={'separator'}
                       isOpen={isActive as boolean}
                       onClick={handleClickItem}
                       className={classNames(styles.drop, props.dropdownClassName)}
                       options={props.options}
                       groups={props.groups}
                       style={popperStyles.popper}
                       {...attributes.popper} >
        {props.menuRender?.(isActive as boolean)}
      </MenuDropdown>
    </IconButton>
  )
}

