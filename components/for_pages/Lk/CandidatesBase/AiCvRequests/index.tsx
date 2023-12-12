import Card from '@/components/for_pages/Common/Card'
import styles from './index.module.scss'
import { useAiCvRequestListOwnerContext} from '@/context/ai_cv_request_list_state'
import AiCvRequestItem from '@/components/for_pages/Lk/CandidatesBase/AiCvRequestItem'
import AiCvRequestDropzone from '@/components/for_pages/Lk/CandidatesBase/AiCvRequestDropzone'
import {DropEvent, FileRejection} from 'react-dropzone'
import {useRef, useState} from 'react'
import IFile from '@/data/interfaces/IFile'
import {Nullable} from '@/types/types'

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

interface Props {

}

const AiCvRequestsInner = (props: Props) => {
  const aiCvRequestListContext = useAiCvRequestListOwnerContext()
  const abortControllersRef = useRef<IAbortControllerWithId[]>([])
  const [files, setFiles] = useState<IFileListItem[]>([])
  const containerRef = useRef<Nullable<HTMLDivElement>>(null)

  const handleCancel = async (file: IFileListItem) => {
   aiCvRequestListContext.cancelFileUpload(file)
  }


  const onDrop = async (acceptedFiles: File[],
                        fileRejections: FileRejection[],
                        event: DropEvent) => {
    if(!acceptedFiles?.length){
      return
    }
    aiCvRequestListContext.uploadFiles(acceptedFiles)
  }
  console.log('aiCvRequestListContext.dataInProgress', aiCvRequestListContext.dataInProgress)
  return (
    <Card className={styles.card} >
      <div className={styles.root} ref={containerRef}>
        <div className={styles.section}>
          <div className={styles.title}>Completed</div>
          <div className={styles.list}>
            {aiCvRequestListContext.dataCompleted.data.map(i => <AiCvRequestItem request={i} isSelectable={aiCvRequestListContext.selectedIds.length > 0} isChecked={aiCvRequestListContext.isSelectAllCompleted || aiCvRequestListContext.selectedIds.includes(i.id)} isCompleted={true} onSelect={() => aiCvRequestListContext.addToSelectedId(i.id)}/>)}
          </div>
        </div>
        <div className={styles.section}>
          <div className={styles.title}>Recognising Cvs</div>
          <div className={styles.list}>
            {aiCvRequestListContext.dataInProgress.data.map(i => <AiCvRequestItem key={i?.file?.id ?? i.request?.id}
                                                                                  request={i.request ?? null}
                                                                                  isCompleted={false}   fileName={i.file?.previewName ?? ''}
                                                                                  fileProgress={i.file?.progress ?? 0}
                                                                                  onDelete={() => handleCancel(i.file!)}/>)}

          </div>
        </div>
      </div>
      <AiCvRequestDropzone   onDrop={onDrop}
                             maxFiles={1}
                             maxSize={ 1024*1024*5}
                          //   accept={[]}
                                boundaryElement={styles.card} containerRef={containerRef}
      />
    </Card>
  )
}

export default function AiCvRequests(props: Props) {
  return (    <AiCvRequestsInner/>)
}
