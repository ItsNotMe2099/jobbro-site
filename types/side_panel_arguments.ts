import {ICV} from '@/data/interfaces/ICV'
import {ICandidateFilter} from '@/context/candidate_list_state'
import {IVacancyFilter} from '@/context/vacancy_owner_list_state'

export interface JobFilterSidePanelArguments {
  filter: IVacancyFilter
  onSubmit: (data: any) => void
}

export interface JobReviewSidePanelArguments {
  vacancyId: number
}

export interface JobInviteSidePanelArguments {
  cv: ICV
  total?: number
  isMulti?: boolean
}

export interface CvFilterSidePanelArguments {
  showScore?: boolean
  filter: ICandidateFilter
  onSubmit: (data: any) => void
}


