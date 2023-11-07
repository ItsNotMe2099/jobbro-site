import Card from '@/components/for_pages/Common/Card'
import styles from './index.module.scss'

interface Props {
  percent: number
  description: string
  className?: string
}

export default function CardAiSummary(props: Props) {
  const {percent, description} = props
  return (
    <Card className={props.className} title={'AI Summary'}>
      <div className={styles.container}>
        <div className={styles.comment}>
          <div className={styles.percent}>
            {percent}
          </div>
          <div className={styles.text}>{description}</div>
        </div>
      </div>
    </Card>
  )
}
