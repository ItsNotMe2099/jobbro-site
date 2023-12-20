import request from 'utils/request'
import {Nullable} from '@/types/types'

export default class SiteApplicationRepository {
  static async create(data: {
    name: Nullable<string>
    email: Nullable<string>
    phone: Nullable<string>
    company: Nullable<string>
  }): Promise<void> {
    const res = await request<void>({
      method: 'post',
      url: '/api/site-application',
      data,
    })
    return res
  }


}
