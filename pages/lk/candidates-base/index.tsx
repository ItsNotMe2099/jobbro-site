import styles from './index.module.scss'
import {LkPageHirerLayout} from '@/components/for_pages/Lk/components/LkLayout'
import {getAuthServerSideProps} from '@/utils/auth'
import {ProfileType} from '@/data/enum/ProfileType'
import PageTitle from '@/components/for_pages/Common/PageTitle'
import {useRef, useState} from 'react'
// import classNames from 'classnames'
import {useRouter} from 'next/router'
import CandidateCard from '@/components/for_pages/Lk/Jobs/CandidateCard'
import {CandidateListWrapper, useCandidateListContext} from '@/context/candidate_list_state'
import {useEffectOnce} from '@/components/hooks/useEffectOnce'
import FilterToolbar from '@/components/for_pages/Common/FilterToolbar'
import ViewToggleFilterButton from '@/components/for_pages/Common/FilterToolbar/ViewToggleFilterButton'
import {CardViewType} from '@/types/enums'
import PageStickyHeader from '@/components/for_pages/Common/PageStickyHeader'
import Tabs from '@/components/ui/Tabs'
import {IOption, Nullable} from '@/types/types'
import {Routes} from '@/types/routes'
import CardsLayout from '@/components/ui/CardsLayout'

enum TabKey {
  AllProfiles = 'allProfiles',
  UploadCv = 'uploadCv'
}

const CandidatesPageInner = () => {
  const candidateListContext = useCandidateListContext()
  const [view, setView] = useState<CardViewType>(CardViewType.Card)
  const [tab, setTab] = useState<TabKey>(TabKey.AllProfiles)
  const router = useRouter()
  const containerRef = useRef<Nullable<HTMLDivElement>>(null)
  const tabs: IOption<TabKey>[] = [
    {label: 'All Profiles', value: TabKey.AllProfiles},
    {label: 'Upload CV', value: TabKey.UploadCv},
  ]

  const handleChangeTab = (tab: TabKey) => {
    switch (tab) {
      case TabKey.AllProfiles:
        router.push(Routes.lkCandidatesBase)
        break
      case TabKey.UploadCv:
        router.push(Routes.lkCandidateAiCvRequests)
        break
    }
  }
  useEffectOnce(() => {
    candidateListContext.reFetch()
  })

  return (<div className={styles.root} ref={containerRef}>
      <PageStickyHeader boundaryElement={styles.root} formRef={containerRef}>
        <PageTitle title={'Candidates base'}/>
        <Tabs<TabKey> options={tabs} value={tab} onClick={handleChangeTab}/>
        <>{tab === TabKey.UploadCv && <FilterToolbar left={[]}/>}</>
      </PageStickyHeader>
      <div className={styles.wrapper}>
        <FilterToolbar left={[]} right={<ViewToggleFilterButton onChange={setView} view={view}/>}/>
        {/* <div className={classNames(styles.cards, {[styles.rows]: view === CardViewType.Row})}>
          {candidateListContext.data.data.map(i =>
            <CandidateCard view={view} className={styles.card} candidate={i} key={i.id}/>
          )}
        </div> */}
        <CardsLayout type={view === CardViewType.Card ? 'cards' : 'list'} >
          {candidateListContext.data.data.map(i =>
            <CandidateCard view={view} className={styles.card} candidate={i} key={i.id}/>
          )}
        </CardsLayout>
      </div>
    </div>
  )
}


const CandidatesPage = () => {
  return <CandidateListWrapper>
    <CandidatesPageInner/>
  </CandidateListWrapper>
}
CandidatesPage.getLayout = LkPageHirerLayout
export default CandidatesPage
export const getServerSideProps = getAuthServerSideProps(ProfileType.Hirer)
