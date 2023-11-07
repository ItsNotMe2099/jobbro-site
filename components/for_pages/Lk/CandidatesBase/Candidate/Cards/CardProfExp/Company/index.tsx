import styles from './index.module.scss'
import AvatarCircular from '@/components/ui/AvatarCircular'

interface Props {
  companyName: string
}

export default function Company(props: Props) {

  return (
    <div className={styles.root}>
      <div className={styles.avatar}>
        {/* <div className={styles.confirmed}><CheckBoxSvg className={styles.check} /></div>*/}
        <AvatarCircular initials={props.companyName.slice(0, 2) ?? null}/>
         </div>
      <div className={styles.right}>
        <div className={styles.name}>
          {props.companyName}
        </div>
        {/*<div className={styles.info}>
          <div className={styles.specs}>
            {props.company.specs}
          </div>
          <div className={styles.employees}>
            <PersonSvg color={colors.textSecondary} />
            <div className={styles.quantity}>{props.company.employees}</div>
          </div>
        </div>*/}
        {/*<div className={styles.links}>
          <div className={styles.item}>
            <InternetSvg color={colors.green} />
            <Link href={props.company.link}>Go to Website</Link>
          </div>
          <div className={styles.item}>
            <NewsSvg color={colors.green} />
            <Link href={props.company.news}>News</Link>
          </div>
        </div>*/}
      </div>
    </div>
  )
}
