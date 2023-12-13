import nookies from 'nookies'
import { CookiesType } from '@/types/enums'
import {GetServerSidePropsContext, GetServerSidePropsResult, PreviewData} from 'next/types'
import IAboutMe from '@/data/interfaces/IAboutMe'
import AuthRepository from '@/data/repositories/AuthRepository'
import {Routes} from '@/types/routes'
import {GetServerSideProps} from 'next'
import {ParsedUrlQuery} from 'querystring'
import {ProfileType} from '@/data/enum/ProfileType'

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

export  function getAuthServerSideProps<Props extends { [key: string]: any } = { [key: string]: any }>(profileType?: ProfileType | ProfileType[] | null, cb?: GetServerSidePropsAuthCb<Props>): GetServerSideProps<Props >{
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

   console.log('User11', profileType , !Array.isArray(profileType) , user.profileType !== profileType)
   if (profileType && (!Array.isArray(profileType) && user.profileType !== profileType) || (Array.isArray(profileType) && profileType.includes(user.profileType!))) {
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
