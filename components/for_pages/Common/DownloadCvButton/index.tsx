import styles from './index.module.scss'
import {MenuDropdown} from '@/components/ui/MenuDropdown'
import { useDropDown } from '@/components/hooks/useDropDown'
import classNames from 'classnames'
import { Placement} from '@popperjs/core'
import {colors} from '@/styles/variables'
import {ICV} from '@/data/interfaces/ICV'
import DownloadSvg from '@/components/svg/DownloadSvg'
import {IOption} from '@/types/types'
import useTranslation from 'next-translate/useTranslation'
import Analytics from '@/utils/goals'
import {Goal} from '@/types/enums'
import {runtimeConfig} from '@/config/runtimeConfig'
import ImageHelper from '@/utils/ImageHelper'
import {MouseEventHandler} from 'react'
import ChevronDownMiniSvg from '@/components/svg/ChevronDownMiniSvg'

enum MenuKey{
  DownloadPdf = 'downloadPdf',
  DownloadOriginalPdf = 'downloadOriginalPdf'
}
interface Props {
  cv: ICV
  title?: string
  placement?: Placement|undefined
  styleType: 'badge' | 'buttonGreen' | 'buttonTransparent'
  className?: string
}

export default function DownloadCvButton(props: Props) {
  const {t} = useTranslation()
  const menuOptions: IOption<MenuKey>[] = [
    {label: t('apply_card_menu_download'), value: MenuKey.DownloadPdf},
    ...(props.cv.file ? [{label: t('apply_card_menu_download_original'), value: MenuKey.DownloadOriginalPdf}] : []),
    ]
  const {setRootRef, isActive, setIsActive, popperStyles, setPopperElement, attributes} = useDropDown({ placement: props.placement})
  const handleClick: MouseEventHandler = (e) => {
    e.preventDefault()
    // e.stopPropagation()
    setIsActive(!isActive)
  }
  const handleClickItem = (value: MenuKey) => {
    switch (value){
      case MenuKey.DownloadPdf:
        Analytics.goal(Goal.CvDownloadPdf)
        window.open(`${runtimeConfig.HOST}/api/cv/${props.cv!.id}/exportToPdf`, '_blank')
        break
      case MenuKey.DownloadOriginalPdf:
        window.open(`${ImageHelper.urlFromFile(props.cv.file)}`, '_blank')
        break
    }
    setIsActive(!isActive)
  }

  return (
    <div className={classNames(styles.root, props.className)} ref={setRootRef}>
      <div className={classNames(styles.menu, {[styles[props.styleType]]: true})} onClick={handleClick}>
        {['buttonTransparent', 'buttonGreen'].includes(props.styleType) && <DownloadSvg color={props.styleType === 'buttonTransparent' ? colors.textPrimary : colors.white}/>}
        <div>{props.title ?? t('btn_download_cv')}</div>
        {props.styleType === 'badge' && <ChevronDownMiniSvg color={colors.green}/>}
        </div>
      <MenuDropdown<MenuKey>
        ref={setPopperElement}
        isOpen={isActive as boolean}
        onClick={handleClickItem}
        className={styles.drop}
        options={menuOptions}
        style={popperStyles.popper}
        {...attributes.popper} />
    </div>
  )
}

