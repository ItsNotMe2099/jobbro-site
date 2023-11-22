import styles from './index.module.scss'
import InputField from '@/components/fields/InputField'
interface Props {

}

export default function CreateMeetingDetailsStep(props: Props) {
  return (<div className={styles.root}>
    <InputField name='theme' label={'Theme'}/>
    <InputField name='description' label={'Description'}/>
    <InputField name='place' label={'Place'}/>
  </div>)
}
