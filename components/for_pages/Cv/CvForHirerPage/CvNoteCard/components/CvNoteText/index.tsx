import CvNoteCardLayout from '@/components/for_pages/Cv/CvForHirerPage/CvNoteCard/components/CvNoteCardLayout'
import ICvNote from '@/data/interfaces/ICvNote'
interface Props {
  cvNote: ICvNote
  styleType: 'green' | 'white'
}

export default function CvNoteText(props: Props) {
  return <CvNoteCardLayout cvNote={props.cvNote} styleType={props.styleType}>
    {props.cvNote?.message}
  </CvNoteCardLayout>
}


