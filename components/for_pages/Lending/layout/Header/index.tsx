import ArrowChevronRightSvg from '@/components/svg/ArrowChevronRightSvg'
import Button from '@/components/ui/Button'
import { colors } from '@/styles/variables'
import styles from './index.module.scss'
import Link from 'next/link'

interface Props {

}

export default function Header(props: Props) {

  return (
    <div className={styles.root}>
      <div className={styles.logo}>
        Jobbro
      </div>
      <div className={styles.right}>
        <div className={styles.links}>
          <Link className={styles.link} href={'#'}>
            Contacts
          </Link>
          <Link className={styles.link} href={'#'}>
            FAQ
          </Link>
        </div>
        <Button className={styles.btn} color='transparent' styleType='small'>
          Try demo <ArrowChevronRightSvg color={colors.white} />
        </Button>
      </div>
    </div>
  )
}
