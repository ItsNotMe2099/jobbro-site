import Card from '@/components/for_pages/Common/Card'
import styles from './index.module.scss'

interface Props {
  item: any //temp
  className?: string
}

export default function CardProfExp(props: Props) {

  return (
    <Card className={props.className} title={'Professional Experience 6 years 3 month'}>
      <div className={styles.container}>
        
      </div>
    </Card>
  )
}
