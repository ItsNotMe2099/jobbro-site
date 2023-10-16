import Card from '@/components/for_pages/Common/Card'
import styles from './index.module.scss'
import Period from './Period'

interface Props {
  item: any //temp
  className?: string
}

export default function CardProfExp(props: Props) {

  return (
    <Card className={props.className} title={`Professional Experience ${props.item.experience}`}>
      <div className={styles.container}>
        {props.item.periods.map((i: any, index: number) =>
          <>
            <Period item={props.item} period={i} key={index} />
            {index + 1 !== props.item.periods.length && <div className={styles.separator} />}
          </>
        )}
      </div>
    </Card>
  )
}
