import styles from './index.module.scss'
import {MouseEventHandler, useRef, useState} from 'react'
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
  const apply = CvUtils.getProposalOrApplicationFromCv(props.cv)
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
    e.preventDefault()
    e.stopPropagation()
    setIsActive(!isActive)
  }
  const handleClickItem = (hiringStageId: number | string) => {
    if (hiringStageId === 'reject') {

    } else {
      applyCvContext.moveToStage(hiringStageId as number)
    }
    setIsActive(false)
  }
  const handleRootRef = (ref: any) => {
    dropdownRef.current = ref
    setReferenceElement(ref)
  }

  return (
    <div className={styles.root} ref={handleRootRef}>
      <div className={styles.status}
           onClick={handleClick}>{hiringStageListContext.data.find(i => i.id === apply?.hiringStageId)?.title}<ChevronDownMiniSvg className={classNames(styles.chevron, {[styles.reversed]: isActive})} color={colors.green}/></div>
      <MenuDropdown ref={setPopperElement}
                                     isOpen={isActive as boolean}
                                     onClick={handleClickItem}
                                     className={styles.drop}
                                     options={[...hiringStageListContext.data.filter(i => i.id !== apply?.hiringStageId).map(i => ({label: i.title, value: i.id})), {label: 'Reject', value: 'reject'}]}
                                     style={popperStyles.popper}  {...attributes.popper} />
    </div>
  )
}
