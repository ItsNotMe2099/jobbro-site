import styles from './index.module.scss'
import { colors } from '@/styles/variables'
import classNames from 'classnames'
import BookmarkSvg from '@/components/svg/BookmarkSvg'
import { useState } from 'react'
import Link from 'next/link'
import { Routes } from '@/types/routes'
import UserUtils from '@/utils/UserUtils'
import VacancyUtils from '@/utils/VacancyUtils'
import AvatarCircular from '@/components/ui/AvatarCircular'
import {ICV} from '@/data/interfaces/ICV'

interface Props {
  cv: ICV
  className?: string
  view: 'row' | 'card'
  onAddBookmark: (bookmark: boolean) => void
}

export default function CandidateCard(props: Props) {

  const [bookmark, setBookmark] = useState<boolean>(false)
const cv = props.cv
  const ai = {
    percent: null,
    description: null
  }
  const handleBookmark = () => {
    const newState = true
    setBookmark(newState)
    props.onAddBookmark(newState)
  }

  return (
    <div className={classNames(styles.root, props.className, { [styles.row]: props.view === 'row' })}>
      <BookmarkSvg onClick={() => bookmark ? null : handleBookmark()} className={styles.bookmark}
        color={colors.green} />
      <Link href={Routes.lkCandidate(cv.id)} className={styles.container}>
        <div className={styles.top}>
          <AvatarCircular file={cv.image ?? cv?.profile?.image}/>
          <div className={styles.right}>
            <div className={styles.name}>
              {UserUtils.getName(cv)}
            </div>
            <div className={styles.forRow}>
              {props.view === 'row' && <div className={styles.middle}>
                {cv.position}
              </div>}
              <div className={styles.salary}>
                {VacancyUtils.formatSalary(cv)}
              </div>
            </div>
          </div>
        </div>
        {props.view !== 'row' && <div className={styles.middle}>
          {cv.position}
        </div>}
        <div className={styles.bottom}>
          {props.view === 'row' && ai.percent != null && <div className={styles.comment}>
            <div className={styles.percent}>
              {ai.percent}
            </div>
            <div className={styles.text}>{ai.description}</div>
          </div>}
          <div className={styles.status}>
            Invited
          </div>
        </div>
      </Link>
      {props.view !== 'row' && ai.percent != null && <div className={styles.comment}>
        <div className={styles.percent}>
          {ai.percent}
        </div>
        <div className={styles.text}>{ai.description}</div>
      </div>}
    </div>
  )
}
