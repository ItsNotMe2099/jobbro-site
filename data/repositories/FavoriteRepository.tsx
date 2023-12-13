import request from 'utils/request'
import {IFavoriteRecord} from '@/data/interfaces/IFavoriteRecord'
import {FavoriteStoreType} from '@/data/interfaces/FavoriteStoreType'
import {IFavoriteListRequest} from '@/data/interfaces/IFavoriteListRequest'
import {AxiosRequestConfig} from 'axios/index'
import {FavoriteEntityType} from '@/data/enum/FavoriteEntityType'
import {IPagination} from '@/data/interfaces/IPaginationRequest'

export default class FavoriteRepository {
  static async create(id: number, type: FavoriteEntityType): Promise<void> {
    return request({
      url: '/api/favorite',
      method: 'post',
      data: {
        id,
        type,
      }
    })
  }

  static async delete(id: number, type: FavoriteEntityType): Promise<void> {
    return request({
      url: `/api/favorite?id=${id}&type=${type}`,
      method: 'delete',
    })
  }

  static async fetchStatus(list: IFavoriteRecord[]): Promise<FavoriteStoreType> {
    const split: any = {}

    list.forEach(item => {
      if (!split[item.entityType]) {
        split[item.entityType] = []
      }
      if (!(split[item.entityType] as number[]).includes(item.id)) {
        split[item.entityType].push(item.id)
      }
    })

    return request({
      url: '/api/favorite/favorited',
      method: 'post',
      data: split,
    })
  }

  static async fetchByType<T>(type: FavoriteEntityType, data: IFavoriteListRequest, config?: AxiosRequestConfig): Promise<IPagination<T>> {
    return request({
      url: '/api/favorite',
      method: 'get',
      disableCache: true,
      data: {
        type,
        ...data
      },
      config
    })
  }
}
