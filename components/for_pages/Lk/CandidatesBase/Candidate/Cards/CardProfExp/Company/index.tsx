import Image from 'next/image'
import styles from './index.module.scss'
import PersonSvg from '@/components/svg/PersonSvg'
import { colors } from '@/styles/variables'
import InternetSvg from '@/components/svg/InternetSvg'
import Link from 'next/link'
import NewsSvg from '@/components/svg/NewsSvg'
import CheckBoxSvg from '@/components/svg/CheckBoxSvg'

interface Props {
  company: any
}

export default function Company(props: Props) {

  return (
    <div className={styles.root}>
      <div className={styles.avatar}>
        {props.company.confirmed && <div className={styles.confirmed}><CheckBoxSvg className={styles.check} /></div>}
        {props.company.img ? <Image src={props.company.img} alt='' fill /> : props.company.name.slice(0, 2)}
      </div>
      <div className={styles.right}>
        <div className={styles.name}>
          {props.company.name}
        </div>
        <div className={styles.info}>
          <div className={styles.specs}>
            {props.company.specs}
          </div>
          <div className={styles.employees}>
            <PersonSvg color={colors.textSecondary} />
            <div className={styles.quantity}>{props.company.employees}</div>
          </div>
        </div>
        <div className={styles.links}>
          <div className={styles.item}>
            <InternetSvg color={colors.green} />
            <Link href={props.company.link}>Go to Website</Link>
          </div>
          <div className={styles.item}>
            <NewsSvg color={colors.green} />
            <Link href={props.company.news}>News</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
