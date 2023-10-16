import Card from '@/components/for_pages/Common/Card'
import styles from './index.module.scss'

interface Props {
  item: any //temp
  className?: string
}

export default function CardAiSummary(props: Props) {

  return (
    <Card className={props.className} title={'AI Summary'}>
      <div className={styles.container}>
        <div className={styles.comment}>
          <div className={styles.percent}>
            {props.item.percent}
          </div>
          <div className={styles.text}>{props.item.aiComment}</div>
        </div>
      </div>
    </Card>
  )
}
