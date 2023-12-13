import {Nullable} from '@/types/types'
import {SalaryType} from '@/data/enum/SalaryType'
import Dictionary from '@/utils/Dictionary'
import Formatter from '@/utils/formatter'
import CurrencyUtils from '@/utils/CurrencyUtils'
import {differenceInDays, intervalToDuration, lastDayOfMonth} from 'date-fns'
import {ExperienceInfo} from '@/data/interfaces/Common'

export default class VacancyUtils {
  static formatSalary(data: {
    currency: string
    salaryMin?: Nullable<number>
    salaryMax?: Nullable<number>
    salaryType?: Nullable<SalaryType>}): string {
    const values = [data.salaryMin, data.salaryMax].filter(i => !!i).map(i => Formatter.formatNumber(i!))

    return `${values.join(' - ')}${data.currency ? `${CurrencyUtils.getCurrentSymbol(data.currency!)}` : ''}${data.salaryType ? `/${Dictionary.getSalaryTypeShortName(data.salaryType!)}` : ''}`
  }

  static formatRangeMonthYearToDuration({fromMonth, fromYear, toMonth, toYear}: {fromMonth: number, fromYear: number, toMonth: number, toYear: number}){
    const start = (fromMonth || fromYear) ? new Date(fromYear || (new Date()).getFullYear() , fromMonth || 0, 1, 0, 0, 0, 0) : new Date()

    const monthDay = toMonth ? lastDayOfMonth(new Date(toYear || (new Date()).getFullYear(), toMonth, 1)) : lastDayOfMonth(new Date(toYear || (new Date()).getFullYear(), !toYear || toYear === (new Date()).getFullYear() ?  (new Date()).getMonth() : 11 , 1))

    let end = new Date(toYear || (new Date()).getFullYear() , toMonth || toYear === (new Date()).getFullYear() ?  (new Date()).getMonth() : 11 , monthDay.getDate(), 24, 24, 59, 9999)
    if(toYear === 1999){
      console.log('dsadsd',monthDay, start, end)
    }
    const { days, months, years } = intervalToDuration({ start, end })
    return [
      ...(years ? [`${years} ${Formatter.pluralize(years, 'year', 'years', 'years')} `] : []),
      ...(months ? [`${months} ${Formatter.pluralize(months, 'month', 'months', 'months')} `] : []),
      ...(!years && !months && days ? [`${days} ${Formatter.pluralize(days, 'day', 'days', 'days')} `] : [])
    ].join(' ')
  }

  static getTotalExperienceDuration(expirence: ExperienceInfo[]){
    const data = expirence.map(({fromMonth, fromYear, toMonth, toYear}) => {
      const start = (fromMonth || fromYear) ? new Date(fromYear || (new Date()).getFullYear() , fromMonth || 1, 1, 0, 0, 0, 0) : new Date()
      const monthDay = toMonth ? lastDayOfMonth(new Date(toYear || (new Date()).getFullYear(), toMonth, 1)) : lastDayOfMonth(new Date(toYear || (new Date()).getFullYear(), !toYear || toYear === (new Date()).getFullYear() ?  (new Date()).getMonth() : 12 , 1))
      let end = (toMonth || toYear)  ? new Date(toYear || (new Date()).getFullYear() , toMonth || toYear === (new Date()).getFullYear() ?  (new Date()).getMonth() : 12 , monthDay.getDate(), 0, 0, 0, 0) : new Date()
      return {start, end, toNow: (!toMonth && !toYear)}
    }).sort((a, b) => a.start.getTime() - b.start.getTime())

    const filterToNow = data.filter(i => i.toNow)
    const dataNoNow = data.filter(i => !i.toNow)
    const sum = dataNoNow.reduce((sum,i) => sum + differenceInDays(i.end ?? new Date(), i.start),0)

    const daysExperienceToNow = (filterToNow?.length > 0 ? differenceInDays(filterToNow[0].end ?? new Date(), filterToNow[0].start) : 0)
    const daysExperienceSubstractNow = filterToNow?.length > 0 ? dataNoNow.filter((i) => i.start.getTime() >= filterToNow[0].start.getTime()).reduce((sum,i) => sum + differenceInDays(i.end ?? new Date(), i.start),0) : 0
    const totalDays = sum + daysExperienceToNow - daysExperienceSubstractNow
    const { days, months, years } = intervalToDuration({ start: 0, end: totalDays * 24 * 60 * 60 * 1000 })

    return [
      ...(years ? [`${years} ${Formatter.pluralize(years, 'year', 'years', 'years')} `] : []),
      ...(months ? [`${months} ${Formatter.pluralize(months, 'month', 'months', 'months')} `] : []),
      ...(!years && !months && days ? [`${days} ${Formatter.pluralize(days, 'day', 'days', 'days')} `] : [])
    ].join(' ')
  }

}
