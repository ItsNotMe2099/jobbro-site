import styles from './index.module.scss'
import {IOption} from '@/types/types'
import classNames from 'classnames'
import {ReactElement, useRef, useState} from 'react'
import {useDetectOutsideClick} from '@/components/hooks/useDetectOutsideClick'
import {usePopper} from 'react-popper'
import {MenuDropdown} from '@/components/ui/MenuDropdown'
import FilterButton from '@/components/for_pages/Common/FilterToolbar/FilterButton'
import {colors} from '@/styles/variables'
import Spinner from '@/components/ui/Spinner'


interface Props<T> {
  options: IOption<T>[]
  onChange: (value: T | undefined | null) => void
  children: ReactElement | string | null | undefined
  isLoading?: boolean
}

export default function DropdownActionFilterButton<T>(props: Props<T>) {
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
    setIsActive(!isActive)
  }
  const handleClickItem = (value: T | undefined | null) => {
    props.onChange?.(value)
    setIsActive(false)
  }

  const handleRootRef = (ref: any) => {
    dropdownRef.current = ref
    setReferenceElement(ref)
  }



  return (
    <div className={styles.root}>
      {props.isLoading ? <Spinner size={24} color={colors.white} secondaryColor={colors.green}/> : <FilterButton  onClick={handleClick} ref={handleRootRef}>{props.children}</FilterButton>}
      <MenuDropdown ref={setPopperElement}
                    styleType={'separator'}
                    isOpen={isActive as boolean}
                    onClick={handleClickItem}
                    options={props.options}
                    className={classNames(styles.dropDown)}
                    style={popperStyles.popper}
                    {...attributes.popper} />
    </div>
  )
}
