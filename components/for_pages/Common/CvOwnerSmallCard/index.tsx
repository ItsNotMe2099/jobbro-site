import styles from './index.module.scss'
import {ICV} from '@/data/interfaces/ICV'
import Formatter from '@/utils/formatter'
import Checkbox from '@/components/ui/Checkbox'
import usePressAndHover from '@/components/hooks/usePressAndHover'

interface Props {
  cv: ICV
  checked: boolean
  onClick: () => void
}

export const CvOwnerSmallCard = ({ cv, checked, onClick }: Props) => {
  const [ref, press, hover] = usePressAndHover()


  return (
    <div ref={ref} className={styles.root} onClick={onClick}>
      <div className={styles.left}>
        <Checkbox checked={checked} hover={hover}/>
      </div>
      <div className={styles.right}>
        <div className={styles.title}>{cv.title}</div>
        <div className={styles.time}>{Formatter.formatDateTime(cv.updatedAt)}</div>
      </div>
    </div>
  )
}
