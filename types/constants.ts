import { runtimeConfig } from '@/config/runtimeConfig'

export const CookiesLifeTime: {
  accessToken: number,
  sessionId: number,

} = {
  accessToken: 365 * 3 * 60 * 60 * 24 ,
  sessionId: 365 * 3 * 60 * 60 * 24 ,
}
export const Timers: {
  notificationsRefresh: number,
  dealRefresh: number,
} = {
  notificationsRefresh: 15 * 1000 ,
  dealRefresh: 30 * 1000
}

export const FILES = runtimeConfig.HOST + '/api/asset/files/'

