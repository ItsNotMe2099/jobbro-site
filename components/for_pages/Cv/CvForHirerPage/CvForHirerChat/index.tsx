import styles from './index.module.scss'
import ChatDialog from '@/components/for_pages/Chat/ChatDialog'
interface Props{
 cvId: number,
  vacancyId: number
}
const CvForHirerChat = (props: Props) => {
  return (
    <div className={styles.root}>
      <ChatDialog vacancyId={props.vacancyId} cvId={props.cvId} hideHeader hideTitle hideCalendar styleType={'transparent'} containerClassName={styles.container} />
    </div>
  )
}

export default  CvForHirerChat
