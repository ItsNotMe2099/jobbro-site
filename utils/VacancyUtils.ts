import {Nullable} from '@/types/types'
import {SalaryType} from '@/data/enum/SalaryType'
import Dictionary from '@/utils/Dictionary'
import Formatter from '@/utils/formatter'
import CurrencyUtils from '@/utils/CurrencyUtils'

export default class VacancyUtils {
  static formatSalary(data: {
    currency: string
    salaryMin?: Nullable<number>
    salaryMax?: Nullable<number>
    salaryType?: Nullable<SalaryType>}): string {
    const values = [data.salaryMin, data.salaryMax].filter(i => !!i).map(i => Formatter.formatNumber(i!))

    return `${values.join(' - ')}${data.currency ? `${CurrencyUtils.getCurrentSymbol(data.currency!)}` : ''}${data.salaryType ? `/${Dictionary.getSalaryTypeShortName(data.salaryType!)}` : ''}`
  }

}
