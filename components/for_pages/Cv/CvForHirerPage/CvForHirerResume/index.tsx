import styles from 'components/for_pages/Cv/CvForHirerPage/index.module.scss'
import {useRef} from 'react'
import Button from '@/components/ui/Button'
import {useAppContext} from '@/context/state'
import {SidePanelType} from '@/types/enums'
import {JobInviteSidePanelArguments} from '@/types/side_panel_arguments'
import {ICV} from '@/data/interfaces/ICV'
import { Nullable} from '@/types/types'
import {ICVEvaluation} from '@/data/interfaces/ICVEvaluation'
import useTranslation from 'next-translate/useTranslation'
import CvPreview from '@/components/for_pages/Cv/CvPreview'
import FormStickyFooter from '@/components/for_pages/Common/FormStickyFooter'
import DownloadCvButton from '@/components/for_pages/Common/DownloadCvButton'
interface Props{
  cv: ICV
  evaluation?: Nullable<ICVEvaluation> | undefined
  backLink: string
  hasEvaluation?: boolean
}
const CvForHirerResume = (props: Props) => {
  const appContext = useAppContext()
  const cv = props.cv
  const { t } = useTranslation()
  let ref = useRef<HTMLDivElement | null>(null)

  return (
     <div ref={ref} className={styles.root}>
       <CvPreview cv={cv} hasNotes={true} hasEvaluation={props.hasEvaluation ?? false} evaluation={props.evaluation} showMatching={true}/>
        <FormStickyFooter boundaryElement={`.${styles.root}`} formRef={ref} >
          <Button type='button' styleType='large' color='green' onClick={() => appContext.showSidePanel(SidePanelType.InviteToJob, {cv} as JobInviteSidePanelArguments)}>
            {t('cv_preview_send_invite')}
          </Button>
          <Button className={styles.cancel} styleType='large' color='white' href={props.backLink} >
            {t('cv_preview_cancel')}
          </Button>
          <DownloadCvButton styleType={'buttonTransparent'} placement={'top-end'} cv={props.cv} className={styles.btnDownload}  />
        </FormStickyFooter>
      </div>
  )
}

export default  CvForHirerResume
