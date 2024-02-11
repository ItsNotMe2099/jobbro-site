import request from 'utils/request'
import {AxiosRequestConfig} from 'axios/index'
import {DeepPartial} from '@/types/types'
import IEvent, {IAvailableSlot} from '@/data/interfaces/IEvent'

export default class EventRepository {
  static async fetch(config?: AxiosRequestConfig): Promise<IEvent[]> {
    const res = await request<IEvent[]>({
      method: 'get',
      url: '/api/event',
      config,
    })
    return res
  }

  static async fetchById(id: number): Promise<IEvent> {
    const res = await request<IEvent>({
      method: 'get',
      url: `/api/event/${id}`,
       })
    return res
  }

  static async fetchConfirmed(config?: AxiosRequestConfig): Promise<IEvent[]> {
    const res = await request<IEvent[]>({
      method: 'get',
      url: '/api/event',
      data: {
        s: '{"status": "confirmed"}',
      },
      config,
    })
    return res
  }

  static async fetchEmployeeAvailableSlots(id: number, data: {from: string, to: string}, config?: AxiosRequestConfig): Promise<IAvailableSlot[]> {
    const res = await request<IAvailableSlot[]>({
      method: 'post',
      url: `/api/event/${id}/employeeAvailableSlots`,
      data,
      config,
    })
    return res
  }


  static async update(id: number, data: DeepPartial<IEvent>): Promise<IEvent> {
    const res = await request<IEvent>({
      method: 'patch',
      url: `/api/event/${id}`,
      data,
    })
    return res
  }

  static async create(data: DeepPartial<IEvent>): Promise<IEvent> {
    const res = await request<IEvent>({
      method: 'post',
      url: '/api/event',
      data,
    })
    return res
  }

  static async confirm(id: number, data: {start: string, end: string}): Promise<IEvent> {
    const res = await request<IEvent>({
      method: 'post',
      url: `/api/event/${id}/confirm`,
      data,
    })
    return res
  }
}
