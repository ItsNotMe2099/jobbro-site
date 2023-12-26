import HappyBckgrndSvg from '@/components/svg/HappyBckgrndSvg'
import styles from './index.module.scss'
import Image from 'next/image'
import EllipseSvg from '@/components/svg/EllipseSvg'
import { colors } from '@/styles/variables'
import { useResize } from '@/components/hooks/useResize'
import HappyBckgrndMobileSvg from '@/components/svg/HappyBckgrndMobileSvg'
import useTranslation from 'next-translate/useTranslation'

interface Props {

}

export default function Happy(props: Props) {
  const { t } = useTranslation()
  const items = [
    { val: '90%', desc: t('main_lending_stat_accuracy') },
    {
      val: '30 hours', desc: t('main_lending_stat_efficiency')
    },
    {
      val: '5/5', desc: t('main_lending_stat_usability')
    }
  ]

  const { isPhoneWidth } = useResize()

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        {isPhoneWidth ? <HappyBckgrndMobileSvg className={styles.back} /> : <HappyBckgrndSvg className={styles.back} />}
        <Image className={styles.img} src={'/lending/happy.png'} alt='' fill />
        <div className={styles.box}>
          <div className={styles.top}>
            <div className={styles.ellipsis}>
              <EllipseSvg color={colors.white} />
              <EllipseSvg color={colors.white} />
              <EllipseSvg color={colors.white} />
            </div>
          </div>
          <div className={styles.separator} />
          <div className={styles.bottom}>
            {items.map((i, index) =>
              <div className={styles.item} key={index}>
                <div className={styles.val}>
                  {i.val}
                </div>
                <div className={styles.desc}>
                  {i.desc}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
