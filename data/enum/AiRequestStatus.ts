
export enum AiRequestStatus {
  Created = 'created',
  InProgress = 'inProgress',
  Finished = 'finished',
  Error = 'error',
  InQueue = 'inQueue',
}
export const AiRequestStatusFinished = [
  AiRequestStatus.Error,
  AiRequestStatus.Finished
]

export const AiRequestStatusInProgress = [
  AiRequestStatus.Created,
  AiRequestStatus.InQueue,
  AiRequestStatus.InProgress
]
