import styles from './index.module.scss'
import IFile from 'data/interfaces/IFile'
import classNames from 'classnames'
import {CSSProperties, ReactElement} from 'react'
import { useAppContext } from 'context/state'
import { Preset } from 'types/enums'
import ImageHelper from 'utils/ImageHelper'
import PersonSvg from 'components/svg/PersonSvg'
import { colors } from 'styles/variables'
import {Nullable} from '@/types/types'


interface Props {
  file?: IFile | null | undefined
  alt?: string
  size?: number
  sizeXs?: number
  className?: string
  icon?: ReactElement
  initials?: Nullable<string>
}

export default function AvatarCircular(props: Props) {
  const appContext = useAppContext()
  const inlineStyle: CSSProperties = {}


    inlineStyle.width = props.size ?? 64
    inlineStyle.height = props.size ?? 64
    inlineStyle.flexShrink = 0
    inlineStyle.flexBasis = props.size ?? 64

  if (appContext.isMobile && props.sizeXs) {
    inlineStyle.width = props.sizeXs ?? 64
    inlineStyle.height = props.sizeXs ?? 64
    inlineStyle.flexShrink = 0
    inlineStyle.flexBasis = props.sizeXs ?? 64
  }

  const icon = props.icon ? props.icon : <PersonSvg color={colors.white} className={styles.icon} />
  return (
    <div className={classNames([styles.root,props.className], {[styles.withIcon]: !props.file})} style={inlineStyle}>
      {props.file && <img src={ImageHelper.urlFromFile(props.file, Preset.xsCrop)} alt={props.alt} className={styles.image} />}
      {!props.file && !props.initials && icon}
      {props.initials}
    </div>
  )
}

