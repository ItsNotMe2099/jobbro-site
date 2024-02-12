import ArrowChevronRightSvg from '@/components/svg/ArrowChevronRightSvg'
import styles from 'components/for_pages/FindJobs/MainFilters/FilterDropDown/index.module.scss'
import { colors } from '@/styles/variables'
import { useDropDown } from '@/components/hooks/useDropDown'
import { MenuDropdown } from '@/components/ui/MenuDropdown'
import classNames from 'classnames'

interface Props {
  title: string
  children?: JSX.Element | JSX.Element[]

}

export default function FilterDropDown(props: Props) {
  const {setRootRef, isActive, setIsActive, popperStyles, setPopperElement, attributes} = useDropDown({offset: [-8, 12], placement: 'top-start'})

  const handleClickItem = (value: any) => {
    setIsActive(false)
  }

  return (
    <div className={styles.root} ref={setRootRef}>
      <div className={classNames(styles.button, isActive && styles.buttonActive) }  onClick={() => setIsActive(!isActive)} >
        <p className={styles.title}>{props.title}</p>
        <ArrowChevronRightSvg className={classNames(styles.chevron, isActive && styles.chevronActive)} color={colors.textSecondary}/>
      </div>
      <MenuDropdown
      ref={setPopperElement}
      isOpen={isActive as boolean}
      onClick={handleClickItem}
      className={styles.drop}
      {...attributes.popper}
      >
        {props.children}
      </MenuDropdown>
    </div>
  )
}
