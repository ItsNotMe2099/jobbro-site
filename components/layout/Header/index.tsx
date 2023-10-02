import Link from 'next/link'
import styles from 'components/layout/Header/index.module.scss'
import ChatSvg from '@/components/svg/ChatSvg'
import { colors } from '@/styles/variables'
import BellSvg from '@/components/svg/BellSvg'
import AccSvg from '@/components/svg/AccSvg'

interface Props {

}

export default function Header(props: Props) {

  const menu = [
    { label: 'Products', link: '#' },
    { label: 'Resources', link: '#' },
    { label: 'Pricing', link: '#' },
  ]

  return (
    <div className={styles.root}>
      <div className={styles.logo}>
        Jobbro
      </div>
      <div className={styles.menu}>
        {menu.map((i, index) =>
          <Link href={i.link} key={index} className={styles.item}>
            {i.label}
          </Link>
        )}
      </div>
      <div className={styles.controls}>
        <ChatSvg color={colors.white} />
        <BellSvg color={colors.white} />
        <AccSvg color={colors.white} />
      </div>
    </div>
  )
}
