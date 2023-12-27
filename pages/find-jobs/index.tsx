import styles from './index.module.scss'

import Layout from '@/components/layout/Layout'
import WithTheBest from '@/components/for_pages/NewPage/WithTheBest'
import TopCard from '@/components/for_pages/NewPage/Main/TopCard'
import ProcessSvg from '@/components/svg/ProcessSvg'
import { colors } from '@/styles/variables'
import RateSvg from '@/components/svg/RateSvg'
import ShowSvg from '@/components/svg/ShowSvg'
import Banner from '@/components/for_pages/NewPage/Main/Banner'
import { useState } from 'react'
import WorkIn from '@/components/for_pages/NewPage/Main/WorkIn'
import VacanciesOfTheDay from '@/components/for_pages/NewPage/Main/VacanciesOfTheDay'
import Popular from '@/components/for_pages/NewPage/Main/Popular'
import Header from '@/components/for_pages/NewPage/Main/Header'
import { useAppContext } from '@/context/state'
import { Swiper, SwiperSlide } from 'swiper/react'


export default function NewPage() {
  const appContext = useAppContext()
  const {isTabletWidth, isSmDesktopWidth} = appContext.size

  const [banner, setBanner] = useState<boolean>(true)

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
                  linkLabel='Process'
                  text={<>AI processing of<br /> your CVs to PDF</>}
                  icon={<ProcessSvg color={colors.white} />}
                  />
                </SwiperSlide >
                <SwiperSlide className={styles.slide}>
                  <TopCard
                  link='#'
                  linkLabel='Rate'
                  text={<>Only trusted<br /> companies</>}
                  icon={<RateSvg color={colors.white} />}
                  />
                </SwiperSlide>
                <SwiperSlide className={styles.slide}>
                  <TopCard
                  link='#'
                  linkLabel='Show'
                  text={<>Jobs arround<br /> with you</>}
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
              <Popular />
            </div>
          </div>
          {!isSmDesktopWidth && <WithTheBest />}
        </div>
      </div>
    </Layout>
  )
}
