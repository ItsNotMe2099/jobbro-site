import styles from './index.module.scss'
import {ReactElement, useEffect, useMemo, useRef, useState} from 'react'
import IFile from 'data/interfaces/IFile'
import {FileUploadAcceptType, SnackbarType} from 'types/enums'
import {useField} from 'formik'
import {useAppContext} from 'context/state'
import {IField, RequestError} from 'types/types'
import {Accept, DropEvent, FileRejection} from 'react-dropzone'
import {v4 as uuidv4} from 'uuid'
import FileUploadDropzone from 'components/fields/Files/components/FileUploadDropzone'
import FileListItem from 'components/fields/Files/FileListField/FileListItem'
import Converter from '@/utils/converter'
import FileRepository from '@/data/repositories/FileRepository'
import classNames from 'classnames'

interface IFileListItem {
  id: string
  value?: IFile,
  previewPath?: string
  previewName?: string
  previewSize?: number
  progress: number
  error?: any
}

interface IAbortControllerWithId extends AbortController {
  id?: string
}

interface Props extends IField<IFile[] | null> {
  isImage?: boolean
  vertical?: boolean
  accept?: FileUploadAcceptType[]
  maxFiles?: number
  maxSize?: number
  labelLoading?: string
  dropzoneTitle?: string | ReactElement
  className?: string
  fileListClassName?: string
}

export default function FileListField(props: Props) {
  const appContext = useAppContext()
  const abortControllersRef = useRef<IAbortControllerWithId[]>()
  const initRef = useRef<boolean>(false)
  // @ts-ignore
  const [field, meta, helpers] = useField<IFile[] | null>(props)
  const [files, setFiles] = useState<IFileListItem[]>(field.value?.map(i => ({
    id: i.id.toString(),
    value: i,
    progress: 100
  })) ?? [])

  useEffect(() => {
    if (!initRef.current) {
      initRef.current = true
      return
    }
    helpers.setValue(files.filter(i => !!i.value).map(i => i.value as IFile))
    if(files.find( i => !i.value)){
      appContext.setIsFilesUploading(true)
    }else{
      appContext.setIsFilesUploading(false)
    }
  }, [files])

  const handleDelete = async (file: IFileListItem) => {
    
    if (field.value) {
      try {
        setFiles(files => files.filter(f => f.id !== file.id))
      } catch (err) {
        if (err instanceof RequestError) {
          appContext.showSnackbar(err.message, SnackbarType.error)
        }
      }
    }
  }

  const handleCancel = async (file: IFileListItem) => {
    (abortControllersRef.current as IAbortControllerWithId[])?.find(i => i.id === file.id)?.abort()
  }

  const onDrop = async (acceptedFiles: File[],
                        fileRejections: FileRejection[],
                        event: DropEvent) => {
    if (acceptedFiles.length) {
      for (const acceptedFile of acceptedFiles) {
        const abortController = new AbortController()
        const file: IFileListItem = {
          id: uuidv4(),
          previewName: acceptedFile.name,
          previewPath: URL.createObjectURL(acceptedFiles[0]),
          previewSize: acceptedFile.size,
          progress: 0
        }
        setFiles(files => [...files, file])

        try {
          (abortController as IAbortControllerWithId).id = file.id
          abortControllersRef.current = [...(abortControllersRef.current ?? []), abortController]
          const fileData = await FileRepository.uploadFile(acceptedFile, {
            signal: abortController.signal,
            onUploadProgress: (e) => {
              setFiles(files => files.map(f => f.id === file.id ? ({
                ...f,
                progress: e.total ? Math.round((e.loaded / e.total) * 100) : 0
              }) : f))
            }
          })
          if (fileData) {
            setFiles(files => files.map(f => f.id === file.id ? ({
              ...f,
              progress: 100,
              previewPath: '',
              value: fileData
            }) : f))
          }
        } catch (e) {
          if (abortController.signal.aborted) {
            setFiles(files => files.map(f => f.id === file.id ? ({...f, progress: -1, previewPath: ''}) : f))
            return
          }
          setFiles(files => files.map(f => f.id === file.id ? ({...f, progress: -1, previewPath: '', error: e}) : f))
        }
      }
    }
  }

  const dropzoneAccept: Accept = useMemo(() => {
    let obj = {}
    const arr = (props.accept ?? (props.isImage ? [FileUploadAcceptType.Image] : [])).map(i => Converter.getFileUploadAccept(i)) ?? {} as Accept
    arr.forEach(i => {
      obj = {...obj, ...i}
    })
    return obj
  }, [props.accept])


  return (
    <>
    {/* // <div className={styles.root} data-field={props.name}> */}
      {props.label && <div className={styles.label}>{props.label}</div>}
      <FileUploadDropzone
        className={props.className}
        isImage={props.isImage}
        onDrop={onDrop}
        maxFiles={props.maxFiles}
        maxSize={props.maxSize ?? 1024*1024*5}
        title={props.dropzoneTitle ?? props.label as string}
        accept={dropzoneAccept}
        />
      <div className={classNames(styles.files, props.fileListClassName)}>
        {files.map(file => <FileListItem
          key={file.id}
          isImage={props.isImage}
          labelLoading={props.labelLoading}
          value={file.value}
          previewName={file.previewName}
          previewPath={file.previewPath}
          previewSize={file.previewSize}
          progress={file.progress}
          onCancel={() => handleCancel(file)}
          onDelete={() => handleDelete(file)}
          error={file.error}/>)}
      </div>
    {/* // </div> */}
        </>
  )
}

