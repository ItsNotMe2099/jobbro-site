import styles from './index.module.scss'
import { colors } from '@/styles/variables'
import classNames from 'classnames'
import Image from 'next/image'
import DotSvg from '@/components/svg/DotSvg'
import SparksSvg from '@/components/svg/SparksSvg'

interface Props {
  item: any //temp
  className?: string
  view: 'row' | 'card'
}

export default function CandidateCard(props: Props) {

  return (
    <div className={classNames(styles.root, props.className)}>
      <div className={styles.container}>
        <div className={styles.top}>
          <Image className={styles.avatar} src={props.item.avatar} alt='' fill />
          <div className={styles.right}>
            <div className={styles.name}>
              {props.item.firstName} {props.item.lastName}
            </div>
            <div className={styles.salary}>
              {props.item.salary}
            </div>
          </div>
        </div>
        <div className={styles.middle}>
          {props.item.position}
        </div>
        <div className={styles.bottom}>
          <div className={styles.percent}>
            {props.item.percent}
          </div>
          <DotSvg color={colors.green} />
          <div className={styles.status}>
            {props.item.status}
          </div>
        </div>
      </div>
      <div className={styles.comment}>
        <SparksSvg color={colors.green} />
        <div className={styles.text}>{props.item.aiComment}</div>
      </div>
    </div>
  )
}
