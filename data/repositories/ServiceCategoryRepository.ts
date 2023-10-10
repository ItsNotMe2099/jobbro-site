import request from 'utils/request'
import {IServiceCategoryListRequest} from '@/data/interfaces/IServiceCategoryListRequest'
import {IServiceCategory} from '@/data/interfaces/IServiceCategory'
import {AxiosRequestConfig} from 'axios'

export default class ServiceCategoryRepository {


  static async fetch(data: IServiceCategoryListRequest, config?: AxiosRequestConfig): Promise<IServiceCategory[]> {
    const res = await request<IServiceCategory[]>({
      url: '/api/service-category',
      method: 'post',
      data,
      config,
    })
    return res
  }

}
