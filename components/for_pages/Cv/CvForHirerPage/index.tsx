import styles from 'components/for_pages/Cv/CvForHirerPage/index.module.scss'
import PageTitle from '@/components/for_pages/Common/PageTitle'
import {useRef, useState} from 'react'
import {useAppContext} from '@/context/state'
import {ICV} from '@/data/interfaces/ICV'
import {IOption, Nullable} from '@/types/types'
import {ICVEvaluation} from '@/data/interfaces/ICVEvaluation'
import useTranslation from 'next-translate/useTranslation'
import Tabs from '@/components/ui/Tabs'
import CvForHirerResume from '@/components/for_pages/Cv/CvForHirerPage/CvForHirerResume'
import CvForHirerChat from '@/components/for_pages/Cv/CvForHirerPage/CvForHirerChat'
import {CvNoteListOwnerWrapper} from '@/context/cv_note_list_state'
import CvForHirerNotesTab from '@/components/for_pages/Cv/CvForHirerPage/CvForHirerNotesTab'
enum MenuKey{
  Resume = 'resume',
  Chat = 'chat',
  Notes = 'notes'
}
interface Props{
  cv: ICV
  vacancyId?: number
  evaluation?: Nullable<ICVEvaluation> | undefined
  backLink: string
  hasEvaluation?: boolean

}
const CvForHirerPage = (props: Props) => {
  const appContext = useAppContext()
  const cv = props.cv
  const [tab, setTab] = useState<MenuKey>(MenuKey.Resume)
  const { t } = useTranslation()
  let ref = useRef<HTMLDivElement | null>(null)
  const tabs: IOption<MenuKey>[] = [
    {value: MenuKey.Resume, label: 'Resume'},
  ...(props.vacancyId ? [{value: MenuKey.Chat, label: 'Chat'}] : []),
    {value: MenuKey.Notes, label: 'Notes'},
  ]
  const handleChangeTab = (tab: MenuKey) => {
 setTab(tab)
  }
  return (<CvNoteListOwnerWrapper cvId={props.cv.id}>
     <div ref={ref} className={styles.root}>
        <PageTitle title={cv.title} link={props.backLink} />
       <Tabs<MenuKey> options={tabs} value={tab} onClick={handleChangeTab}/>
       {tab === MenuKey.Resume && <CvForHirerResume cv={props.cv} backLink={props.backLink} />}
       {props.vacancyId && tab === MenuKey.Chat && <CvForHirerChat cvId={props.cv.id} vacancyId={props.vacancyId}/>}
       {tab === MenuKey.Notes && <CvForHirerNotesTab/>}
     </div>
    </CvNoteListOwnerWrapper>
  )
}

export default  CvForHirerPage
