import Layout from '@/components/layout/Layout'
import styles from './index.module.scss'
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


export default function NewPage() {

  const [banner, setBanner] = useState<boolean>(true)

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.main}>
            <div className={styles.content}>
              <div className={styles.cards}>
                <TopCard
                  link='#'
                  linkLabel='Process'
                  text={<>AI processing of<br /> your CVs to PDF</>}
                  icon={<ProcessSvg color={colors.white} />}
                />
                <TopCard
                  link='#'
                  linkLabel='Rate'
                  text={<>Only trusted<br /> companies</>}
                  icon={<RateSvg color={colors.white} />}
                />
                <TopCard
                  link='#'
                  linkLabel='Show'
                  text={<>Jobs arround<br /> with you</>}
                  icon={<ShowSvg color={colors.white} />}
                />
              </div>
              {banner && <Banner onClose={() => setBanner(false)} />}
              <WorkIn />
              <VacanciesOfTheDay />
            </div>
          </div>
          <WithTheBest />
        </div>
      </div>
    </Layout>
  )
}
