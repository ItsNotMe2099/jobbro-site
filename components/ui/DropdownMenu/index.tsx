import { MouseEventHandler, ReactElement, useRef, useState } from 'react'
import { useDetectOutsideClick } from 'components/hooks/useDetectOutsideClick'
import styles from './index.module.scss'
import classNames from 'classnames'
import { IOption } from '@/types/types'
import { usePopper } from 'react-popper'
import { beforeWrite } from '@popperjs/core'
import DropdownSvg from '@/components/svg/DropdownSvg'
import Link from 'next/link'

const popperSameWidth = {
  name: 'sameWidth',
  enabled: true,
  phase: beforeWrite,
  requires: ['computeStyles'],
  fn: ({ state }: any) => {
    state.styles.popper.width = `${state.rects.reference.width}px`
  },
  effect: ({ state }: any) => {
    state.elements.popper.style.width = `${state.elements.reference.offsetWidth
      }px`
  }

}
const popperSameWidthWithOffset = {
  name: 'sameWidth',
  enabled: true,
  phase: beforeWrite,
  requires: ['computeStyles'],
  fn: ({ state }: any) => {
    state.styles.popper.width = `${state.rects.reference.width - 20}px`
  },
  effect: ({ state }: any) => {
    state.elements.popper.style.width = `${state.elements.reference.offsetWidth - 20
      }px`
  }
}
interface Props<T> {
  options: IOption<T>[]
  onTriggerClick?: () => void
  className?: string
  valueWrapperClassName?: string
  onSelect?: (value: T) => void
  value?: T
  fluid?: boolean
  popperFlip?: boolean
  popperStrategy?: 'fixed' | 'absolute' | null
  popperSameWidth?: boolean
  popperSameWidthWithOffset?: boolean
  renderOption?: (option: IOption<T>, isActive: boolean, onClick: () => void) => ReactElement
  renderValue?: (option?: IOption<T> | null, isActive?: boolean, search?: ReactElement | null) => ReactElement
}

export default function DropdownMenu<T>(props: Props<T>) {
  const dropdownRef = useRef(null)
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false)
  const [referenceElement, setReferenceElement] = useState(null)
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null)
  const currentOption = props.options.find(i => i.value === props.value)
  const { styles: popperStyles, attributes, forceUpdate, update } = usePopper(referenceElement, popperElement, {
    strategy: props.popperStrategy ?? 'absolute',
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
        enabled: props.popperFlip ?? false,
      },
      {
        name: 'offset',
        options: {
          offset: [0, 0],
        },
      },
      ...(props.popperSameWidth ?? true ? [popperSameWidth] : []),
      ...(props.popperSameWidthWithOffset ? [popperSameWidthWithOffset] : []),

    ]
  })

  const handleClick: MouseEventHandler = (e) => {
    e.preventDefault()
    setIsActive(!isActive)
  }

  const handleOptionClick = (item: IOption<T>) => {
    setIsActive(false)
    props.onSelect && props.onSelect(item.value!)
  }

  const handleRootRef = (ref: any) => {
    dropdownRef.current = ref
    setReferenceElement(ref)
  }
  const renderValue = (option?: IOption<T>, isActive?: boolean, search?: ReactElement) => {
    return props.renderValue ? props.renderValue(option, isActive, search) :
      <div className={styles.value}>{option?.label}</div>
  }
  const renderOption = (option: IOption<T>, isActive: boolean, onClick: () => void) => {
    return props.renderOption ? props.renderOption(option, isActive, onClick)
      : <div key={`${option.value}`} className={classNames(styles.option, { [styles.optionActive]: isActive })} onClick={onClick}>
        {option.label}
      </div>
  }
  return (
    <div ref={handleRootRef} className={classNames(styles.root, props.className, { [styles.fluid]: props.fluid })}>
      <div onClick={handleClick} className={classNames(styles.valueWrapper, props.valueWrapperClassName)}>
        <div className={styles.chevron}><DropdownSvg /></div>
      </div>
      <div ref={setPopperElement} className={classNames(styles.dropDown, { [styles.opened]: isActive })} style={popperStyles.popper}  {...attributes.popper}>
        {props.options.map((item, index) =>
          item.href ?
            <Link href={item.href} key={index} className={classNames(styles.option, { [styles.optionActive]: isActive })}>
              {item.label}
            </Link>
            :
            <div key={index} className={classNames(styles.option, { [styles.optionActive]: isActive })} onClick={() => handleOptionClick(item)}>
              {item.label}
            </div>
        )
        }
      </div>
    </div>
  )
}
