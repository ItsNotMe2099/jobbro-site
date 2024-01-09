import styles from './index.module.scss'
import classNames from 'classnames'
import { ReactElement, useState } from 'react'
import DropzoneOverlay from 'components/fields/Files/components/DropzoneOverlay'
import { DropEvent, DropzoneOptions, FileRejection, useDropzone } from 'react-dropzone'
import AddImageSvg from '@/components/svg/AddImageSvg'


interface Props extends DropzoneOptions {
  isImage?: boolean
  title?: string | ReactElement
  description?: string| JSX.Element
  showDropzone?: boolean
  icon?: ReactElement
  className?: string
}

export default function FileUploadDropzone(props: Props) {
  const [error, setError] = useState<string | null>(null)
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
      return <></>//<AttachSvg className={styles.icon} color={colors.textSecondary}/>
    }

  }
  return (
    <div className={classNames(styles.root, props.className)} {...getRootProps()}>
      <input {...getInputProps()} />
      {getIcon()}
      <div className={styles.info}>
        {props.description 
        ? <div className={styles.description}>{props.description}</div>
        : <div className={styles.title}> {props.title ?? 'Загрузить фото'}</div>
      }
      </div>
      {error && <div className={styles.error}>{error}</div>}
      {isDragActive && <DropzoneOverlay show={isDragActive} title={'Загрузить фото'} />}
    </div>
  )
}

