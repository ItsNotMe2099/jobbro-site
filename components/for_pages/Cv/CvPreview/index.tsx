import styles from './index.module.scss'
import {useRef} from 'react'
import CardWithPhoto from '@/components/for_pages/Lk/CandidatesBase/Candidate/Cards/CardWithPhoto'
import CardAiSummary from '@/components/for_pages/Lk/CandidatesBase/Candidate/Cards/CardAiSummary'
import CardCandidateSummary from '@/components/for_pages/Lk/CandidatesBase/Candidate/Cards/CardCandidateSummary'
import CardProfExp from '@/components/for_pages/Lk/CandidatesBase/Candidate/Cards/CardProfExp'
import CardMatching from '@/components/for_pages/Lk/CandidatesBase/Candidate/Cards/CardMatching'
import {useAppContext} from '@/context/state'
import {ICV} from '@/data/interfaces/ICV'
import {Nullable} from '@/types/types'
import {ICVEvaluation} from '@/data/interfaces/ICVEvaluation'
import useTranslation from 'next-translate/useTranslation'
interface Props{
  cv: ICV
  evaluation?: Nullable<ICVEvaluation> | undefined
  hasEvaluation?: boolean
  showMatching?: boolean
}
const CvPreview = (props: Props) => {
  const appContext = useAppContext()
  const cv = props.cv
  const { t } = useTranslation()

  let ref = useRef<HTMLDivElement | null>(null)

  return (
       <div className={styles.root}>
          <div className={styles.top}>
            <CardWithPhoto cv={cv} />
            {props.hasEvaluation && <CardAiSummary className={styles.aiSum} evaluation={props.evaluation}/>}
          </div>
          <CardCandidateSummary cv={cv} />
          <CardProfExp cv={cv} />
         {props.showMatching && <CardMatching  cv={cv}/>}
        </div>
  )
}

export default  CvPreview
