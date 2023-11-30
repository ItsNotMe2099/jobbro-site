import styles from './index.module.scss'
import {LkPageHirerLayout} from '@/components/for_pages/Lk/components/LkLayout'
import {getAuthServerSideProps} from '@/utils/auth'
import {ProfileType} from '@/data/enum/ProfileType'
import PageTitle from '@/components/for_pages/Common/PageTitle'
import {useRef, useState} from 'react'
import {Routes} from '@/types/routes'
import {useRouter} from 'next/router'
import useInterval from 'use-interval'
import Card from '@/components/for_pages/Common/Card'
import CheckBoxSvg from '@/components/svg/CheckBoxSvg'
import CloseSvg from '@/components/svg/CloseSvg'
import ControlsStickyFooter from '@/components/for_pages/Common/ControlsStickyFooter'
import Button from '@/components/ui/Button'
import CardWithPhoto from '@/components/for_pages/Lk/CandidatesBase/Candidate/Cards/CardWithPhoto'
import CardAiSummary from '@/components/for_pages/Lk/CandidatesBase/Candidate/Cards/CardAiSummary'
import CardCandidateSummary from '@/components/for_pages/Lk/CandidatesBase/Candidate/Cards/CardCandidateSummary'
import CardProfExp from '@/components/for_pages/Lk/CandidatesBase/Candidate/Cards/CardProfExp'
import CardMatching from '@/components/for_pages/Lk/CandidatesBase/Candidate/Cards/CardMatching'
import {CandidateWrapper, useCandidateContext} from '@/context/candidate_state'
import {useAppContext} from '@/context/state'
import {SidePanelType} from '@/types/enums'
import {JobInviteSidePanelArguments} from '@/types/side_panel_arguments'

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

  return (
    <>
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

      {cv && <div ref={ref} className={styles.container}>
        <PageTitle title={cv.title} link={Routes.lkCandidatesBase} />
        <div className={styles.wrapper}>
          <div className={styles.top}>
            <CardWithPhoto cv={cv} />
            <CardAiSummary className={styles.aiSum} percent={98} description={''}/>
          </div>
          <CardCandidateSummary cv={cv} />
          <CardProfExp cv={cv} />
          {/*<CardAiComment item={item} />*/}
          <CardMatching  />
        </div>
        <ControlsStickyFooter btns={[
          <Button type='button' styleType='large' color='green' onClick={() => appContext.showSidePanel(SidePanelType.InviteToJob, {cv} as JobInviteSidePanelArguments)}>
            Send Invite
          </Button>,
          <Button className={styles.cancel} styleType='large' color='white' href={Routes.lkCandidatesBase} >
            Cancel
          </Button>
        ]} boundaryElement={`.${styles.container}`} formRef={ref} />
      </div>}
    </>
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
