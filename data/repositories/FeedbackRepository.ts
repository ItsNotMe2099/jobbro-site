import request from 'utils/request'
import {ICV} from '@/data/interfaces/ICV'
import IFeedbackCreateRequest from '@/data/interfaces/IFeedbackCreateRequest'

export default class FeedbackRepository {
  static async create(data: IFeedbackCreateRequest): Promise<void> {
    const res = await request<ICV>({
      method: 'post',
      url: '/api/feedback',
      data,
    })
  }
}
