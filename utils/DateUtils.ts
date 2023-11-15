import {format, formatRelative, isSameYear} from 'date-fns'
import {ru} from 'date-fns/locale'
import {utcToZonedTime} from 'date-fns-tz'


function padStart(num: number, val = 2) {
  const numStr = `${num}`

  if (numStr.length >= val) {
    return num
  }

  return `0000${numStr}`.slice(-val)
}

function getYear(date: Date | number): number {
  if (date instanceof Date) {
    return date.getFullYear()
  }

  if (typeof date === 'number') {
    return date
  }

  const year = parseInt(date, 10)

  if (typeof date === 'string' && !isNaN(year)) {
    return year
  }

  throw new Error(`Failed to get year from date: ${date}.`)
}

/**
 * Gets month from date.
 *
 * @param {Date} date Date to get month from.
 */
function getMonth(date: Date | number) {
  if (date instanceof Date) {
    return date.getMonth()
  }

  throw new Error(`Failed to get month from date: ${date}.`)
}
function getMonthHuman(date: Date) {
  return date.getMonth() + 1

  throw new Error(`Failed to get human-readable month from date: ${date}.`)
}
function getDate(date: Date | number) {
  if (date instanceof Date) {
    return date.getDate()
  }

  throw new Error(`Failed to get year from date: ${date}.`)
}

function getHours(date: Date | string) {
  if (date instanceof Date) {
    return date.getHours()
  }

  const datePieces = date.split(':')
  if (datePieces.length >= 2) {
    const hoursString = datePieces[0]
    const hours = parseInt(hoursString, 10)

    if (!isNaN(hours)) {
      return hours
    }
  }

  throw new Error(`Failed to get hours from date: ${date}.`)
}

/**
 * Gets minutes from date.
 *
 * @param {Date|string} date Date to get minutes from.
 */
function getMinutes(date: Date | string) {
  if (date instanceof Date) {
    return date.getMinutes()
  }

  if (typeof date === 'string') {
    const datePieces = date.split(':')

    if (datePieces.length >= 2) {
      const minutesString = datePieces[1] || 0
      const minutes = parseInt(`${minutesString}`, 10)

      if (!isNaN(minutes)) {
        return minutes
      }
    }
  }

  throw new Error(`Failed to get minutes from date: ${date}.`)
}

/**
 * Gets seconds from date.
 *
 * @param {Date|string} date Date to get seconds from.
 */
function getSeconds(date: Date | string) {
  if (date instanceof Date) {
    return date.getSeconds()
  }

  if (typeof date === 'string') {
    const datePieces = date.split(':')

    if (datePieces.length >= 2) {
      const secondsString = datePieces[2] || 0
      const seconds = parseInt(`${secondsString}`, 10)

      if (!isNaN(seconds)) {
        return seconds
      }
    }
  }

  throw new Error(`Failed to get seconds from date: ${date}.`)
}
function getHoursMinutesSeconds(date: Date) {
  const hours = padStart(getHours(date))
  const minutes = padStart(getMinutes(date))
  const seconds = padStart(getSeconds(date))

  return `${hours}:${minutes}:${seconds}`
}
export default class DateUtils {

  static getISOLocalDate(date: Date) {
    const year = padStart(getYear(date), 4)
    const month = padStart(getMonthHuman(date))
    const day = padStart(getDate(date))

    return `${year}-${month}-${day}`
  }


  static getISOLocalDateTime(date: Date) {
    return `${this.getISOLocalDate(date)}T${getHoursMinutesSeconds(date)}`
  }
  static formatDateUtc(date: string | Date, _format: string){
    return format(utcToZonedTime(typeof date === 'string' ? new Date(date) : date, 'UTC'), _format, {locale: ru})
  }
  static formatDate(date: string | Date, _format: string){
    return format(typeof date === 'string' ? new Date(date) : date, _format, {locale: ru})
  }

  static formatDateRelativeUtc = (_date: string | Date, showTime: boolean = true) => {
    const date = utcToZonedTime(typeof _date === 'string' ? new Date(_date) : _date, 'UTC')
    return this.formatDateRelative(date, {showTime: true})
  }
  static formatDateRelative(date: string | Date,{showTime, shortMonth}: {showTime?: boolean, shortMonth?: boolean} = {shortMonth: false, showTime: false}){
    const formatRelativeLocale: {[key: string] : string} = {
      yesterday: 'Вчера в HH:mm',
      today: 'Сегодня в HH:mm',
      other:  isSameYear(new Date(), new Date(date)) ? 'dd MMMM HH:mm' : 'dd MMMM yyyy HH:mm',
    }
    const locale = {
      ...ru,
      formatRelative: (token: string) => formatRelativeLocale[token] || formatRelativeLocale['other'],
    }
    if (!date) {
      return ''
    }

    return formatRelative(new Date(date), new Date(), { locale })
  }

  static formatDateRelativeShort(date: string | Date){
    const formatRelativeLocale: {[key: string] : string} = {
      yesterday: 'Вчера',
      today: 'HH:mm',
      other:  isSameYear(new Date(), new Date(date)) ? 'dd.MM' : 'dd.MM.yy',
    }
    const locale = {
      ...ru,
      formatRelative: (token: string) => formatRelativeLocale[token] || formatRelativeLocale['other'],
    }
    if (!date) {
      return ''
    }

    return formatRelative(new Date(date), new Date(), { locale })
  }

}

