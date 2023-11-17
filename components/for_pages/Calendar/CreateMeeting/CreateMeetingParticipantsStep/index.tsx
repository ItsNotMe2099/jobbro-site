import styles from './index.module.scss'
import ManagerMultiField from '@/components/fields/ManagerMultiField'

interface Props {

}

export default function CreateMeetingParticipantsStep(props: Props) {
  return <div className={styles.root}>
    <ManagerMultiField name={'participantsIds'}/>
  </div>
}
