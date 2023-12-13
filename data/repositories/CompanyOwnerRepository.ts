import request from 'utils/request'
import {AxiosRequestConfig} from 'axios/index'
import {DeepPartial} from '@/types/types'
import {ICompany} from '@/data/interfaces/ICompany'

export default class CompanyOwnerRepository {
  static async fetch(config?: AxiosRequestConfig): Promise<ICompany[]> {
    const res = await request<ICompany[]>({
      method: 'get',
      url: '/api/owner/company',
      config,
    })
    return res
  }

  static async update(id: number, data: DeepPartial<ICompany>): Promise<ICompany> {
    const res = await request<ICompany>({
      method: 'patch',
      url: `/api/owner/company/${id}`,
      data,
    })
    return res
  }

  static async create(data: DeepPartial<ICompany>): Promise<ICompany> {
    const res = await request<ICompany>({
      method: 'post',
      url: '/api/owner/company',
      data,
    })
    return res
  }

  static async delete(id: number): Promise<ICompany> {
    const res = await request<ICompany>({
      method: 'delete',
      url: `/api/owner/company/${id}`,
    })
    return res
  }
}
