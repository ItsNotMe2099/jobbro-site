import request from 'utils/request'
import {IKeyword} from '@/data/interfaces/IKeyword'
import {DeepPartial} from '@/types/types'
import {IKeywordListRequest} from '@/data/interfaces/IKeywordListRequest'
import {IPagination} from '@/data/interfaces/IPaginationRequest'
import {AxiosRequestConfig} from 'axios'

export default class KeywordRepository {

  static async fetch(data: IKeywordListRequest, config?: AxiosRequestConfig): Promise<IPagination<IKeyword>> {
    const res = await request<IPagination<IKeyword>>({
      url: '/api/keyword',
      method: 'get',
      data,
      config,
    })
    return res
  }

  static async create(data: DeepPartial<IKeyword>): Promise<IKeyword> {
    const res = await request<IKeyword>({
      url: '/api/keyword',
      method: 'post',
      data,
    })
    return res
  }

}
