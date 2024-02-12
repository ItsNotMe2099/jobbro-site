import styles from './index.module.scss'

import {IVacancy} from '@/data/interfaces/IVacancy'
import Card from '@/components/for_pages/Common/Card'
import VacancyUtils from '@/utils/VacancyUtils'
import HtmlText from '@/components/ui/HtmlText'
import ChipList from '@/components/ui/ChipList'
import Chip from '@/components/ui/Chip'
import useTranslation from 'next-translate/useTranslation'
import Dictionary from '@/utils/Dictionary'

interface Props {
  job: IVacancy
}

export default function JobDetailsPreview(props: Props) {
  const {job} = props
  const { t } = useTranslation()
  const skills =  job.skills?.length > 0 ? (job.skills?.map(i => i?.title ?? i) ?? []) : job.skillsTitles ?? []
  const benefits =  job.benefits?.length > 0 ?  (job.benefits?.map(i => i?.title ?? i) ?? []) : job.benefitsTitles ?? []


  return (
      <Card title={job.name}>
          <>
          {(job.salaryMin || job.salaryMax) && <div className={styles.salary}>
            {VacancyUtils.formatSalary(job)}
          </div>}
          </>

        <div className={styles.fields}>
          <div className={styles.inputs}>
            {!!job.experienceDuration && <div className={styles.input}>
              <div className={styles.inputLabel}>{t('job_preview_required_experience')}</div>
              <div className={styles.inputValue}>{Dictionary.getExperienceDurationName(job.experienceDuration, t)}</div>
            </div>}
            {!!job.employment && <div className={styles.input}>
              <div className={styles.inputLabel}>{t('job_preview_employment_type')}</div>
              <div className={styles.inputValue}>{Dictionary.getEmploymentName(job.employment, t)}</div>
            </div>}
            {!!job.workplace && <div className={styles.input}>
              <div className={styles.inputLabel}>{t('job_preview_workplace')}</div>
              <div className={styles.inputValue}>{Dictionary.getWorkplaceName(job.workplace, t)}</div>
            </div>}
          </div>
          {job.intro.visible && <div className={styles.intro}>
            <HtmlText>{job.intro.description}</HtmlText>
          </div>}
          {job.tasks && <div className={styles.field}>
            <div className={styles.title}>
              {t('job_preview_tasks')}
            </div>
            <HtmlText>{job.tasks}</HtmlText>
          </div>}
          {(job.requirements || job.skills.length > 0) && <div className={styles.field}>
            <div className={styles.title}>
              {t('job_preview_requirements')}
            </div>

            {job.requirements && <HtmlText>{job.requirements}</HtmlText>}
            {skills.length > 0 && <ChipList>
              {skills.map(i => <Chip>{i}</Chip>)}
            </ChipList>}
          </div>}

          {(job.benefitsDescription?.visible || benefits.length > 0) && <div className={styles.field}>
            <div className={styles.title}>
              {t('job_preview_benefits')}
            </div>

            {job.benefitsDescription?.visible && <HtmlText>{job.benefitsDescription.description}</HtmlText>}
            {benefits.length > 0 && <ChipList>
              {benefits.map(i => <Chip>{i}</Chip>)}
            </ChipList>}

          </div>}

          {job.contactPerson && job.contactPerson.visible && <div className={styles.field}>
            <div className={styles.title}>
              {'Contact person'}
            </div>
            <HtmlText>{job.contactPerson.name||''}</HtmlText>
          </div>}
          {job.hiringStagesDescriptions && job.hiringStagesDescriptions.length > 0 && <div className={styles.field}>
            <div className={styles.title}>
              {t('job_preview_hiring_stages')}
            </div>
            <div className={styles.stages}>
              {job.hiringStagesDescriptions.map(i => <div className={styles.stage}>
                <div className={styles.hiringTitle}>
                  {i.title}
                </div>
                <p className={styles.hiringDescription}>{i.description}</p>
              </div>)}
            </div>
          </div>}
        </div>
      </Card>
  )
}
