
import CvNoteText from '@/components/for_pages/Cv/CvForHirerPage/CvNoteCard/components/CvNoteText'
import CvNotePhotos from '@/components/for_pages/Cv/CvForHirerPage/CvNoteCard/components/CvNotePhotos'
import CvNoteFiles from '@/components/for_pages/Cv/CvForHirerPage/CvNoteCard/components/CvNoteFiles'
import ICvNote from '@/data/interfaces/ICvNote'


interface Props {
  cvNote: ICvNote
  styleType: 'green' | 'white'
}

export default function CvNoteCard(props: Props) {
  if((props.cvNote.assets?.length ?? 0) > 0 && (props.cvNote.assets?? []).every((i) => i.type === 'IMAGE')){
    return <CvNotePhotos  {...props}/>
  }else if((props.cvNote.assets?.length ?? 0) > 0){
    return <CvNoteFiles {...props}/>
  }else {
    return <CvNoteText {...props}/>
  }
}


