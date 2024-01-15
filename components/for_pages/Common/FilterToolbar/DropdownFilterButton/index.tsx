import styles from './index.module.scss'
import {IOption} from '@/types/types'
import classNames from 'classnames'
import {ReactElement} from 'react'
import {MenuDropdown} from '@/components/ui/MenuDropdown'
import FilterButton from '@/components/for_pages/Common/FilterToolbar/FilterButton'
import {colors} from '@/styles/variables'
import Spinner from '@/components/ui/Spinner'
import { useDropDown } from '@/components/hooks/useDropDown'


interface Props<T> {
  options: IOption<T>[]
  onChange: (value: T | undefined | null) => void
  children: ReactElement | string | null | undefined
  isLoading?: boolean
}

export default function DropdownActionFilterButton<T>(props: Props<T>) {
  const {setRootRef, isActive, setIsActive, popperStyles, setPopperElement, attributes} = useDropDown({offset: [0, 4], placement: 'bottom-end'})

  const handleClick = () => {
    setIsActive(!isActive)
  }
  const handleClickItem = (value: T | undefined | null) => {
    props.onChange?.(value)
    setIsActive(false)
  }

  return (
    <div className={styles.root}>
      {props.isLoading 
      ? <Spinner size={24} color={colors.white} secondaryColor={colors.green}/> 
      : <FilterButton  onClick={handleClick} ref={setRootRef}>{props.children}</FilterButton>
      }
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
