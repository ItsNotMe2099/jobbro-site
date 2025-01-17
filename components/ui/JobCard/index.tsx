import styles from './index.module.scss'

import {IVacancy} from '@/data/interfaces/IVacancy'
import Image from 'next/image'
import Formatter from '@/utils/formatter'
import Button from '../Button'
import {useState} from 'react'
import {ISkill} from '@/data/interfaces/ISkill'
import VacancyUtils from '@/utils/VacancyUtils'
import {useAppContext} from '@/context/state'
import {ModalType} from '@/types/enums'
import {ApplicationCreateModalArguments} from '@/types/modal_arguments'
import useTranslation from 'next-translate/useTranslation'
import {FILES} from '@/types/constants'
import Link from 'next/link'
import VacancyFavoriteBtn from '@/components/for_pages/Common/VacancyFavoriteBtn'
import {FavoriteEntityType} from '@/data/enum/FavoriteEntityType'
import {Routes} from '@/types/routes'
import {useRouter} from 'next/router'

interface Props {
  vacancy: IVacancy,
}

export default function JobCard({vacancy}: Props) {
  const appContext = useAppContext()
  const router = useRouter()
 const [showAllSkills, setShowAllSkills] = useState(false)
  const {t} = useTranslation()

  const skillsShortList = vacancy?.skills?.slice(0, 3)

  const skillItem = (k: ISkill) => (
    <div title={k.title} className={styles.keyword} key={k.id}>{k.title}</div>
  )

  const showApply = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    if(appContext.isLogged) {
      appContext.showModal<ApplicationCreateModalArguments>(ModalType.ApplicationCreate, {vacancyId: vacancy.id})
    }else {
      router.push(Routes.job(vacancy.id))
    }
  }

  return (<Link href={`/job/${vacancy.id}`} className={styles.root} >
    <VacancyFavoriteBtn id={vacancy.id} entityType={FavoriteEntityType.vacancy} className={styles.bookmark}/>
    <div className={styles.top}>
      {vacancy.company.logo &&
        <div className={styles.imageWrapper}>
          <Image src={FILES + vacancy.company.logo.source} alt={vacancy.company.name||''} width={68} height={68}/>
        </div>
      }
      <p className={styles.title}>{vacancy.name}</p>
      <p className={styles.salary}>
        {VacancyUtils.formatSalary(vacancy)}
      </p>
    </div>
    <div className={styles.middle}>
      {(vacancy.company.logo || vacancy.company.name) &&
        <div className={styles.company}>
          {vacancy.company.name &&
            <p className={styles.companyName}>{vacancy.company.name}</p>
          }
          {vacancy.company.country &&
            <p className={styles.companyCountry}>{vacancy.company.country?.locName}</p>
          }
        </div>
      }
      {vacancy?.skills?.length > 0 &&
        <div className={styles.keywords}>
          {!showAllSkills && skillsShortList?.map((k) => skillItem(k))}
          {showAllSkills && vacancy.skills?.map((k) => skillItem(k))}
          {vacancy.skills?.length > 3 && !showAllSkills &&
            <div
            className={styles.more}
            onClick={(e) => {
              e.preventDefault()
              setShowAllSkills(true)
            }}>
              +{vacancy.skills.length - 3}
            </div>
          }
        </div>
      }
      <p className={styles.published}>
        {vacancy.publishedAt&&Formatter.formatDate(vacancy.publishedAt)}
      </p>
    </div>
    <div className={styles.bottom}>
      {!vacancy.applicationByCurrentUser &&
      <Button styleType='small' color='green' onClick={showApply}>{t('apply_create_button_apply')}</Button>
      ||
      <Button styleType='small' color='green'>{t('apply_look_button_apply')}</Button>
      }
    </div>
  </Link>)
}
