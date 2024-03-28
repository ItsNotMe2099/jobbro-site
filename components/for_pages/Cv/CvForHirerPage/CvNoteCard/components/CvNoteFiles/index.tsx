import styles from './index.module.scss'
import DocumentPreview from '@/components/ui/DocumentPreview'
import Link from 'next/link'
import IFile from '@/data/interfaces/IFile'
import ImageHelper from '@/utils/ImageHelper'
import CvNoteCardLayout from '@/components/for_pages/Cv/CvForHirerPage/CvNoteCard/components/CvNoteCardLayout'
import ICvNote from '@/data/interfaces/ICvNote'
interface Props {
  cvNote: ICvNote
  styleType: 'green' | 'white'
}

export default function CvNoteFiles(props: Props) {
  return <CvNoteCardLayout cvNote={props.cvNote} styleType={props.styleType}>
    <div className={styles.root}>
      {props.cvNote.assets?.map((i: IFile) => <Link href={ImageHelper.urlFromSource(i.source)} target={'_blank'} className={styles.file}>
          <DocumentPreview file={i.source}  className={styles.icon}/>
        <div className={styles.name}>{i.name}</div>
      </Link>)}
    </div>
    {props.cvNote.message ? <div className={styles.text}>{props.cvNote.message!}</div> : <></>}

  </CvNoteCardLayout>
}


