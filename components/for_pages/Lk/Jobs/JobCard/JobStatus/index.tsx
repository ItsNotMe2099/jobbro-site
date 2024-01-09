import styles from './index.module.scss'
import {MouseEventHandler, useRef, useState} from 'react'
import {useDetectOutsideClick} from '@/components/hooks/useDetectOutsideClick'
import {usePopper} from 'react-popper'
import {MenuDropdown} from '@/components/ui/MenuDropdown'
import {colors} from '@/styles/variables'
import ChevronDownMiniSvg from '@/components/svg/ChevronDownMiniSvg'
import classNames from 'classnames'
import {IOption} from '@/types/types'
import Analytics from '@/utils/goals'
import {Goal} from '@/types/enums'
import useTranslation from 'next-translate/useTranslation'
import {PublishStatus} from '@/data/enum/PublishStatus'
import {useVacancyOwnerContext} from '@/context/vacancy_owner_state'
import Dictionary from '@/utils/Dictionary'


enum MenuKey {
  Publish = 'publish',
  Pause = 'pause',
  Close = 'close',
}

interface Props {

}

export default function JobStatus(props: Props) {
  const dropdownRef = useRef(null)
  const vacancyContext = useVacancyOwnerContext()
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false)
  const [referenceElement, setReferenceElement] = useState(null)
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null)
  const {t} = useTranslation()
  const vacancy = vacancyContext.vacancy!
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
          offset: [0, 0],
        },
      },

    ]
  })

  const menuOptions: IOption<MenuKey>[] = [
    ...(!([PublishStatus.Closed] as PublishStatus[]).includes(vacancy.status) ? [

      ...(!([PublishStatus.Published, PublishStatus.Closed] as PublishStatus[]).includes(vacancy.status) ? [
        {label: t('job_card_menu_publish'), value: MenuKey.Publish},
      ] : []),
      ...(!([PublishStatus.Paused] as PublishStatus[]).includes(vacancy.status) ? [
        {label: t('job_card_menu_pause'), value: MenuKey.Pause},
      ] : []),

      {label: t('job_card_menu_close'), value: MenuKey.Close},

    ] : [])
  ]
  const handleClick: MouseEventHandler = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsActive(!isActive)
  }

  const getColorStatus = (status: PublishStatus) => {
    switch (status) {
      case PublishStatus.Draft:
        return colors.darkBlue
      case PublishStatus.Published:
        return colors.green
      case PublishStatus.Paused:
        return colors.darkOrange
      case PublishStatus.Closed:
        return colors.green
    }
  }

  const handleMenuItemClick = (key: MenuKey) => {
    switch (key) {
      case MenuKey.Publish:
        vacancyContext.publish()
        break
      case MenuKey.Pause:
        vacancyContext.pause()
        break
      case MenuKey.Close:
        vacancyContext.close()
        Analytics.goal(Goal.JobClose)
        break
    }
    setIsActive(false)
  }
  const handleRootRef = (ref: any) => {
    dropdownRef.current = ref
    setReferenceElement(ref)
  }

  return (
    <div className={styles.root} ref={handleRootRef}>
      <div className={classNames(styles.status)} style={{ color: getColorStatus(vacancy.status) }}
           onClick={handleClick}> {Dictionary.getVacancyStatusName(vacancy.status, t)}
        <ChevronDownMiniSvg className={classNames(styles.chevron)}
                            color={getColorStatus(vacancy.status)}/></div>
      <MenuDropdown ref={setPopperElement}
                    isOpen={isActive as boolean}
                    onClick={handleMenuItemClick}
                    className={styles.drop}
                    options={menuOptions}
                    style={popperStyles.popper}  {...attributes.popper} />
    </div>
  )
}

