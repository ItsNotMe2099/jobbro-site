import {format, formatRelative} from 'date-fns'
import { ru } from 'date-fns/locale'

const pluralizeNative = require('numeralize-ru').pluralize

export default class Formatter {
  static pluralize(number: number, word1: string, word2: string, word3: string) {
    return pluralizeNative(number, word1, word2, word3)
  }
  static formatUrl(url: string){
    if(!url){
      return url
    }
    if (!/^https?:\/\//i.test(url)) {
      return  'https://' + url
    }
    return url
  }

  static cleanPhone(phone: string) {
    if (phone) {
      let phoneCleaned = `${phone}`.replace(/[^\+0-9]/g, '')
      if (!phoneCleaned.startsWith('+')) {
        phoneCleaned = '+' + phoneCleaned
      }
      return phoneCleaned
    }
    return phone
  }

  static formatDateUntil(date: string | Date) {
    const formatRelativeLocale: { [key: string]: string } = {
      'yesterday': 'Вчера до HH:mm',
      'today': 'до HH:mm',
      'tomorrow': 'Завтра до HH:mm',
      'other': 'до dd.MM.yyyy HH:mm', // Difference: Add time to the date
    }

    const locale = {
      ...ru,
      formatRelative: (token: string) =>
        formatRelativeLocale[token] || formatRelativeLocale['other'],
    }
    if (!date) {
      return ''
    }
    return formatRelative(typeof date === 'string' ? new Date(date) : date, new Date(), { locale })
  }

  static truncate = (str: string | null, max: number) => {
    return (str?.length || 0) < max ? str :
      `${str!.substr(0, max)}...`
  }

  static formatDateRelative(date: string | Date) {
    if (!date) {
      return ''
    }
    const formatRelativeLocale: { [key: string]: string } = {
      'yesterday': 'Вчера HH:mm',
      'today': 'Сегодня HH:mm',
      'tomorrow': 'Завтра до HH:mm',
      'other': 'dd MMMM yyyy HH:mm'
    }

    const locale = {
      ...ru,
      formatRelative: (token: string) =>
        formatRelativeLocale[token] || formatRelativeLocale['other'],
    }

    return formatRelative(typeof date === 'string' ? new Date(date) : date, new Date(), { locale })
  }


  static formatDateTime(date: string | Date) {
    return format(typeof date === 'string' ? new Date(date) : date,'dd.MM.yyyy HH:MM')
  }
  static formatDate(date: string | Date) {
    const newDate = new Date(date)
    if (!date|| String(newDate) === 'Invalid Date') {
      return ''
    }
    return format(typeof date === 'string' ? newDate : date,'dd MMM yyyy ')
  }

  static pad(pad: string, str: string, padLeft = true) {
    if (typeof str === 'undefined')
      return pad
    if (padLeft) {
      return (pad + str).slice(-pad.length)
    } else {
      return (str + pad).substring(0, pad.length)
    }
  }

  static formatNumber(num: number | string, separator?: string) {
    const str = typeof  num === 'string' ? num : num?.toString()
    const result = str.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')
    return result
  }


  static formatPrice(price?: number, suffix?: string): string {
    if (!price) {
      return ''
    }
    return `${this.formatNumber(price)} ${suffix ?? '$'}`
  }
  static formatDeliveryPrice(price?: number): string {
    if (!price) {
      return ''
    }
    return this.formatPrice(price, '₽/т')
  }

  static formatTimeString(time: string) {
    if (!time) {
      return ''
    }
    const parts = time.split(':')

    return `${parts[0]}:${parts[1]}`
  }


  static formatSize(bytes: number | undefined) {
    const sufixes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    const i = Math.floor(Math.log(bytes ?? 0) / Math.log(1024))
    return !bytes && '' || ((bytes ?? 0) / Math.pow(1024, i)).toFixed(2) + ' ' + sufixes[i]
  };
  static formatRangeMonthYear({fromMonth, fromYear, toMonth, toYear}: {fromMonth: number, fromYear: number, toMonth: number, toYear: number}){
    return [[fromMonth, fromYear].filter(i => !!i).join(' '),[toMonth, toYear].filter(i => !!i).join(' ')].filter(i => !!i).join(' — ')
  }

  static formatRangeYear(fromYear: number, toYear: number){
    return [fromYear, toYear].filter(i => !!i).join(' — ')
  }

}

export const pad = Formatter.pad
