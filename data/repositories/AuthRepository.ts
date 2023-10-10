import request from 'utils/request'
import {ISendCodeResponse} from '@/data/interfaces/ISendCodeResponse'
import {IAuthResponse} from '@/data/interfaces/IAuthResponse'
import {IPasswordChangeRequest} from '@/data/interfaces/IPasswordChangeRequest'
import {IProfile} from '@/data/interfaces/IProfile'

export default class AuthRepository {


  static async register(data: { firstName: string, email: string, password: string }): Promise<IAuthResponse> {
    const res = await request<IAuthResponse>({
      url: '/api/auth/register',
      method: 'post',
      data,
    })
    return res
  }


  static async emailConfirmation(data: { email: string, code: string }): Promise<IAuthResponse> {
    const res = await request<IAuthResponse>({
        method: 'post',
        url: '/api/auth/seller/complete-registration',
        data,
      }
    )
    return res
  }

  static async passwordReset(login: string): Promise<ISendCodeResponse> {
    const res = await request<ISendCodeResponse>({
      method: 'post',
      url: '/api/auth/passwordReset',
      data: {
        login
      },
    })
    return res
  }

  static async passwordSet(data: { code: string, newPassword: string, login: string }): Promise<IAuthResponse> {
    const res = await request<IAuthResponse>({
      method: 'post',
      url: '/api/auth/passwordSet',
      data,
    })
    return res
  }


  static async registrationComplete(data: { code: string, newPassword: string, login: string }): Promise<IAuthResponse> {
    const res = await request<IAuthResponse>({
      method: 'post',
      url: '/api/auth/passwordSet',
      data,
    })
    return res
  }


  static async login(login: string, password: string): Promise<string> {
    const res = await request<{ accessToken: string }>({
      method: 'post',
      url: '/api/auth/login',
      data: {
        login,
        password
      },
    })
    return res.accessToken
  }

  static async passwordChange(data: IPasswordChangeRequest): Promise<boolean> {
    const res = await request<boolean>({
      method: 'post',
      url: '/api/auth/changePassword',
      data,
    })
    return res
  }


  static async confirmEmail(data: { email: string, code: string }): Promise<IAuthResponse> {
    const res = await request<IAuthResponse>({
        method: 'get',
        url: '/api/auth/emailConfirmation',
        data
      }
    )
    return res
  }

  static async checkLoginExists(login: string): Promise<IAuthResponse> {
    const res = await request<IAuthResponse>({
        method: 'get',
        url: '/api/auth/checkLogin',
        data: {
          login
        }
      }
    )
    return res
  }


  static async fetchAboutMe(token?: string): Promise<IProfile> {
    return request({url: '/api/auth/currentUser', token})
  }
}
