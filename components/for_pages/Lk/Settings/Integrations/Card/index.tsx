import Image from 'next/image'
import styles from './index.module.scss'
import classNames from 'classnames'

interface Props {
  item: any
  profile?: boolean
  className?: string
}

export default function IntegrationCard({ item, profile, className }: Props) {

  return (
    <div className={classNames(styles.root, className)}>
      <div className={styles.wrapper}>
        <div className={styles.top}>
          <Image src={item.img} alt='' fill />
          <div className={styles.label}>
            {item.label}
          </div>
        </div>
        <div className={styles.middle}>
          {item.desc}
        </div>
        <div className={styles.bottom}>
          {profile ? 'Add profile' : 'Connect'}
        </div>
      </div>
    </div>
  )
}
