import styles from './index.module.scss'
import {ReactElement,  useMemo, useRef, useState} from 'react'
import IFile from 'data/interfaces/IFile'
import { FileUploadAcceptType,  ModalType,  SnackbarType } from 'types/enums'
import { useField } from 'formik'
import { useAppContext } from 'context/state'
import { IField, RequestError } from 'types/types'
import { Accept, DropEvent, FileRejection, useDropzone } from 'react-dropzone'
import Converter from '@/utils/converter'
import usePressAndHover from '@/components/hooks/usePressAndHover'
import FieldError from '@/components/fields/FieldError'
import FileUploadDropzone from '@/components/fields/Files/components/FileUploadDropzone'
import FileListItem from '@/components/fields/Files/FileListField/FileListItem'
import FileRepository from '@/data/repositories/FileRepository'
import { ICropAvatarModalProps } from '@/components/modals/CropAvatar/CropAvatarModal'
// import { ICropAvatarModalProps } from '@/components/modals/CropAvatarModal'

interface Props extends IField<IFile | File | null> {
  isImage?: boolean
  labelLoading?: string
  labelExist?: string
  labelNew?: string
  accept?: FileUploadAcceptType[]
  text?: ReactElement | string
  title?: string
  label?: string
  maxSize?: number
  disableUpload?: boolean
  withCrop?: boolean
  dropZoneClassName?: string
  dropZoneStyle?: 'row' | 'column' | undefined
  icon?: ReactElement
  width?: number
  height?: number
}

export default function FileField(props: Props) {

  const appContext = useAppContext()
  const {isTabletWidth } = appContext.size
  const abortControllerRef = useRef<AbortController>()
  const [previewPath, setPreviewPath] = useState('')
  const [previewName, setPreviewName] = useState('')
  const [previewSize, setPreviewSize] = useState<number>(0)
  // @ts-ignore
  const [field, meta, helpers] = useField<IFile | File | null>(props)
  const [progress, setProgress] = useState(field.value? 100: 0)
  const showError = meta.touched && !!meta.error
  const [avatarRef, press, hover] = usePressAndHover()
  const [error, setError] = useState<any>(null)

  const dropzoneAccept: Accept = useMemo(() => {
    let obj = {}
    const arr = (props.accept ?? (props.isImage ? [FileUploadAcceptType.Image] : [])).map(i => Converter.getFileUploadAccept(i)) ?? {} as Accept
    arr.forEach(i => {
      obj = { ...obj, ...i }
    })
    return obj
  }, [props.accept])

  const handleDelete = async () => {
    if (field.value) {
      try {
        await FileRepository.deleteMyFile((field.value as IFile).id)
        helpers.setValue(null)
      } catch (err) {
        if (err instanceof RequestError) {
          appContext.showSnackbar(err.message, SnackbarType.error)
        }
      }
    }
  }

  const handleCancel = async () => {
    if(props.disableUpload) {
      setError(null)
      setPreviewPath('')
      setPreviewName('')
      setPreviewSize(0)
      setProgress(0)
      helpers.setValue(null)
      return
    }
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
  }

  const onDropRejected = (fileRejections: FileRejection[], event: DropEvent) => {
    if (fileRejections.length > 0 && fileRejections[0].errors.length > 0) {
      setError(fileRejections[0].errors[0].message)
    }
  }

  const downloadFile = async (file: File) => {
      setError(null)
      setPreviewPath(URL.createObjectURL(file))
      setPreviewName(file.name)
      setPreviewSize(file.size)
      setProgress(0)
      abortControllerRef.current = new AbortController()
      if(props.disableUpload) {
        helpers.setValue(file)
        return
      }
      try {
        const fileData = await FileRepository.uploadFile(file, {
          signal: abortControllerRef.current.signal,
          onUploadProgress: (e) => {
            setProgress(e.total ? Math.round((e.loaded / e.total) * 100) : 0)
          }
        })
        if (fileData) {
          setProgress(100)
          setPreviewPath('')
          helpers.setValue(fileData)
        }
      } catch (e) {
        if (abortControllerRef.current?.signal?.aborted) {
          setProgress(-1)
          setPreviewPath('')
          return
        }
        setError((e as any)?.message ?? e)
      }
  }

  const onDrop = async (acceptedFiles: File[], fileRejections: FileRejection[], event: DropEvent) => {
    if (acceptedFiles.length && props.withCrop) {
      if(isTabletWidth) {
        appContext.showBottomSheet<ICropAvatarModalProps>(ModalType.CropAvatarModal, {image: acceptedFiles[0], onEdit: (image: File) => {
          downloadFile(image)
        }})
        return
      }
      appContext.showModal<ICropAvatarModalProps>(ModalType.CropAvatarModal, {image: acceptedFiles[0], onEdit: (image: File) => {
        downloadFile(image)
      }})
    }
    else if(acceptedFiles.length) {
      downloadFile(acceptedFiles[0])
    }
  }

  const { getRootProps, getInputProps, isDragActive, ...rest } = useDropzone({
    accept: dropzoneAccept,
    onDrop,
    onDropRejected
  } as any)

  return (
    <div className={styles.container}>
      {props.label ? <div className={styles.label}>{props.label}</div> : null}
      <div className={styles.root}  data-field={props.name}>
        <FileUploadDropzone
          isImage={props.isImage}
          onDrop={onDrop}
          description={props.description}
          className={props.dropZoneClassName}
          maxFiles={1}
          icon={props.icon}
          maxSize={props.maxSize ?? 1024*1024*3.5}
          title={props.title ?? props.label as string}
          accept={dropzoneAccept}
          style={props.dropZoneStyle}
          width={props.width}
          height={props.height}
        />

        {(field.value || previewPath) && <FileListItem
          className={styles.fileListItem}
          isImage={props.isImage ?? false}
          labelLoading={props.labelLoading ?? ''}
          //@ts-ignore
          value={field.value}
          previewName={previewName}
          previewPath={previewPath}
          previewSize={previewSize}
          progress={progress}
          onCancel={handleCancel}
          onDelete={handleDelete}
          error={error}/>}
        <FieldError showError={showError}>{meta.error}</FieldError>
      </div>
    </div >
  )
}

