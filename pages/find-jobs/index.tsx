import styles from './index.module.scss'

import Layout from '@/components/layout/Layout'
import WithTheBest from '@/components/for_pages/FindJobs/WithTheBest'
import TopCard from '@/components/for_pages/FindJobs/TopCard'
import ProcessSvg from '@/components/svg/ProcessSvg'
import { colors } from '@/styles/variables'
import RateSvg from '@/components/svg/RateSvg'
import ShowSvg from '@/components/svg/ShowSvg'
import Banner from '@/components/for_pages/FindJobs/Banner'
import {useEffect, useState} from 'react'
import WorkIn from '@/components/for_pages/FindJobs/VacanciesByLocation'
import VacanciesOfTheDay from '@/components/for_pages/FindJobs/VacanciesOfTheDay'
import Header from '@/components/for_pages/FindJobs/Header'
import { useAppContext } from '@/context/state'
import { Swiper, SwiperSlide } from 'swiper/react'
import VacancyRepository from '@/data/repositories/VacancyRepository'
import {IVacancy} from '@/data/interfaces/IVacancy'
import {IIpLocate} from '@/data/interfaces/IIpLocate'
import {FindJobsMainWrapper} from '@/context/find_jobs_main_state'
import useTranslation from 'next-translate/useTranslation'


const FindJobsInner = () => {
  const appContext = useAppContext()
  const {isSmDesktopWidth} = appContext.size
  const {t} = useTranslation()
  const [banner, setBanner] = useState<boolean>(true)
  const [vacanciesByLocation, setVacanciesByLocation] = useState<{ data: IVacancy[], location: IIpLocate | null, total: number}>({data: [], total: 0, location: null})
  useEffect(() => {
    VacancyRepository.findVacanciesNearByIp({nearMeByIp: true, page: 1, limit: 3}).then(vacancies => {
      setVacanciesByLocation(vacanciesByLocation)
    })
  }, [])
  return (
    <Layout>
      <Header />
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.main}>
            <div className={styles.content}>
              <Swiper
              className={styles.cards}
              slidesPerView={'auto'}
              spaceBetween={16}
              >
                <SwiperSlide className={styles.slide}>
                  <TopCard
                  link='#'
                  linkLabel={t('find_jobs_cards_top_process_title')}
                  text={t('find_jobs_cards_top_process_desc')}
                  icon={<ProcessSvg color={colors.white} />}
                  />
                </SwiperSlide >
                <SwiperSlide className={styles.slide}>
                  <TopCard
                  link='#'
                  linkLabel={t('find_jobs_cards_top_rate_title')}
                  text={t('find_jobs_cards_top_rate_desc')}
                  icon={<RateSvg color={colors.white} />}
                  />
                </SwiperSlide>
                <SwiperSlide className={styles.slide}>
                  <TopCard
                  link='#'
                  linkLabel={t('find_jobs_cards_top_show_title')}
                  text={t('find_jobs_cards_top_show_desc')}
                  icon={<ShowSvg color={colors.white} />}
                  />
                </SwiperSlide>
              </Swiper>
              {isSmDesktopWidth &&
                <WithTheBest />
              }
              {banner  && <Banner onClose={() => setBanner(false)} />}
              <WorkIn />
              <VacanciesOfTheDay />
            </div>
          </div>
          {!isSmDesktopWidth && <WithTheBest />}
        </div>
      </div>
    </Layout>
  )
}


export default function FindJobs() {
  return (<FindJobsMainWrapper>
    <FindJobsInner/>
  </FindJobsMainWrapper>)
}
