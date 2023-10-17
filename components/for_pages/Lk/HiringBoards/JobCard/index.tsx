import Card from '@/components/for_pages/Common/Card'
import styles from './index.module.scss'
import Image from 'next/image'

interface Props {
  item: any
}

export default function JobCard(props: Props) {

  const candidates = [
    { avatar: '/photos/photo1.png', status: 'pre-interview' },
    { avatar: '/photos/photo2.png', status: 'pre-interview' },
    { avatar: '/photos/photo3.png', status: 'pre-interview' },
    { avatar: '/photos/photo1.png', status: 'interview' },
    { avatar: '/photos/photo2.png', status: 'awaiting-response' },
    { avatar: '/photos/photo1.png', status: 'offer' },
    { avatar: '/photos/photo2.png', status: 'offer' },
  ]

  return (
    <Card title={props.item.name}>
      <div className={styles.stages}>
        <div className={styles.stage}>
          <div className={styles.title}>
            Pre interview
          </div>
          <div className={styles.photos}>
            {candidates.filter(i => i.status === 'pre-interview').map((i, index) =>
              <Image className={styles.avatar} src={i.avatar} alt='' fill key={index} />
            )}
          </div>
        </div>
        <div className={styles.stage}>
          <div className={styles.title}>
            Interview
          </div>
          <div className={styles.photos}>
            {candidates.filter(i => i.status === 'interview').map((i, index) =>
              <Image className={styles.avatar} src={i.avatar} alt='' fill key={index} />
            )}
          </div>
        </div>
        <div className={styles.stage}>
          <div className={styles.title}>
            Awaiting Response
          </div>
          <div className={styles.photos}>
            {candidates.filter(i => i.status === 'awaiting-response').map((i, index) =>
              <Image className={styles.avatar} src={i.avatar} alt='' fill key={index} />
            )}
          </div>
        </div>
        <div className={styles.stage}>
          <div className={styles.title}>
            Offer
          </div>
          <div className={styles.photos}>
            {candidates.filter(i => i.status === 'offer').map((i, index) =>
              <Image className={styles.avatar} src={i.avatar} alt='' fill key={index} />
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}
