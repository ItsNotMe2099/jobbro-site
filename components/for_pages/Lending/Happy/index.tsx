import HappyBckgrndSvg from '@/components/svg/HappyBckgrndSvg'
import styles from './index.module.scss'
import Image from 'next/image'
import EllipseSvg from '@/components/svg/EllipseSvg'
import { colors } from '@/styles/variables'

interface Props {

}

export default function Happy(props: Props) {

  const items = [
    { val: '90%', desc: <>...accuracy of candidate<br /> selection without HR<br /> manager&apos;s involvement</> },
    {
      val: '30 hours', desc: <>...of HR managers&apos; efficiency<br /> due to AI assistance
      </>
    },
    {
      val: '5/5', desc: <> ...usability index</>
    }
  ]

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <HappyBckgrndSvg className={styles.back} />
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
