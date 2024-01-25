import styles from './index.module.scss'
import classNames from 'classnames'
import {ReactElement, useMemo, useState} from 'react'
import DropzoneOverlay from 'components/fields/Files/components/DropzoneOverlay'
import { DropEvent, DropzoneOptions, FileRejection, useDropzone } from 'react-dropzone'
import AddImageSvg from '@/components/svg/AddImageSvg'
import useTranslation from 'next-translate/useTranslation'
import Formatter from '@/utils/formatter'


interface Props extends DropzoneOptions {
  isImage?: boolean
  title?: string | ReactElement
  description?: string| JSX.Element
  showDropzone?: boolean
  icon?: ReactElement
  className?: string
  width?: number | undefined,
  height?: number | undefined
  style?: 'row' | 'column' | undefined
}

export default function FileUploadDropzone(props: Props) {
  const [error, setError] = useState<string | null>(null)
  const {t} = useTranslation()
  const isMulti = (props.maxFiles ?? 0) > 1
  const onDropRejected = (fileRejections: FileRejection[], event: DropEvent) => {
    if (fileRejections.length > 0 && fileRejections[0].errors.length > 0) {
      setError(fileRejections[0].errors[0].message)
    }
  }
  const { getRootProps, getInputProps, isDragActive, ...rest } = useDropzone({
    ...props,
    onDropRejected,
  } as any)

  const getIcon = (): ReactElement => {
    if (props.icon) {
      return props.icon
    }
    if (props.isImage) {
      return <AddImageSvg className={styles.icon} />
    } else {
      return <AddImageSvg className={styles.icon} />
    }

  }

  const description = useMemo<string>(() => {
    const sizeFormatted = Formatter.formatSize(props.maxSize ?? 0)
    if(props.isImage){
      if(props.maxSize && props.width && props.height){
        return isMulti ? t('form_field_file_image_multi_size_width',  {count: props.maxFiles, size: sizeFormatted, width: `${props.width}px`, height: `${props.height}px`}) : t('form_field_file_image_size_width', {size: sizeFormatted, width: `${props.width}px`, height: `${props.height}px`})
      }else if(props.maxSize){
        return isMulti ? t('form_field_file_image_multi_only_size', {count: props.maxFiles, size: sizeFormatted}) : t('form_field_file_image_only_size', {size: sizeFormatted})
      }else{
        return isMulti ? t('form_field_file_image_multi', {count: props.maxFiles}) : t('form_field_file_image')
      }
    }else{
      if(props.maxSize){
        return isMulti ? t('form_field_file_file_multi_only_size', {count: props.maxFiles, size: sizeFormatted}) : t('form_field_file_file_only_size', {size: sizeFormatted})
      }else{
        return isMulti ? t('form_field_file_file_multi') : t('form_field_file_file')
      }
    }
  }, [props.maxSize, props.width, props.height])
  return (
    <div className={classNames(styles.root, {[styles.row]: !props.style || props.style === 'row', [styles.column]: props.style === 'column'},props.className)} {...getRootProps()}>
      <input {...getInputProps()} />
      {getIcon()}
      <div className={styles.info}>
        <div className={styles.description}>{props.description ?? description}</div>
      </div>
      {error && <div className={styles.error}>{error}</div>}
      {isDragActive && <DropzoneOverlay show={isDragActive} isImage={props.isImage} isMulti={isMulti} />}
    </div>
  )
}

