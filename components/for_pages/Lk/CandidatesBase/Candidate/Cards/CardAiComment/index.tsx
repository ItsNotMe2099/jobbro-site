import Card from '@/components/for_pages/Common/Card'
import styles from './index.module.scss'
import SparksSvg from '@/components/svg/SparksSvg'
import { colors } from '@/styles/variables'

interface Props {
  item: any //temp
}

export default function CardAiComment(props: Props) {

  return (
    <Card>
      <div className={styles.container}>
        <SparksSvg color={colors.green} />
        <div className={styles.text}>
          {props.item.aiComment}
        </div>
      </div>
    </Card>
  )
}
