import request from 'utils/request'
import { IJobWidget } from '../interfaces/JobWidgetType'
import { IVacancy } from '../interfaces/IVacancy'
import { IPagination } from '../interfaces/IPaginationRequest'

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

  static async getWidgetByToken(data: string): Promise<IJobWidget|null> {
    const res = await request({
      method: 'get',
      url: `/api/widget-settings/${data}`,
    })
    if(res.err) {
      return null
    }
    return res
  }

  static async getVacanciesForWidget(data: string, page?: number, limit?: number): Promise<IPagination<IVacancy>|null> {
    const res = await request({
      method: 'get',
      url: '/api/vacancy/forWidget',
      data: {token: data, page, limit}
    })
    if(res.err) {
      return null
    }
    return res
  }

}