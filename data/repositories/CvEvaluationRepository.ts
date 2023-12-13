import request from 'utils/request'
import {AxiosRequestConfig} from 'axios/index'
import {ICvEvaluationRequest} from '@/data/interfaces/ICvEvaluationRequest'
import {ICVEvaluation} from '@/data/interfaces/ICVEvaluation'

export default class CvEvaluationRepository {
  static async fetchEvaluated(data: ICvEvaluationRequest, config?: AxiosRequestConfig): Promise<ICVEvaluation[]> {
    const res = await request<ICVEvaluation[]>({
      method: 'post',
      url: '/api/cv-evaluation/evaluated',
      data,
      config,
    })
    return res
  }

}
