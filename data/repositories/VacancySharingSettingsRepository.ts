import request from 'utils/request'
import {IVacancyShareSettings} from '@/data/interfaces/IVacancyShareSettings'

export default class VacancySharingSettingsRepository {
  static async update(data: Partial<IVacancyShareSettings>): Promise<IVacancyShareSettings|null> {
    const res = await request({
      method: 'post',
      url: '/api/owner/vacancy-share-settings',
      data,
    })
    if(res.err) {
      return null
    }
    return res
  }

  static async fetch(): Promise<IVacancyShareSettings|null> {
    const res = await request({
      method: 'get',
      url: '/api/owner/vacancy-share-settings',
    })
    if(res.err) {
      return null
    }
    return res
  }
}
