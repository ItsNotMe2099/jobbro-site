import TwitterSvg from '@/components/svg/TwitterSvg'
import styles from './index.module.scss'
import FbSvg from '@/components/svg/FbSvg'
import InstagramSvg from '@/components/svg/InstagramSvg'
import Link from 'next/link'
import { CONTACTS } from '@/types/types'

interface Props {

}

export default function Footer(props: Props) {

  return (
    <div className={styles.root}>
      <Link href={CONTACTS.twitter}>
        <TwitterSvg className={styles.icon} />
      </Link>
      <Link href={CONTACTS.facebook}>
        <FbSvg className={styles.icon} />
      </Link>
      <Link href={CONTACTS.instagram}>
        <InstagramSvg className={styles.icon} />
      </Link>
    </div>
  )
}
