import {Goal} from '@/types/enums'

export default class Analytics {
  static goal(goal: Goal, data?: any) {
    try {
      if(!(window as any).gtag){
        return
      }
      (window as any).gtag('event', goal as string, data)
    }catch (e) {
      console.error(e)
    }
  }

}
