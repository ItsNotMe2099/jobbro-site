import styles from './index.module.scss'
import ImageFile from '@/components/ui/ImageFile'
import {ModalType, Preset} from '@/types/enums'
import {useAppContext} from '@/context/state'
import classNames from 'classnames'
import IFile from '@/data/interfaces/IFile'
import { GalleryModalArguments } from '@/components/modals/GalleryModal'
import CvNoteCardLayout from '../CvNoteCardLayout'
import ICvNote from '@/data/interfaces/ICvNote'

interface Props{
  cvNote: ICvNote
  styleType: 'green' | 'white'
}

export default function CvNotePhotos(props: Props) {
  const appContext = useAppContext()
  return <CvNoteCardLayout cvNote={props.cvNote} styleType={props.styleType}>
    <div className={classNames(styles.root, {
      [styles.single]: (props.cvNote.assets?.length ?? 0) === 1,
      [styles.multi]: (props.cvNote.assets?.length ?? 0) > 1
    })}>
      {props.cvNote.assets?.map((i: IFile) =>  <ImageFile onClick={() => {
        appContext.showModal<GalleryModalArguments>(ModalType.Gallery, {
          title: 'Фото сообщения',
          images: props.cvNote.assets as IFile[],
          selectedId: i.id,
        })
      }} className={styles.image} preset={Preset.xsResize} key={i.id} file={i} />)}
    </div>
    {props.cvNote.message ? <div className={styles.text}>{props.cvNote.message!}</div> : <></>}
  </CvNoteCardLayout>
}


