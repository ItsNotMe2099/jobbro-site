import { colors } from '@/styles/variables'
import styles from './index.module.scss'
import Image from 'next/image'
import LightSvg from '@/components/svg/LightSvg'
import ArrowChevronRightSvg from '@/components/svg/ArrowChevronRightSvg'
import Button from '@/components/ui/Button'

interface Props {

}

export default function HireBest(props: Props) {

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.left}>
            <LightSvg className={styles.light} color={colors.green} />
          <div className={styles.top}>
            Hire only<br />
            the best
          </div>
          <div className={styles.middle}>
            A recruitment platform that works side by<br /> side with your team
          </div>
          <Button className={styles.btn} color='green' styleType='large'>
            HIRING <ArrowChevronRightSvg color={colors.white} />
          </Button>
        </div>
        <Image className={styles.img} src={'/lending/hire_best.png'} alt='' fill />
      </div>
    </div>
  )
}
