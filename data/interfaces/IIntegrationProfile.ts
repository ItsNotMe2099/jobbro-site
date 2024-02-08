import {IntegrationPlatform} from '@/data/enum/IntegrationPlatform'

export interface IIntegrationProfile {
  id: number
  platform: IntegrationPlatform
  clientId: string
  clientSecret: string
  details: any

}
