import Card from '@/components/for_pages/Common/Card'
import styles from './index.module.scss'
import {useVacancyListOwnerContext, VacancyListOwnerWrapper} from '@/context/vacancy_owner_list_state'
import React, {useEffect} from 'react'
import {ICV} from '@/data/interfaces/ICV'
import {CvEvaluationSimpleWrapper, useCvEvaluationSimpleContext} from '@/context/cv_simple_evaluation_state'
import ContentLoader from '@/components/ui/ContentLoader'
import CvEvaluationForCard from '@/components/ui/CvEvaluationForCard'
import {IVacancy} from '@/data/interfaces/IVacancy'
import {useAppContext} from '@/context/state'
import {SidePanelType} from '@/types/enums'
import {JobInviteSidePanelArguments} from '@/types/side_panel_arguments'
interface IVacancyItemProps{
  vacancy: IVacancy
  onInvite: () => void
}
const VacancyItem = (props: IVacancyItemProps) => {
  const simpleEvaluation = useCvEvaluationSimpleContext()
  const evaluation = simpleEvaluation.store[props.vacancy.name]?.evaluation
  useEffect(() => {
    simpleEvaluation.addRecord(props.vacancy.name)
  }, [])

  return (<div className={styles.item}>
    <CvEvaluationForCard evaluation={evaluation?.percentEvaluation}/>
    <div className={styles.text}>
      {props.vacancy.name}
    </div>
    <div className={styles.send} onClick={props.onInvite}>
      Send Invite
    </div>
  </div>)
}
interface Props {
  className?: string
  cv: ICV
}

const CardMatchingInner = (props: Props) => {
  const appContext = useAppContext()
  const vacancyListOwnerContext = useVacancyListOwnerContext()
  useEffect(() => {
    vacancyListOwnerContext.setFilter({showClosed: false})
  }, [])
  const handleInvite = (vacancy: IVacancy) => {
    appContext.showSidePanel(SidePanelType.InviteToJob, {cv: props.cv, isMulti: false, vacancy} as JobInviteSidePanelArguments)
  }
  return (
    <Card className={props.className} title={'Matching'}>
      <div className={styles.container}>
        {vacancyListOwnerContext.isLoading && <ContentLoader style={'infiniteScroll'} isOpen={true}/>}
        {!vacancyListOwnerContext.isLoading && vacancyListOwnerContext.data.data.map((vacancy) => <VacancyItem key={vacancy.id}  vacancy={vacancy } onInvite={() => handleInvite(vacancy)}/>)}
      </div>
    </Card>
  )
}

export default function CardMatching(props: Props) {
  return (<CvEvaluationSimpleWrapper cvTitle={props.cv.title}>
    <VacancyListOwnerWrapper limit={5}>
      <CardMatchingInner {...props}/>
    </VacancyListOwnerWrapper>
  </CvEvaluationSimpleWrapper>)
}
