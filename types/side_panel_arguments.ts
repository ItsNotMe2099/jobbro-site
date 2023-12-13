import {PublishStatus} from '@/data/enum/PublishStatus'
import {ICV} from '@/data/interfaces/ICV'

export interface JobFilterSidePanelArguments {
  statuses: PublishStatus[]
  projects: number[]
  publishedDate: string
  showClosed: boolean
  onSubmit: (data: any) => void
}

export interface JobReviewSidePanelArguments {
  vacancyId: number
}

export interface JobInviteSidePanelArguments {
  cv: ICV
}


