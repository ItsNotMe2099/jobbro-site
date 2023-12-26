import styles from './index.module.scss'
import PageTitle from '@/components/for_pages/Common/PageTitle'
import {useRef} from 'react'
import ControlsStickyFooter from '@/components/for_pages/Common/ControlsStickyFooter'
import Button from '@/components/ui/Button'
import CardWithPhoto from '@/components/for_pages/Lk/CandidatesBase/Candidate/Cards/CardWithPhoto'
import CardAiSummary from '@/components/for_pages/Lk/CandidatesBase/Candidate/Cards/CardAiSummary'
import CardCandidateSummary from '@/components/for_pages/Lk/CandidatesBase/Candidate/Cards/CardCandidateSummary'
import CardProfExp from '@/components/for_pages/Lk/CandidatesBase/Candidate/Cards/CardProfExp'
import CardMatching from '@/components/for_pages/Lk/CandidatesBase/Candidate/Cards/CardMatching'
import {useAppContext} from '@/context/state'
import {SidePanelType} from '@/types/enums'
import {JobInviteSidePanelArguments} from '@/types/side_panel_arguments'
import {ICV} from '@/data/interfaces/ICV'
import {Nullable} from '@/types/types'
import {ICVEvaluation} from '@/data/interfaces/ICVEvaluation'
interface Props{
  cv: ICV
  evaluation?: Nullable<ICVEvaluation> | undefined
  backLink: string
}
const CvForHirerPage = (props: Props) => {
  const appContext = useAppContext()
  const cv = props.cv


  let ref = useRef<HTMLDivElement | null>(null)

  return (


     <div ref={ref} className={styles.container}>
        <PageTitle title={cv.title} link={props.backLink} />
        <div className={styles.wrapper}>
          <div className={styles.top}>
            <CardWithPhoto cv={cv} />
            {props.evaluation && <CardAiSummary className={styles.aiSum} evaluation={props.evaluation}/>}
          </div>
          <CardCandidateSummary cv={cv} />
          <CardProfExp cv={cv} />
          <CardMatching  />
        </div>
        <ControlsStickyFooter btns={[
          <Button type='button' styleType='large' color='green' onClick={() => appContext.showSidePanel(SidePanelType.InviteToJob, {cv} as JobInviteSidePanelArguments)}>
            Send Invite
          </Button>,
          <Button className={styles.cancel} styleType='large' color='white' href={props.backLink} >
            Cancel
          </Button>
        ]} boundaryElement={`.${styles.container}`} formRef={ref} />
      </div>
  )
}

export default  CvForHirerPage
