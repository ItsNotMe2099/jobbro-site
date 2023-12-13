import IFile from 'data/interfaces/IFile'
import { Preset } from 'types/enums'
import { CSSProperties } from 'react'
import ImageHelper from 'utils/ImageHelper'

interface Props {
  file: IFile
  preset: Preset
  style?: CSSProperties
  className?: string
  alt?: string
  onClick?: () => void
}

export default function ImageFile(props: Props) {
  const aspectRatio = ImageHelper.needCrop(props.preset) ? '1/1' : `${props.file.metadata.width}/${props.file.metadata.height}`
  return (
    <img
      className={props.className}
      src={ImageHelper.urlFromFile(props.file, props.preset)}
      style={{ aspectRatio, ...props.style }}
      alt={`${props.alt ?? ''}`}
      onClick={props.onClick}
    />
  )
}
