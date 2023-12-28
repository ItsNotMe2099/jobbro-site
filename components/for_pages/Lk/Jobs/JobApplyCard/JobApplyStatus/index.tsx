import styles from './index.module.scss'
import {MouseEventHandler, useMemo, useRef, useState} from 'react'
import {useDetectOutsideClick} from '@/components/hooks/useDetectOutsideClick'
import {usePopper} from 'react-popper'
import {MenuDropdown} from '@/components/ui/MenuDropdown'
import {useHiringStageListContext} from '@/context/hiring_stage_list_state'
import {ICVWithApply} from '@/data/interfaces/ICV'
import CvUtils from '@/utils/CvUtils'
import {useApplyCvContext} from '@/context/apply_cv_state'
import {colors} from '@/styles/variables'
import ChevronDownMiniSvg from '@/components/svg/ChevronDownMiniSvg'
import classNames from 'classnames'
import {ApplyStatus} from '@/data/enum/ApplyStatus'
import {Nullable} from '@/types/types'
import Analytics from '@/utils/goals'
import {Goal} from '@/types/enums'
import useTranslation from 'next-translate/useTranslation'


interface Props {
  cv: ICVWithApply
}

export default function JobApplyStatus(props: Props) {
  const dropdownRef = useRef(null)
  const hiringStageListContext = useHiringStageListContext()
  const applyCvContext = useApplyCvContext()
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false)
  const [referenceElement, setReferenceElement] = useState(null)
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null)
  const { t } = useTranslation()
  const apply = CvUtils.getProposalOrApplicationFromCv(applyCvContext.cv)
  const isRejected = apply?.status === ApplyStatus.Rejected
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

  const handleClick: MouseEventHandler = (e) => {
    if(isRejected){
      return
    }
    e.preventDefault()
    e.stopPropagation()
    setIsActive(!isActive)
  }
  const handleClickItem = (hiringStageId: number | string) => {
    const all = hiringStageListContext.data.filter(i => i.id !== apply?.hiringStageId)
    const currentIndex = all.findIndex(i => i.id === hiringStageId)
    if(currentIndex === 0){
      Analytics.goal(Goal.MoveApplyFromApplied)
    }else if(currentIndex === all.length - 1){
      Analytics.goal(Goal.MoveApplyToOffer)

    }
    if (hiringStageId === 'reject') {
      applyCvContext.reject()
    } else {
      applyCvContext.moveToStage(hiringStageId as number)
    }
    setIsActive(false)
  }
  const handleRootRef = (ref: any) => {
    dropdownRef.current = ref
    setReferenceElement(ref)
  }


  const statusName = useMemo<Nullable<string>>(() => {
    if(isRejected){
      return t('apply_card_menu_status_reject')
    }else{
      const stage =  hiringStageListContext.data.find(i => i.id === apply?.hiringStageId)

      switch (stage?.key){
        case 'applied':
          return t('apply_card_menu_status_applied')
        case 'inReview':
          return t('apply_card_menu_status_in_review')
        case 'offer':
          return t('apply_card_menu_status_offer')
        default:
          return stage?.title ?? null
      }

    }
  }, [apply, hiringStageListContext.data])
  return (
    <div className={styles.root} ref={handleRootRef}>
      <div className={classNames(styles.status, {[styles.rejected]: isRejected})}
           onClick={handleClick}>{statusName}{!isRejected && <ChevronDownMiniSvg className={classNames(styles.chevron, {[styles.reversed]: isActive})} color={colors.green}/>}</div>
      <MenuDropdown ref={setPopperElement}
                                     isOpen={isActive as boolean}
                                     onClick={handleClickItem}
                                     className={styles.drop}
                                     options={[...hiringStageListContext.data.filter(i => i.id !== apply?.hiringStageId).map(i => ({label: i.title, value: i.id})), {label: t('apply_card_menu_status_action_reject'), value: 'reject', color: colors.textRed}]}
                                     style={popperStyles.popper}  {...attributes.popper} />
    </div>
  )
}

