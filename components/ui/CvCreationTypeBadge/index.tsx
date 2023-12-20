import styles from './index.module.scss'
import classNames from 'classnames'
import { colors } from 'styles/variables'
import FileSvg from '@/components/svg/FileSvg'
import VerificationSvg from '@/components/svg/VerificationSvg'

interface Props {
  isFile: boolean
}

export default function CvCreationTypeBadge(props: Props) {

  const icon = props.isFile ? <FileSvg color={colors.white} className={styles.icon} /> : <VerificationSvg color={colors.green} className={styles.icon} />
  return (
    <div className={classNames([styles.root], {[styles.file]: props.isFile, [styles.check]: !props.isFile})} >
      {icon}
    </div>
  )
}

