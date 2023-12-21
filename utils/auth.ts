import nookies from 'nookies'
import { CookiesType } from '@/types/enums'
import {GetServerSidePropsContext, GetServerSidePropsResult, PreviewData} from 'next/types'
import IAboutMe from '@/data/interfaces/IAboutMe'
import AuthRepository from '@/data/repositories/AuthRepository'
import {Routes} from '@/types/routes'
import {GetServerSideProps} from 'next'
import {ParsedUrlQuery} from 'querystring'
import {ProfileType} from '@/data/enum/ProfileType'
import {HirerRole} from '@/data/enum/HirerRole'

export const getToken = (): string | undefined => {
  const cookies = nookies.get(null)
  return cookies[CookiesType.accessToken]
}
export type GetServerSidePropsAuthCb<
    Props extends { [key: string]: any } = { [key: string]: any },
    Params extends ParsedUrlQuery = ParsedUrlQuery,
    Preview extends PreviewData = PreviewData
    > = (
    context: GetServerSidePropsContext<Params, Preview>, user?: IAboutMe
) => Promise<GetServerSidePropsResult<Props>>

export  function getAuthServerSideProps<Props extends { [key: string]: any } = { [key: string]: any }>(profileType?: ProfileType | ProfileType[] | null, arg2?: GetServerSidePropsAuthCb<Props> | HirerRole | HirerRole[] | null | undefined, arg3?: GetServerSidePropsAuthCb<Props>): GetServerSideProps<Props >{
 return async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Props>> => {
   const token = context.req.cookies[CookiesType.accessToken]
   let user: IAboutMe | null = null
   try {
     user = token ? await AuthRepository.fetchAboutMe(token) : null
   } catch (e) {
   }
   if (!token || !user) {
      return {
       redirect: {
         permanent: false,
         destination: Routes.login(context.resolvedUrl),
       },
     }
   }

  const cb = typeof arg2 === 'function' ? arg2 : arg3
   const hirerRole = typeof arg2 !== 'function' && !!arg2 ? arg2 as HirerRole | HirerRole[] : null
   if (profileType && (!Array.isArray(profileType) && user.profileType !== profileType) || (Array.isArray(profileType) && profileType.includes(user.profileType!))) {
     return {
       notFound: true
     }
   }

   if (hirerRole && (!Array.isArray(hirerRole) && user.hirerRole !== hirerRole) || (Array.isArray(hirerRole) && hirerRole.includes(user.hirerRole!))) {
     return {
       notFound: true
     }
   }

   if(cb){
     return cb(context, user)
   }
   return {
     props: {} as Props,
   }
 }
}
