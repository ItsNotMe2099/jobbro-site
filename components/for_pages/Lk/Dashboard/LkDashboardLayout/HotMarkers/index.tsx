import styles from './index.module.scss'
import Card from '@/components/for_pages/Common/Card'
import Image from 'next/image'
import AccSmallSvg from '@/components/svg/AccSmallSvg'
import {useState} from 'react'
import {IVacancyHot} from '@/data/interfaces/IVacancy'
import DashboardRepository from '@/data/repositories/DashboardRepository'
import {useEffectOnce} from '@/components/hooks/useEffectOnce'
import DateUtils from '@/utils/DateUtils'

interface Props {
}

export default function HotMarkers(props: Props) {
  const [vacancies, setVacancies] = useState<IVacancyHot[]>([])
  const fetch =  async () => {
    const res = await DashboardRepository.fetchHotVacancies()
    setVacancies(res)
  }
  useEffectOnce(() => {
    fetch()
  })

  return (
    <Card title={'Hot markers'} className={styles.root}>
      <div className={styles.total}>
        <Image className={styles.img} src={'/img/icons/flame.png'} alt='' fill />
        <div className={styles.number}>Total: {vacancies.length}</div>
      </div>
      <div className={styles.separator} />
      <div className={styles.wrapper}>
        {vacancies.map((i, index) =>
          <div className={styles.item} key={index}>
            <div className={styles.left}>
              <div className={styles.label}>
                {i.name}
              </div>
              {/* <div className={styles.market}>
                {i.project}
              </div>*/}
            </div>
            <div className={styles.right}>
              <div className={styles.top}>
                <div className={styles.number}>
                  {i.applications_count}
                </div>
                <AccSmallSvg color='#939393' />
              </div>
              <div className={styles.market}>{i.createdAt&&DateUtils.formatDate(i.createdAt)}</div>
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}
