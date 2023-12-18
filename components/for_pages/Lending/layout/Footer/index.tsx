import { colors } from '@/styles/variables'
import { CONTACTS } from '@/types/types'
import styles from './index.module.scss'
import Link from 'next/link'
import FbLendingSvg from '@/components/svg/FbLendingSvg'
import InstagramLendingSvg from '@/components/svg/InstagramLendingSvg'
import LinkedInLendingSvg from '@/components/svg/LinkedInLendingSvg'
import TwitterLendingSvg from '@/components/svg/TwitterLendingSvg'
import YoutubeLendingSvg from '@/components/svg/YoutubeLendingSvg'

interface Props {

}

export default function Footer(props: Props) {

  const socials = [
    { icon: <FbLendingSvg color={colors.white} />, link: CONTACTS.facebook },
    { icon: <InstagramLendingSvg color={colors.white} />, link: CONTACTS.instagram },
    { icon: <LinkedInLendingSvg color={colors.white} />, link: CONTACTS.linkedIn },
    { icon: <TwitterLendingSvg color={colors.white} />, link: CONTACTS.twitter },
    { icon: <YoutubeLendingSvg color={colors.white} />, link: CONTACTS.youtube },
  ]

  const columns = [
    { label: 'About us', link: '#' },
    { label: 'Book a demo', link: '#' },
    { label: 'Blog', link: '#' },
    { label: 'Pricing', link: '#' },
    { label: 'Contact', link: '#' },
    { label: 'Features', link: '#' },
    { label: 'Sign In', link: '#' },
    { label: 'Sign Up', link: '#' },
    { label: 'Style Guide', link: '#' },
    { label: 'Changelog', link: '#' },
    { label: 'Licenses', link: '#' },
    { label: 'More Templates', link: '#' },
  ]

  const bottom = [
    { label: 'Privacy Policy', link: 'https://drive.google.com/file/d/1sAVdJWQR94WXVi4-ILKhIyis3QpC4vSK/view?usp=sharing' },
    { label: 'Terms of Service', link: '#' },
    { label: 'Cookies Settings', link: '#' },
  ]

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.logo}>
            Jobbro
          </div>
          <div className={styles.info}>
            <div className={styles.item}>
              <div className={styles.title}>
                Adress
              </div>
              <div className={styles.text} style={{ maxWidth: '303px' }}>
                {CONTACTS.adress}
              </div>
            </div>
            <div className={styles.item}>
              <div className={styles.title}>
                Contact
              </div>
              <div className={styles.text}>
                {CONTACTS.phone}
              </div>
              <div className={styles.text}>
                {CONTACTS.email}
              </div>
            </div>
          </div>
          <div className={styles.socials}>
            {socials.map((i, index) =>
              <Link href={i.link} key={index}>
                {i.icon}
              </Link>
            )}
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.columns}>
            <div className={styles.column}>
              {/*columns.slice(0, 5).map((i, index) =>
                <Link href={i.link} key={index} className={styles.label}>
                  {i.label}
                </Link>
              )*/}
            </div>
            <div className={styles.column}>
              {/*columns.slice(5, 8).map((i, index) =>
                <Link href={i.link} key={index} className={styles.label}>
                  {i.label}
                </Link>
              )*/}
            </div>
            <div className={styles.column}>
              {/*columns.slice(8).map((i, index) =>
                <Link href={i.link} key={index} className={styles.label}>
                  {i.label}
                </Link>
              )*/}
            </div>
          </div>
          <div className={styles.bottom}>
            {bottom.map((i, index) =>
              <a href={i.link} key={index} className={styles.label}>
                {i.label}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
