import styles from './index.module.scss'
import { colors } from '@/styles/variables'
import classNames from 'classnames'
import Image from 'next/image'
import DotSvg from '@/components/svg/DotSvg'
import SparksSvg from '@/components/svg/SparksSvg'
import BookmarkSvg from '@/components/svg/BookmarkSvg'
import { useState } from 'react'

interface Props {
  item: any //temp
  className?: string
  view: 'row' | 'card'
  onAddBookmark: (bookmark: boolean) => void
}

export default function CandidateCard(props: Props) {

  const [bookmark, setBookmark] = useState<boolean>(false)

  const handleBookmark = () => {
    const newState = true
    setBookmark(newState)
    props.onAddBookmark(newState)
  }

  return (
    <div className={classNames(styles.root, props.className, { [styles.row]: props.view === 'row' })}>
      <BookmarkSvg onClick={() => bookmark ? null : handleBookmark()} className={styles.bookmark}
        color={(props.item.added || bookmark) ? colors.green : colors.white} />
      <div className={styles.container}>
        <div className={styles.top}>
          <Image className={styles.avatar} src={props.item.avatar} alt='' fill />
          <div className={styles.right}>
            <div className={styles.name}>
              {props.item.firstName} {props.item.lastName}
            </div>
            <div className={styles.forRow}>
              {props.view === 'row' && <div className={styles.middle}>
                {props.item.position}
              </div>}
              <div className={styles.salary}>
                {props.item.salary}
              </div>
            </div>
          </div>
        </div>
        {props.view !== 'row' && <div className={styles.middle}>
          {props.item.position}
        </div>}
        <div className={styles.bottom}>
          {props.view === 'row' && <div className={styles.comment}>
            <div className={styles.percent}>
              {props.item.percent}
            </div>
            <div className={styles.text}>{props.item.aiComment}</div>
          </div>}
          <div className={styles.status}>
            {props.item.status}
          </div>
        </div>
      </div>
      {props.view !== 'row' && <div className={styles.comment}>
        <div className={styles.percent}>
          {props.item.percent}
        </div>
        <div className={styles.text}>{props.item.aiComment}</div>
      </div>}
    </div>
  )
}
