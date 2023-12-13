import styles from './index.module.scss'
import Card from '@/components/for_pages/Common/Card'
import Image from 'next/image'
import AccSmallSvg from '@/components/svg/AccSmallSvg'


interface Props {
  data: any[]
}

export default function HotMarkers(props: Props) {

  return (
    <Card title={'Hot markers'} className={styles.root}>
      <div className={styles.total}>
        <Image className={styles.img} src={'/img/icons/flame.png'} alt='' fill />
        <div className={styles.number}>Total: {props.data.length}</div>
      </div>
      <div className={styles.separator} />
      <div className={styles.wrapper}>
        {props.data.slice(0, 5).map((i, index) =>
          <div className={styles.item} key={index}>
            <div className={styles.left}>
              <div className={styles.label}>
                {i.label}
              </div>
              <div className={styles.market}>
                {i.market}
              </div>
            </div>
            <div className={styles.right}>
              <div className={styles.top}>
                <div className={styles.number}>
                  {i.candidates}
                </div>
                <AccSmallSvg color='#939393' />
              </div>
              <div className={styles.market}>{i.date}</div>
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}
