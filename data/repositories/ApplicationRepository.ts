import request from 'utils/request'
import {AxiosRequestConfig} from 'axios/index'
import {IPagination} from '@/data/interfaces/IPaginationRequest'
import {DeepPartial} from '@/types/types'
import {ICV} from '@/data/interfaces/ICV'
import {ICvOwnerListRequest} from '@/data/interfaces/ICvOwnerListRequest'
import {ApplicationStatus} from '@/data/enum/ApplicationStatus'
import {IApplication} from '@/data/interfaces/IApplication'

export default class ApplicationRepository {
  static async fetch(data: ICvOwnerListRequest, config?: AxiosRequestConfig): Promise<IPagination<ICV>> {
    const res = await request<IPagination<ICV>>({
      method: 'get',
      url: '/api/application',
      data,
      config,
    })
    return res
  }


  static async accept(id: number): Promise<IApplication> {
    const res = await request<IApplication>({
      method: 'patch',
      url: `/api/application/${id}`,
      data: {status: ApplicationStatus.Accepted},
    })
    return res
  }
  static async reject(id: number): Promise<IApplication> {
    const res = await request<IApplication>({
      method: 'patch',
      url: `/api/application/${id}`,
      data: {status: ApplicationStatus.Rejected},
    })
    return res
  }

  static async create(data: DeepPartial<IApplication>): Promise<IApplication> {
    const res = await request<IApplication>({
      method: 'post',
      url: '/api/application',
      data,
    })
    return res
  }

}
