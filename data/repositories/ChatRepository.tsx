import request from 'utils/request'
import IChat from 'data/interfaces/IChat'
import {AxiosRequestConfig} from 'axios'
import {IChatListRequest} from '@/data/interfaces/IChatListRequest'
import {IPagination} from '@/data/interfaces/IPaginationRequest'

export default class ChatRepository {
  static async fetchAll(data: IChatListRequest, config?: AxiosRequestConfig): Promise<IPagination<IChat>> {
    return request({
      url: '/api/chat/dialog',
      method: 'get',
      data,
      config
    })
  }
  static async fetchChatById(id: number | string): Promise<IChat | null> {
    return request({
      url: `/api/chat/${id}`,
      method: 'get'
    })
  }

  static async fetchChatByVacancyAndCv(data: {vacancyId: number, cvId: number}): Promise<IChat | null> {
    return request({
        url: '/api/chat/byVacancyAndCv',
        method: 'get',
        data,
      }
    )
  }

  static async createChat(data: {vacancyId: number, profileId: string}): Promise<IChat | null> {
    return request({
        url: '/api/chat',
        method: 'post',
        data,
      }
    )
  }

  static async fetchBookingChat(bookingId: number | string): Promise<IChat | null> {
    return request({
      url: `/api/chat/booking-dialog/${bookingId}`,
      method: 'get'
    })
  }
}
