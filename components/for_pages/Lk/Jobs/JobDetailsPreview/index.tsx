import styles from './index.module.scss'

import {IVacancy} from '@/data/interfaces/IVacancy'
import Card from '@/components/for_pages/Common/Card'
import VacancyUtils from '@/utils/VacancyUtils'
import HtmlText from '@/components/ui/HtmlText'
import ChipList from '@/components/ui/ChipList'
import Chip from '@/components/ui/Chip'


enum TabKey {
  AdDetails = 'adDetails',
  ApplicationForm = 'applicationForm',
  Workflow = 'workflow'
}


interface Props {
  job: IVacancy
}

export default function JobDetailsPreview(props: Props) {
  const {job} = props
  const skills =  (job.skills?.map(i => i?.title ?? i) ?? [])
  const keywords = (job.keywords?.map(i => i?.title ?? i) ?? [])
  const benefits = (job.benefits?.map(i => i?.title ?? i) ?? [])
  return (<div className={styles.root}>
      <Card title={job.name}>
        <>
          {(job.salaryMin || job.salaryMax) && <div className={styles.salary}>
            {VacancyUtils.formatSalary(job)}
          </div>}
          {job.intro.visible && <div className={styles.intro}>
            <HtmlText>{job.intro.description}</HtmlText>
          </div>}
          {job.tasks && <div className={styles.tasks}>
            <div className={styles.title}>
              Tasks
            </div>
            <HtmlText>{job.tasks}</HtmlText>
          </div>}
          {job.requirements && <div className={styles.tasks}>
            <div className={styles.title}>
              Requirements
            </div>

            <HtmlText>{job.requirements}</HtmlText>
          </div>}

          {(job.benefitsDescription?.visible || job.benefits.length > 0) && <div className={styles.tasks}>
            <div className={styles.title}>
              Benefits
            </div>

            {job.benefitsDescription?.visible && <HtmlText>{job.benefitsDescription.description}</HtmlText>}
            {benefits.length > 0 && <ChipList>
              {benefits.map(i => <Chip>{i}</Chip>)}
            </ChipList>}
          </div>}
          {skills.length > 0 && <div className={styles.tasks}>
            <div className={styles.title}>
              Skills
            </div>

            <ChipList>
              {skills.map(i => <Chip>{i}</Chip>)}
            </ChipList>
          </div>}
          {keywords.length > 0 && <div className={styles.tasks}>
            <div className={styles.title}>
              Keywords
            </div>

            <ChipList>
              {keywords.map(i => <Chip>{i}</Chip>)}
            </ChipList>
          </div>}
        </>
      </Card>
    </div>
  )
}
