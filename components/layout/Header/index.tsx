import Link from 'next/link'
import styles from 'components/layout/Header/index.module.scss'
import ChatSvg from '@/components/svg/ChatSvg'
import { colors } from '@/styles/variables'
import BellSvg from '@/components/svg/BellSvg'
import AccSvg from '@/components/svg/AccSvg'
import IconButton from '@/components/ui/IconButton'
import DropdownMenu from '@/components/ui/DropdownMenu'

interface Props {

}

export default function Header(props: Props) {

  const menu = [
    { label: 'Products', link: '#' },
    { label: 'Resources', link: '#' },
    { label: 'Pricing', link: '#' },
  ]
    const accountOptions = [

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
        <IconButton bgColor='green'>
          <ChatSvg color={colors.white} />
        </IconButton>
        <IconButton bgColor='green'>
          <BellSvg color={colors.white} />
        </IconButton>
        <IconButton bgColor='green'>
          <AccSvg color={colors.white} />
          <DropdownMenu options={accountOptions}/>
        </IconButton>
      </div>
    </div>
  )
}
