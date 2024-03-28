import request from 'utils/request'
import {AxiosRequestConfig} from 'axios/index'
import {IPagination} from '@/data/interfaces/IPaginationRequest'
import {DeepPartial} from '@/types/types'
import ICvNote from '@/data/interfaces/ICvNote'
import {ICvNoteCreateRequest} from '@/data/interfaces/ICvNoteCreateRequest'
import ICvNoteListRequest from '@/data/interfaces/ICvNoteListRequest'

export default class CvNoteRepository {
  static async fetch(data: ICvNoteListRequest, config?: AxiosRequestConfig): Promise<IPagination<ICvNote>> {
    const res = await request<IPagination<ICvNote>>({
      method: 'get',
      url: '/api/cv-note',
      data,
      config,
    })
    return res
  }

  static async update(id: number, data: DeepPartial<ICvNote>): Promise<ICvNote> {
    const res = await request<ICvNote>({
      method: 'patch',
      url: `/api/cv-note/${id}`,
      data,
    })
    return res
  }

  static async create(data: ICvNoteCreateRequest): Promise<ICvNote> {
    const res = await request<ICvNote>({
      method: 'post',
      url: '/api/cv-note',
      data,
    })
    return res
  }

  static async delete(id: number): Promise<ICvNote> {
    const res = await request<ICvNote>({
      method: 'delete',
      url: `/api/cv-note/${id}`,
    })
    return res
  }
}
