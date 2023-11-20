import { NotificationType } from './INotification'

export interface INotificationStatsItem {
  type: NotificationType;
  count: number;
}

export interface INotificationStats {
  items: INotificationStatsItem[]
  total: number
}
