import Card from '@/components/for_pages/Common/Card'
import styles from './index.module.scss'
import classNames from 'classnames'

interface Props {
  className?: string
}

export default function CardMatching(props: Props) {

  return (
    <Card className={props.className} title={'Matching'}>
      <div className={styles.container}>
        <div className={styles.item}>
          <div className={styles.percent}>
            80%
          </div>
          <div className={styles.text}>
            Senior Manager of Software Development and Engineering
          </div>
          <div className={styles.send}>
            Send Invite
          </div>
        </div>
        <div className={styles.item}>
          <div className={classNames(styles.percent, styles.orange)}>
            40%
          </div>
          <div className={styles.text}>
            Senior Back-end Development with Python Skills
          </div>
          <div className={styles.send}>
            Send Invite
          </div>
        </div>
      </div>
    </Card>
  )
}
