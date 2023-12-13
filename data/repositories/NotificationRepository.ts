import request from 'utils/request'
import INotification, {INotificationRecord, NotificationUnreadStoreType} from 'data/interfaces/INotification'
import {INotificationStats} from '@/data/interfaces/INotificationStats'
import {IPagination} from '@/data/interfaces/IPaginationRequest'
import {INotificationListRequest} from '@/data/interfaces/INotificationListRequest'

export default class NotificationRepository {
  static async fetch(data: INotificationListRequest): Promise<IPagination<INotification>> {
    return request({
      url: '/api/notification',
      method: 'get',
      data,
    })
  }
  static async fetchStats(): Promise<INotificationStats> {
    return request({
      url: '/api/notification/unread-stat',
      method: 'get',

    })
  }
  static async fetchStatus(list: INotificationRecord[]): Promise<NotificationUnreadStoreType> {
    const split: any = {}
    list.forEach(item => {
      if (!split[item.type]) {
        split[item.type] = []
      }
      if (!(split[item.type] as number[]).includes(item.id)) {
        split[item.type].push(item.id)
      }
    })

    return await (request({
      url: '/api/notification/list-unread-ids',
      method: 'post',
      data: split,
    }))
  }
  static async setReadByIds(ids: number[]): Promise<void> {
    return request({
      url: '/api/notification/set-read',
      method: 'post',
      data: {ids}

    })
  }
}
