import styles from './index.module.scss'
import { colors } from '@/styles/variables'
import { Routes } from '@/types/routes'
import Link from 'next/link'
import DocSvg from '@/components/svg/DocSvg'
import SparksSvg from '@/components/svg/SparksSvg'
import classNames from 'classnames'

interface Props {
  className?: string
}

export default function MenuOptions(props: Props) {

  return (
    <div className={classNames(styles.options, props.className)}>
      <Link href={Routes.lkJobsCreateJobManually} className={styles.option}>
        <DocSvg color={colors.green} />
        <div className={styles.desc}>
          <div className={styles.main}>
            Create manually
          </div>
          <div className={styles.text}>
            Filling out the vacancy form
          </div>
        </div>
      </Link>
      <Link href={'#'} className={styles.option}>
        <SparksSvg color={colors.green} />
        <div className={styles.desc}>
          <div className={styles.main}>
            Create with AI
          </div>
          <div className={styles.text}>
            Fast automatic generation
          </div>
        </div>
      </Link>
    </div>
  )
}
