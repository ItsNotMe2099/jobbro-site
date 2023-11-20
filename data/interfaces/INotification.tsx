import {IApplication} from '@/data/interfaces/IApplication'
import {ICV} from '@/data/interfaces/ICV'
import {IVacancy} from '@/data/interfaces/IVacancy'
import {IProposal} from '@/data/interfaces/IProposal'
import IChatMessage from '@/data/interfaces/IChatMessage'

export enum NotificationType {
  userRegistered = 'userRegistered',
  managerInvited = 'managerInvited',
  emailVerification = 'emailVerification',
  passwordReset = 'passwordReset',
  chatMessage = 'chatMessage',
  newApplication = 'newApplication',
  newProposal = 'newProposal',
  userBlocked = 'userBlocked',
  userUnBlocked = 'userUnBlocked',
  cvRejected = 'cvRejected',
  vacancyRejected = 'vacancyRejected'
}

export interface INotificationData {
  code?: string;
  phone?: string;
  email?: string;
  receivingPointId?: string | null;
  messageId?: number;
  dealOfferId?: number;
  saleRequestId?: number;
  dealId?: number;
  reviewId?: number;
}

export type NotificationTargetType = 'user' | 'all';
export default interface INotification {
  id: number;
  type: NotificationType;
  title: string;
  body: string;
  isRead?: boolean;
  targetType: NotificationTargetType;
  targetTypeName: string;
  createdAt: string;
  link?: string
  data: INotificationData;
  application: IApplication;
  applicationId: number;
  proposal: IProposal;
  proposalId: number;
  vacancy: IVacancy;
  vacancyId: number;
  message: IChatMessage;
  messageId: number;
  cv: ICV;
  cvId: number;
}


export enum NotificationUnreadType {
  application = 'application',
  proposal = 'proposal',
  cv = 'cv',
  vacancy = 'vacancy',
  message = 'message'
}

export interface INotificationRecord {
  id: number
  type: NotificationUnreadType
  time: Date
}

export interface INotificationUnreadStoreItem {
  eId: number
  id: number
}

export type NotificationUnreadStoreType = { [entityType in NotificationUnreadType]: INotificationUnreadStoreItem[] }
