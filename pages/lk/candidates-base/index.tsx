import styles from './index.module.scss'
import {LkPageLayout} from '@/components/for_pages/Lk/components/LkLayout'
import { getAuthServerSideProps } from '@/utils/auth'
import { ProfileType } from '@/data/enum/ProfileType'
import PageTitle from '@/components/for_pages/Common/PageTitle'
import Filter from '@/components/for_pages/Lk/Jobs/Filter'
import { useState } from 'react'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import CandidateCard from '@/components/for_pages/Lk/Jobs/CandidateCard'
import Card from '@/components/for_pages/Common/Card'
import CheckBoxSvg from '@/components/svg/CheckBoxSvg'
import CloseSvg from '@/components/svg/CloseSvg'
import {CandidateListWrapper, useCandidateListContext} from '@/context/candidate_list_state'
import {useEffectOnce} from '@/components/hooks/useEffectOnce'

const CandidatesPageInner = () => {
  const candidateListContext = useCandidateListContext()
  const [view, setView] = useState<'card' | 'row'>('card')

  const router = useRouter()


  const [bookmark, setBookmark] = useState<boolean>(false)

  const handleBookmark = () => {

  }
  useEffectOnce(() => {
    candidateListContext.reFetch()
  })

  return (<>
      {bookmark ?
        <Card className={styles.notification} title={''}>
          <div className={styles.inner}>
            <div className={styles.checkbox}>
              <CheckBoxSvg className={styles.check} />
            </div>
            <div className={styles.content}>
              <div className={styles.top}>
                Candidate added
              </div>
              <div className={styles.bottom}>
                You can find him on candidate<br /> base
              </div>
            </div>
            <div className={styles.closebox}>
              <CloseSvg className={styles.close} onClick={() => setBookmark(false)} color='#939393' />
            </div>
          </div>
        </Card>
        : <></>}
        <div className={styles.container}>
          <PageTitle title={'Candidates base'} />
          <div className={styles.wrapper}>
            <Filter view={view} onSetView={() => setView(view === 'card' ? 'row' : 'card')} />
            <div className={classNames(styles.cards, { [styles.rows]: view === 'row' })}>
              {candidateListContext.data.data.map((i, index) =>
                <CandidateCard onAddBookmark={(bookmark) => setBookmark(bookmark)} view={view} className={styles.card} cv={i.cv} key={i.id} />
              )}
            </div>
          </div>
        </div>
    </>
  )
}



const CandidatesPage = () => {
  return <CandidateListWrapper>
    <CandidatesPageInner/>
  </CandidateListWrapper>
}
CandidatesPage.getLayout = LkPageLayout
export default  CandidatesPage
export const getServerSideProps = getAuthServerSideProps(ProfileType.Employee)
