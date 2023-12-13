import styles from 'components/fields/Files/components/FileUploadIconPreview/index.module.scss'
import classNames from 'classnames'
import IFile from 'data/interfaces/IFile'
import LinkButton from 'components/ui/LinkButton'
import {MouseEventHandler, ReactElement} from 'react'
import FileUploadIconPreview from 'components/fields/Files/components/FileUploadIconPreview'
import usePressAndHover from '@/components/hooks/usePressAndHover'


interface Props {
  isImage?: boolean
  value?: IFile | null
  previewName?: string
  previewPath?: string
  vertical?: boolean
  progress: number
  error?: string | undefined
  label?: string | undefined
  labelLoading?: string | undefined
  labelExist?: string| undefined
  labelNew?: string| undefined
  onCancel?: () => void
  onDelete?: () => void
  icon?: ReactElement
  stubIcon?: ReactElement
  text?: React.ReactNode
}

export default function FileUploadPreview(props: Props) {
  const [avatarRef, press, hover] = usePressAndHover()
  const handleCancel: MouseEventHandler = (e) => {
    e.stopPropagation()
    e.preventDefault()
    if(props.onCancel) {
      props.onCancel()
    }
  }

  const handleDelete: MouseEventHandler = (e) => {
    e.stopPropagation()
    e.preventDefault()
    if(props.onDelete) {
      props.onDelete()
    }
  }
  const getText = (): ReactElement | string | null => {
    if (props.progress > -1) {
      return <div>{props.labelLoading ?? 'Файл загружается'}  {props.progress}% <LinkButton onClick={handleCancel}>Отмена</LinkButton></div>
    }
    if (props.value) {
      return <div>{props.labelExist ?? `Можете загрузить ${props.isImage ? 'новое' : 'новый'}`} <LinkButton onClick={handleDelete}>Удалить</LinkButton></div>
    }
    if(props.text){
      return props.text as ReactElement | string
    }
    return <div>{props.labelNew ?? `Загрузите ${props.isImage ? 'изображение' : 'файл'}`}</div>
  }

  return (
    <div
      className={classNames({
        [styles.button]: true,
        [styles.vertical]: props.vertical,
      })}
    >
      <FileUploadIconPreview
        progress={props.progress}
        isImage={props.isImage}
        previewPath={props.previewPath}
        previewName={props.previewName}
        value={props.value}/>
      <div className={styles.text}>
        {getText()}
        {props.error && <div className={styles.error}>{props.error}</div>}
      </div>
    </div>
  )
}

