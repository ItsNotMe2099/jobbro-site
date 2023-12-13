
export enum AiCvRequestStatus {
  Created = 'created',
  InProgress = 'inProgress',
  Finished = 'finished',
  Error = 'error',
  InQueue = 'inQueue',
  MovedToProfile = 'movedToProfile'
}
export const AiCvRequestStatusFinished = [
  AiCvRequestStatus.Error,
  AiCvRequestStatus.Finished
]

export const AiCvRequestStatusInProgress = [
  AiCvRequestStatus.Created,
  AiCvRequestStatus.InQueue,
  AiCvRequestStatus.InProgress
]
