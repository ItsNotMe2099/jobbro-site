import GearSvg from '@/components/svg/GearSvg'
import Item from './Item'
import styles from './index.module.scss'
import SortSvg from '@/components/svg/SortSvg'
import DataBaseSvg from '@/components/svg/DataBaseSvg'
import ClickSvg from '@/components/svg/ClickSvg'

interface Props {

}

export default function EmpoweredAI(props: Props) {

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.top}>
            <div className={styles.recruitment}>
              Recruitment fully empowered<br />
              with AI
            </div>
            <div className={styles.everything}>
              Everything you need to keep your<br />
              hire departmentrunning efficiently in one place
              <div className={styles.line} />
            </div>
          </div>
          <div className={styles.middle}>
            <Item icon={<GearSvg className={styles.icon} />} text={<>Automatically create<br />job posts →</>} />
            <Item icon={<SortSvg className={styles.icon} />} text={<>The system will sort <br />applications to help you →</>} />
            <Item icon={<DataBaseSvg className={styles.icon} />} text={<>Easy access to your<br />candidate database →</>} />
            <Item icon={<ClickSvg className={styles.icon} />} text={<>Poste your jobs on each<br />main platform in one click →</>} />
          </div>
          <div className={styles.bottom}>
            <div className={styles.inner}>
              <div className={styles.percent}>
                300<span>%</span>
              </div>
              <div className={styles.hr}>
                HR<br />
                effectiveness
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
