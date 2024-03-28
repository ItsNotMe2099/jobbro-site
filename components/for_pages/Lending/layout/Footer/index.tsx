import { colors } from '@/styles/variables'
import { CONTACTS } from '@/types/types'
import styles from './index.module.scss'
import Link from 'next/link'
import FbLendingSvg from '@/components/svg/FbLendingSvg'
import InstagramLendingSvg from '@/components/svg/InstagramLendingSvg'
import LinkedInLendingSvg from '@/components/svg/LinkedInLendingSvg'
import TwitterLendingSvg from '@/components/svg/TwitterLendingSvg'
import YoutubeLendingSvg from '@/components/svg/YoutubeLendingSvg'
import useTranslation from 'next-translate/useTranslation'
import LogoSvg from '@/components/svg/LogoSvg'

interface Props {

}

export default function Footer(props: Props) {
  const { t } = useTranslation()
  const socials = [
    { icon: <FbLendingSvg color={colors.white} />, link: CONTACTS.facebook },
    { icon: <InstagramLendingSvg color={colors.white} />, link: CONTACTS.instagram },
    { icon: <LinkedInLendingSvg color={colors.white} />, link: CONTACTS.linkedIn },
    { icon: <TwitterLendingSvg color={colors.white} />, link: CONTACTS.twitter },
    { icon: <YoutubeLendingSvg color={colors.white} />, link: CONTACTS.youtube },
  ]

  const columns = [
    { label: t('main_lending_footer_menu_about'), link: '#' },
    { label: t('main_lending_footer_menu_book_demo'), link: '#' },
    { label: t('main_lending_footer_menu_blog'), link: '#' },
    { label: t('main_lending_footer_menu_pricing'), link: '#' },
    { label: t('main_lending_footer_menu_contact'), link: '#' },
    { label: t('main_lending_footer_menu_features'), link: '#' },
    { label: t('main_lending_footer_menu_sign_in'), link: '#' },
    { label: t('main_lending_footer_menu_sign_up'), link: '#' },
    { label: t('main_lending_footer_menu_style_guide'), link: '#' },
    { label: t('main_lending_footer_menu_changelog'), link: '#' },
    { label: t('main_lending_footer_menu_licenses'), link: '#' },
    { label: t('main_lending_footer_menu_more_templates'), link: '#' },
  ]

  const bottom = [
    { label: t('main_lending_footer_link_privacy_policy'), link: 'https://drive.google.com/file/d/1sAVdJWQR94WXVi4-ILKhIyis3QpC4vSK/view?usp=sharing' },
    { label: t('main_lending_footer_link_terms'), link: '#' },
    { label: t('main_lending_footer_link_cookies'), link: '#' },
  ]

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.left}>
          <LogoSvg/>
          <div className={styles.info}>
            <div className={styles.item}>
              <div className={styles.title}>
                {t('main_lending_footer_address')}
              </div>
              <div className={styles.text} style={{ maxWidth: '303px' }}>
                {CONTACTS.adress}
              </div>
            </div>
            <div className={styles.item}>
              <div className={styles.title}>
                {t('main_lending_footer_contact')}
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
