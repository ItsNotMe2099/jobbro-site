import Card from '@/components/for_pages/Common/Card'
import styles from './index.module.scss'
import {ICV} from '@/data/interfaces/ICV'
import HtmlText from '@/components/ui/HtmlText'
import Formatter from '@/utils/formatter'
import ChipList from '@/components/ui/ChipList'
import Chip from '@/components/ui/Chip'
import useTranslation from 'next-translate/useTranslation'
import LanguageUtils from '@/utils/LanguageUtils'

interface Props {
  cv: ICV
  className?: string
}

export default function CardCandidateSummary(props: Props) {
  const {cv} = props
  const { t } = useTranslation()
  const skills: string[] =  cv.skills?.length > 0 ? (cv.skills?.map(i => i?.title ?? i) ?? []) : cv.skillsTitles ?? []

  return (
    <Card className={props.className} title={t('cv_preview_about_title')}>
      <div className={styles.container}>
        {cv.about?.visible && <div className={styles.about}>
         <HtmlText>{cv.about.description}</HtmlText>
        </div>}
        {cv.educationInfo?.length > 0 && <div className={styles.section}>
          <div className={styles.title}>
            {t('cv_preview_about_education')}

          </div>
          <div className={styles.about}>
            {cv.educationInfo.map((i) => <div>{[i.institution, i.speciality, i.degree, Formatter.formatRangeYear(i.fromYear, i.toYear)].filter(i => !!i).join(', ')}</div>)}
          </div>
        </div>}
        {cv.coursesInfo?.length > 0 && <div className={styles.section}>
          <div className={styles.title}>
            {t('cv_preview_about_courses')}

          </div>
          <div className={styles.about}>
            {cv.coursesInfo.filter(i => !!i.name).map((i) => <div>{i.name}</div>)}
          </div>
        </div>}
        {(skills.length > 0 || (cv.skillsDescription.visible && cv.skillsDescription.description)) && <div className={styles.section}>
          <div className={styles.title}>
            {t('cv_preview_about_skills')}
          </div>
          {cv.skillsDescription.visible && <HtmlText>
          {cv.skillsDescription.description}
          </HtmlText>}
          <ChipList>
            {skills.map((i) =>
              <Chip>{i}</Chip>
            )}
          </ChipList>
        </div>}
        {cv.languageKnowledges.length > 0 && <div className={styles.section}>
          <div className={styles.title}>
            {t('cv_preview_about_languages')}
          </div>
          <ChipList>
            {cv.languageKnowledges.map((i) =>
              <Chip>{[LanguageUtils.getLanguageName(i.language), i.level].filter(i => !!i).join(' - ')}</Chip>
            )}
          </ChipList>

        </div>}
      </div>
    </Card>
  )
}
