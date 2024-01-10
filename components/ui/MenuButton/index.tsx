import styles from './index.module.scss'
import {MouseEventHandler, useRef, useState} from 'react'
import {colors} from 'styles/variables'
import MenuSvg from '@/components/svg/MenuSvg'
import {IOption, IOptionGroup} from '@/types/types'
import {useDetectOutsideClick} from '@/components/hooks/useDetectOutsideClick'
import {usePopper} from 'react-popper'
import {MenuDropdown} from '@/components/ui/MenuDropdown'


interface Props<T> {
  options?: IOption<T>[]
  groups?: IOptionGroup<T>[]
  onClick: (value: T) => void
}

export default function MenuButton<T>(props: Props<T>) {
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
        enabled:  false,
      },
      {
        name: 'offset',
        options: {
          offset: [0, 0],
        },
      },
    ]
  })

  const handleClick: MouseEventHandler = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsActive(!isActive)
  }
  const handleClickItem = (value: T) => {
    props.onClick?.(value)
    setIsActive(false)

  }
  const handleRootRef = (ref: any) => {
    dropdownRef.current = ref
    setReferenceElement(ref)
  }
  return (
    <div className={styles.root} ref={handleRootRef}>
      <MenuSvg onClick={handleClick}  className={styles.menu} color={colors.textPrimary}/>
      <MenuDropdown<T> ref={setPopperElement}  isOpen={isActive as boolean} onClick={handleClickItem} className={styles.drop} options={props.options} groups={props.groups} style={popperStyles.popper}  {...attributes.popper} />
    </div>
  )
}

