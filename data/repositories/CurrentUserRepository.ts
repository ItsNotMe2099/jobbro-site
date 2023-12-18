import request from 'utils/request'
import {ICurrentUserUpdateRequest} from '@/data/interfaces/ICurrentUserUpdateRequest'
import {IProfile} from '@/data/interfaces/IProfile'

export default class CurrentUserRepository {

  static async update(data: ICurrentUserUpdateRequest): Promise<IProfile> {
    const res = await request<IProfile>({
      method: 'post',
      url: '/api/auth/currentUser',
      data,
    })
    return res
  }


  static async delete(): Promise<IProfile> {
    const res = await request<IProfile>({
      method: 'delete',
      url: '/api/profile/current',
    })
    return res
  }

}
