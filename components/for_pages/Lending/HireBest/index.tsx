import { colors } from '@/styles/variables'
import styles from './index.module.scss'
import Image from 'next/image'
import LightSvg from '@/components/svg/LightSvg'
import ArrowChevronRightSvg from '@/components/svg/ArrowChevronRightSvg'
import Button from '@/components/ui/Button'
import { useResize } from '@/components/hooks/useResize'
import useTranslation from 'next-translate/useTranslation'

interface Props {

}

export default function HireBest(props: Props) {
  const { t } = useTranslation()
  const { isPhoneWidth } = useResize()

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.left}>
          {!isPhoneWidth && <LightSvg className={styles.light} color={colors.green} />}
          <div className={styles.top}>
            {t('main_lending_hire_best_title')}
          </div>
          <div className={styles.middle}>
            {t('main_lending_hire_best_desc')}
          </div>
          <Button href={'#application'}  className={styles.btn} color='green' styleType='large'>
            {t('main_lending_hire_best_hiring')} <ArrowChevronRightSvg color={colors.white} />
          </Button>
        </div>
        <Image className={styles.img}
          src={isPhoneWidth ? '/lending/hire-best-mobile.png' : '/lending/hire-best-desk.png'} alt='' fill />
      </div>
    </div>
  )
}
