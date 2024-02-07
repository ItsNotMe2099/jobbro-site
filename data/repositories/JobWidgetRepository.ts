import request from 'utils/request'
import { IJobWidget } from '../interfaces/JobWidgetType'

export default class JobWidgetRepository {
  static async updateWidget(data: Partial<IJobWidget>): Promise<any|null> {
    const res = await request({
      method: 'post',
      url: '/api/owner/widget-settings',
      data,
    })
    if(res.err) {
      return null
    }
    return res
  }

  static async getWidgetSettings(): Promise<IJobWidget|null> {
    const res = await request({
      method: 'get',
      url: '/api/owner/widget-settings',
    })
    if(res.err) {
      return null
    }
    return res
  }

  static async getWidgetByToken(data: string): Promise<any|null> {
    const res = await request({
      method: 'get',
      url: `/api/widget-settings/${data}`,
    })
    if(res.err) {
      return null
    }
    return res
  }

}