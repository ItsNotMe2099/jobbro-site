import request from 'utils/request'
import {partialUtil} from 'zod/lib/helpers/partialUtil'
import DeepPartial = partialUtil.DeepPartial;
import {IPagination} from '@/data/interfaces/IPaginationRequest'
import {ILocationCountryListRequest} from '@/data/interfaces/ILocationCountryListRequest'
import {IGeoName} from '@/data/interfaces/ILocation'
import {ILocationCityListRequest} from '@/data/interfaces/ILocationCityListRequest'
import {AxiosRequestConfig} from 'axios/index'

export default class LocationRepository {

  static async fetchCountries(data: ILocationCountryListRequest, config?: AxiosRequestConfig): Promise<IPagination<IGeoName>> {
    const res = await request<IPagination<IGeoName>>({
      url: '/api/location/country',
      method: 'get',
      data,
      config,
    })
    return res
  }

  static async fetchCities(data: ILocationCityListRequest, config?: AxiosRequestConfig): Promise<IPagination<IGeoName>> {
    const res = await request<IPagination<IGeoName>>({
      url: '/api/location/city',
      method: 'get',
      data,
      config,
    })
    return res
  }
}
