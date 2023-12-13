import {LkPageHirerLayout} from '@/components/for_pages/Lk/components/LkLayout'
import {getAuthServerSideProps} from '@/utils/auth'
import {ProfileType} from '@/data/enum/ProfileType'
import {useRef, useState} from 'react'
import {useRouter} from 'next/router'
import useInterval from 'use-interval'
import {CandidateWrapper, useCandidateContext} from '@/context/candidate_state'
import {useAppContext} from '@/context/state'
import CvForHirerPage from '@/components/for_pages/Lk/Jobs/CvForHirerPage'
import ContentLoader from '@/components/ui/ContentLoader'

const CandidatePageInner = () => {
  const appContext = useAppContext()
  const candidateContext = useCandidateContext()
  const cv = candidateContext.candidate?.cv
  const [bookmark, setBookmark] = useState<boolean>(false)
  const router = useRouter()
  useInterval(() => {
    if (bookmark) {
      setBookmark(false)
    }
  }, 5000)

  let ref = useRef<HTMLDivElement | null>(null)

  return ((candidateContext.loading || !candidateContext.candidate?.cv) ? <ContentLoader style={'block'} isOpen={true}/>  :  <CvForHirerPage cv={cv!}/>
  )
}

const CandidatePage = () => {
  const router = useRouter()
  const id = parseInt(router.query.id as string, 10)
  return <CandidateWrapper candidateId={id}>
    <CandidatePageInner/>
  </CandidateWrapper>
}
CandidatePage.getLayout = LkPageHirerLayout
export default CandidatePage
export const getServerSideProps = getAuthServerSideProps(ProfileType.Hirer)
