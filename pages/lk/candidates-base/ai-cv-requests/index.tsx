import styles from './index.module.scss'
import {LkPageHirerLayout} from '@/components/for_pages/Lk/components/LkLayout'
import {getAuthServerSideProps} from '@/utils/auth'
import {ProfileType} from '@/data/enum/ProfileType'
import PageTitle from '@/components/for_pages/Common/PageTitle'
import {useRef, useState} from 'react'
import {useRouter} from 'next/router'
import {useEffectOnce} from '@/components/hooks/useEffectOnce'
import FilterToolbar from '@/components/for_pages/Common/FilterToolbar'
import PageStickyHeader from '@/components/for_pages/Common/PageStickyHeader'
import Tabs from '@/components/ui/Tabs'
import {IOption, Nullable} from '@/types/types'
import AiCvRequests from '@/components/for_pages/Lk/CandidatesBase/AiCvRequests'
import {Routes} from '@/types/routes'
import {AiCvRequestListWrapper, useAiCvRequestListOwnerContext} from '@/context/ai_cv_request_list_state'
import FilterButton from '@/components/for_pages/Common/FilterToolbar/FilterButton'
import {colors} from '@/styles/variables'
import Spinner from '@/components/ui/Spinner'
enum TabKey{
  AllProfiles = 'allProfiles',
  UploadCv = 'uploadCv'
}
const AiCvRequestsPageInner = () => {
  const aiCvRequestListContext = useAiCvRequestListOwnerContext()
  const [tab, setTab] = useState<TabKey>(TabKey.UploadCv)
  const containerRef = useRef<Nullable<HTMLDivElement>>(null)
  const tabs: IOption<TabKey>[] = [
    {label: 'All Profiles', value: TabKey.AllProfiles},
    {label: 'Upload CV', value: TabKey.UploadCv},
  ]
  const router = useRouter()

  const handleChangeTab = (tab: TabKey) => {
    switch (tab){
      case TabKey.AllProfiles:
        router.push(Routes.lkCandidatesBase)
        break
      case TabKey.UploadCv:
        router.push(Routes.lkCandidateAiCvRequests)
        break
    }
  }
  useEffectOnce(() => {
    aiCvRequestListContext.reFetch()
  })

  return (<div className={styles.root} ref={containerRef}>
          <PageStickyHeader boundaryElement={styles.root} formRef={containerRef}>
            <PageTitle title={'Candidates base'} />
            <Tabs<TabKey> options={tabs} value={tab} onClick={handleChangeTab}/>
            <FilterToolbar left={[...(aiCvRequestListContext.selectedIds?.length > 0 && !aiCvRequestListContext.isActionLoading ? [
                <FilterButton disabled={aiCvRequestListContext.isActionLoading} onClick={() => {aiCvRequestListContext.setSelectAllCompleted(!aiCvRequestListContext.isSelectAllCompleted)}}>Select all completed</FilterButton>,
              // eslint-disable-next-line react/no-unescaped-entities
                <FilterButton disabled={aiCvRequestListContext.isActionLoading} onClick={() => aiCvRequestListContext.moveSelected()}>Move to "All Profiles"</FilterButton>,
                <FilterButton disabled={aiCvRequestListContext.isActionLoading} onClick={() => aiCvRequestListContext.deleteSelected()}>Delete</FilterButton>
              ] : []),
              ...(aiCvRequestListContext.isActionLoading ? [
                <Spinner size={24} color={colors.white} secondaryColor={colors.green}/>
              ] : [])]} />
          </PageStickyHeader>

           <AiCvRequests/>
        </div>
  )
}



const AiCvRequestsPage = () => {
  return <AiCvRequestListWrapper>
    <AiCvRequestsPageInner/>
  </AiCvRequestListWrapper>
}
AiCvRequestsPage.getLayout = LkPageHirerLayout
export default  AiCvRequestsPage
export const getServerSideProps = getAuthServerSideProps(ProfileType.Hirer)
