import request from 'utils/request'
import {IBenefit} from '@/data/interfaces/IBenefit'
import {IBenefitListRequest} from '@/data/interfaces/IBenefitListRequest'
import {IPagination} from '@/data/interfaces/IPaginationRequest'
import {AxiosRequestConfig} from 'axios'
import {DeepPartial} from '@/types/types'

export default class BenefitRepository {

  static async fetch(data: IBenefitListRequest, config?: AxiosRequestConfig): Promise<IPagination<IBenefit>> {
    const res = await request<IPagination<IBenefit>>({
      url: '/api/benefit',
      method: 'get',
      data,
      config,
    })
    return res
  }

  static async create(data: DeepPartial<IBenefit>): Promise<IBenefit> {
    const res = await request<IBenefit>({
      url: '/api/benefit',
      method: 'post',
      data,
    })
    return res
  }

}
