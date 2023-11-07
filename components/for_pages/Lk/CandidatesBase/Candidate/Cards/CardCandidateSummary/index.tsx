import Card from '@/components/for_pages/Common/Card'
import styles from './index.module.scss'
import {ICV} from '@/data/interfaces/ICV'
import HtmlText from '@/components/ui/HtmlText'
import Formatter from '@/utils/formatter'
import ChipList from '@/components/ui/ChipList'
import Chip from '@/components/ui/Chip'

interface Props {
  cv: ICV
  className?: string
}

export default function CardCandidateSummary(props: Props) {
  const {cv} = props
  return (
    <Card className={props.className} title={'About me'}>
      <div className={styles.container}>
        {cv.about?.visible && <div className={styles.about}>
         <HtmlText>{cv.about.description}</HtmlText>
        </div>}
        {cv.educationInfo?.length > 0 && <div className={styles.section}>
          <div className={styles.title}>
            Education
          </div>
          <div className={styles.about}>
            {cv.educationInfo.map((i) => <div>{[i.institution, i.speciality, Formatter.formatRangeMonthYear(i)].filter(i => !!i).join(', ')}</div>)}
          </div>
        </div>}
        {cv.skills.length >0 && <div className={styles.section}>
          <div className={styles.title}>
            Skills
          </div>
          <ChipList>
            {cv.skills.map((i) =>
              <Chip>{i.title}</Chip>
            )}
          </ChipList>
        </div>}
        {cv.languageKnowledges.length > 0 && <div className={styles.section}>
          <div className={styles.title}>
            Languages
          </div>
          <ChipList>
            {cv.languageKnowledges.map((i) =>
              <Chip>{[i.language, i.level].filter(i => !!i).join(' - ')}</Chip>
            )}
          </ChipList>

        </div>}
      </div>
    </Card>
  )
}
