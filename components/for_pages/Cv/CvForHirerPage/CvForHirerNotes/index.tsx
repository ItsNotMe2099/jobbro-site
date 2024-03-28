import styles from './index.module.scss'
import CvNoteCreateForm from '@/components/for_pages/Cv/CvForHirerPage/CvNoteCreateForm'
import CvNotesList from '@/components/for_pages/Cv/CvForHirerPage/CvNotesList'

interface Props{
}
const CvForHirerNotes = (props: Props) => {
  return (
    <div className={styles.root}>
      <CvNoteCreateForm styleType={'grey'}/>
      <CvNotesList styleType={'white'}/>
    </div>
    )
}

export default  CvForHirerNotes
