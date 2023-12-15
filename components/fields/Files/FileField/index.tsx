import styles from './index.module.scss'
import {ReactElement, useMemo, useRef, useState} from 'react'
import IFile from 'data/interfaces/IFile'
import { FileUploadAcceptType, SnackbarType } from 'types/enums'
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

interface Props extends IField<IFile | File | null> {
  isImage?: boolean
  labelLoading?: string
  labelExist?: string
  labelNew?: string
  accept?: FileUploadAcceptType[]
  text?: ReactElement | string
  label?: string
  maxSize?: number
  disableUpload?: boolean
}

export default function FileField(props: Props) {
  const appContext = useAppContext()
  const abortControllerRef = useRef<AbortController>()
  const [previewPath, setPreviewPath] = useState('')
  const [previewName, setPreviewName] = useState('')
  const [previewSize, setPreviewSize] = useState<number>(0)
  const [progress, setProgress] = useState(-1)
  // @ts-ignore
  const [field, meta, helpers] = useField<IFile | File | null>(props)
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
        //await FileRepository.deleteMyFile(field.value.id)
        helpers.setValue(null)
      } catch (err) {
        if (err instanceof RequestError) {
          appContext.showSnackbar(err.message, SnackbarType.error)
        }
      }
    }
  }

  const handleCancel = async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
  }


  const onDropRejected = (fileRejections: FileRejection[], event: DropEvent) => {
    if (fileRejections.length > 0 && fileRejections[0].errors.length > 0) {
      setError(fileRejections[0].errors[0].message)
    }
  }

  const onDrop = async (acceptedFiles: File[],
    fileRejections: FileRejection[],
    event: DropEvent) => {
    if (acceptedFiles.length) {
      setError(null)
      setPreviewPath(URL.createObjectURL(acceptedFiles[0]))
      setPreviewName(acceptedFiles[0].name)
      setPreviewSize(acceptedFiles[0].size)
      setProgress(0)
      abortControllerRef.current = new AbortController()
      if(props.disableUpload) {
        helpers.setValue(acceptedFiles[0])
        return
      }
      try {
        const fileData = await FileRepository.uploadFile(acceptedFiles[0], {
          signal: abortControllerRef.current.signal,
          onUploadProgress: (e) => {
            setProgress(e.total ? Math.round((e.loaded / e.total) * 100) : 0)
          }
        })
        if (fileData) {
          setProgress(-1)
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
          maxFiles={1}
          maxSize={props.maxSize ?? 1024*1024*5}
          title={props.text ?? props.label as string}
          accept={dropzoneAccept}
        />

        {(field.value || previewPath) && <FileListItem
          className={styles.fileListItem}
          isImage={props.isImage ?? false}
          labelLoading={props.labelLoading ?? ''}
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

