import request from 'utils/request'
import {AxiosRequestConfig} from 'axios/index'
import {IIpLocate} from '@/data/interfaces/IIpLocate'

export default class GeoIpRepository {
  static async ipLocate(config?: AxiosRequestConfig): Promise<IIpLocate> {
    const res = await request<IIpLocate>({
      method: 'get',
      url: '/api/geoip/iplocate',
      config,
    })
    return res
  }
}
