import request from 'utils/request'
import {AxiosRequestConfig} from 'axios/index'
import {DeepPartial} from '@/types/types'
import {IManagerCreateRequest} from '@/data/interfaces/IManagerCreateRequest'
import {ICompany} from '@/data/interfaces/ICompany'

export default class CompanyOwnerRepository {
  static async fetch(config?: AxiosRequestConfig): Promise<ICompany[]> {
    const res = await request<ICompany[]>({
      method: 'get',
      url: '/api/company',
      config,
    })
    return res
  }

  static async update(id: number, data: DeepPartial<IManagerCreateRequest>): Promise<ICompany> {
    const res = await request<ICompany>({
      method: 'patch',
      url: `/api/company/${id}`,
      data,
    })
    return res
  }

  static async create(data: DeepPartial<IManagerCreateRequest>): Promise<ICompany> {
    const res = await request<ICompany>({
      method: 'post',
      url: '/api/company',
      data,
    })
    return res
  }

  static async delete(id: number): Promise<ICompany> {
    const res = await request<ICompany>({
      method: 'delete',
      url: `/api/company/${id}`,
    })
    return res
  }
}
