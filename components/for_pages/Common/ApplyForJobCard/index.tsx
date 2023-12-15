import styles from './index.module.scss'
import ApplyForJobForm from '@/components/for_pages/Common/ApplyForJobForm'



interface Props {
  vacancyId: number
}

export default function ApplyForJobCard(props: Props) {
  return <div className={styles.root}>
    <ApplyForJobForm vacancyId={props.vacancyId}/>
  </div>
}
