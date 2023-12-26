import Card from '@/components/for_pages/Common/Card'
import styles from './index.module.scss'
import Period from './Period'
import {ICV} from '@/data/interfaces/ICV'
import VacancyUtils from '@/utils/VacancyUtils'
import useTranslation from 'next-translate/useTranslation'

interface Props {
  cv: ICV
  className?: string
}

export default function CardProfExp(props: Props) {
  const { t } = useTranslation()
  return (
    <Card className={props.className} title={t('cv_preview_professional_exprience', {duration: VacancyUtils.getTotalExperienceDuration(props.cv.experienceInfo)})}>
      <div className={styles.container}>
        {props.cv.experienceInfo.map((i, index) =>
          <>
            <Period experienceItem={i}/>
            {index + 1 !== props.cv.experienceInfo.length && <div className={styles.separator} />}
          </>
        )}
      </div>
    </Card>
  )
}
