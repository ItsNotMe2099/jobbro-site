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
  const skills =  (job.skills?.map(i => i?.title ?? i) ?? [])
  const keywords = (job.keywords?.map(i => i?.title ?? i) ?? [])
  const benefits = (job.benefits?.map(i => i?.title ?? i) ?? [])


  return (
      <Card title={job.name}>
          <>
          {(job.salaryMin || job.salaryMax) && <div className={styles.salary}>
            {VacancyUtils.formatSalary(job)}
          </div>}
          </>

        <div className={styles.fields}>
          <div className={styles.inputs}>
            <div className={styles.input}>
              <div className={styles.inputLabel}>{t('job_preview_requirements_experience')}</div>
              <div className={styles.inputValue}>3 — 6 years</div>
            </div>
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
          {job.requirements && <div className={styles.field}>
            <div className={styles.title}>
              {t('job_preview_requirements')}
            </div>

            <HtmlText>{job.requirements}</HtmlText>
          </div>}

          {(job.benefitsDescription?.visible || job.benefits.length > 0) && <div className={styles.field}>
            <div className={styles.title}>
              {t('job_preview_benefits')}
            </div>

            {job.benefitsDescription?.visible && <HtmlText>{job.benefitsDescription.description}</HtmlText>}
            {benefits.length > 0 && <ChipList>
              {benefits.map(i => <Chip>{i}</Chip>)}
            </ChipList>}

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
              {'Hiring stages'}
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

          {job.keywords && job.keywords.length > 0 && <div className={styles.field}>
            <div className={styles.title}>
              {'Keywords'}
            </div>
            {job.keywords.length > 0 && <ChipList>
              {keywords.map(i => <Chip>{i}</Chip>)}
            </ChipList>}
          </div>

          }
        </div>
      </Card>
  )
}
