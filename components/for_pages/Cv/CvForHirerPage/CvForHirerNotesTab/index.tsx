import styles from './index.module.scss'
import CvNoteCreateForm from '@/components/for_pages/Cv/CvForHirerPage/CvNoteCreateForm'
import CvNotesList from '@/components/for_pages/Cv/CvForHirerPage/CvNotesList'

interface Props{

}
const CvForHirerNotesTab = (props: Props) => {
  return (
    <div className={styles.root}>
     <div className={styles.container}>
       <CvNotesList styleType={'white'} isReversed={true}/>
     </div>
      <div className={styles.bottom}>
        <CvNoteCreateForm styleType={'white'}/>

      </div>
    </div>
    )
}

export default  CvForHirerNotesTab
