import styles from './index.module.scss'
import Card from '@/components/for_pages/Common/Card'
import InputField from '@/components/fields/InputField'
import { FormikProps } from 'formik'
import SelectField from '@/components/fields/SelectField'
import { FormData } from '../..'
import RichTextField from '@/components/fields/RichTextField'
import Switch from '@/components/ui/Switch'
import { useState } from 'react'

// Define a type for the Formik instance
type MyFormikType = FormikProps<FormData>

interface Props {
  formik: MyFormikType
}

export default function DetailsForm(props: Props) {

  const [about, setAbout] = useState<boolean>(false)
  const [mission, setMission] = useState<boolean>(false)
  const [culture, setCulture] = useState<boolean>(false)
  const [advantages, setAdvantages] = useState<boolean>(false)

  return (
    <div className={styles.root}>
      <Card title='Details'>
        <div className={styles.wrapper}>
          <InputField
            className={styles.select}
            placeholder='Company name' name='companyName' label={props.formik.values.companyName ? 'Company name' : ''}
            labelType='in' />
          <InputField
            className={styles.select}
            placeholder='Website' name='website' label={props.formik.values.companyName ? 'Website' : ''}
            labelType='in' />
          <SelectField placeholder='Number of employees' className={styles.select} name='numberOfEmployees' options={[]} />
          <SelectField placeholder='Industry' className={styles.select} name='industry' options={[]} />
          <SelectField placeholder='Country' className={styles.select} name='country' options={[]} />
        </div>
      </Card>
      <Card title={<div className={styles.top}>
        <div className={styles.title}>About</div>
        <Switch checked={about} onChange={() => setAbout(!about)} />
      </div>}>
        {about ? <RichTextField name='about' /> : <></>}
      </Card>
      <Card title={<div className={styles.top}>
        <div className={styles.title}>Mission</div>
        <Switch checked={mission} onChange={() => setMission(!mission)} />
      </div>}>
        {mission ? <RichTextField name='mission' /> : <></>}
      </Card>
      <Card title={<div className={styles.top}>
        <div className={styles.title}>Culture</div>
        <Switch checked={culture} onChange={() => setCulture(!culture)} />
      </div>}>
        {culture ? <RichTextField name='culture' /> : <></>}
      </Card>
      <Card title={<div className={styles.top}>
        <div className={styles.title}>Advantages</div>
        <Switch checked={advantages} onChange={() => setAdvantages(!advantages)} />
      </div>}>
        {advantages ? <RichTextField name='advantages' /> : <></>}
      </Card>
    </div>
  )
}
