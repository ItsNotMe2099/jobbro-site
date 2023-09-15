import TwitterSvg from '@/components/svg/TwitterSvg'
import styles from './index.module.scss'
import { colors } from '@/styles/variables'
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
        <TwitterSvg color={colors.textSecondary} />
      </Link>
      <Link href={CONTACTS.facebook}>
        <FbSvg color={colors.textSecondary} />
      </Link>
      <Link href={CONTACTS.instagram}>
        <InstagramSvg color={colors.textSecondary} />
      </Link>
    </div>
  )
}
