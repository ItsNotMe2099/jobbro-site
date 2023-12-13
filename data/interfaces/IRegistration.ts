
export interface IRegistrationComplete {
  firstName : string,
  lastName : string,
  password : string,
  phone?: string,
  countryId?: number|undefined,
  cityId?: number|undefined,
  telegramNickname : string,
  email: string,
  company?: string|undefined,
}

export interface ILogin {
  login: string,
  password: string
}

export interface IRegistrationPhone {
  phone: string,
  code?: string
}

export interface ICodeResponse {
  code: string,
  codeCanRetryIn: number,
  codeExpiredAt: string, //type Date
  success: boolean
}

export interface ILoginFormData {
  email?: string,
  phone?: string
}

export interface IToken {
  expiresIn: number,
  accessToken: string
}
