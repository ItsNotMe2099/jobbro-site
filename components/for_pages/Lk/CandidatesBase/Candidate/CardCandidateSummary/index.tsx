import Card from '@/components/for_pages/Common/Card'
import styles from './index.module.scss'

interface Props {
  item: any //temp
  className?: string
}

export default function CardCandidateSummary(props: Props) {

  return (
    <Card className={props.className} title={'About me'}>
      <div className={styles.container}>
        <div className={styles.about}>
          {props.item.about}
        </div>
        <div className={styles.section}>
          <div className={styles.title}>
            Education
          </div>
          <div className={styles.about}>
            {props.item.education}
          </div>
        </div>
        <div className={styles.section}>
          <div className={styles.title}>
            Skills
          </div>
          <ul className={styles.list}>
            {props.item.skills.map((i: any, index: number) =>
              <li key={index}>{i.text}</li>
            )}
          </ul>
          <div className={styles.tags}>
            {props.item.tags.map((i: any, index: number) =>
              <div className={styles.tag} key={index}>
                {i.label}
              </div>
            )}
          </div>
        </div>
        <div className={styles.section}>
          <div className={styles.title}>
            Languages
          </div>
          <div className={styles.tags}>
            {props.item.langs.map((i: any, index: number) =>
              <div className={styles.tag} key={index}>
                {i.label}
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}
