import {addDays, endOfWeek, format, startOfWeek, formatRelative, isSameYear} from 'date-fns'
import { ru } from 'date-fns/locale'
import getUserLocale from 'get-user-locale'
import {utcToZonedTime} from 'date-fns-tz'

function makeGetEdgeOfNeighbor(getPeriod: (date: Date | number) => number, getEdgeOfPeriod: (per: Date | number) => Date, defaultOffset: number) {
  return function makeGetEdgeOfNeighborInternal(date: Date | number, offset = defaultOffset) {
    const previousPeriod = getPeriod(date) + offset
    return getEdgeOfPeriod(previousPeriod)
  }
}

function makeGetEnd(getBeginOfNextPeriod: (date: Date | number) => Date): (date: Date | number) => Date {
  return function makeGetEndInternal(date: Date | number) {
    return new Date(getBeginOfNextPeriod(date).getTime() - 1)
  }
}

type GetRangeFunc = (date: Date | number) => Date
function makeGetRange(functions: GetRangeFunc[]) {
  return function makeGetRangeInternal(date: Date) {
    return functions.map((fn) => fn(date))
  }
}

/**
 * Simple getters - getting a property of a given point in time
 */

/**
 * Gets year from date.
 *
 * @param {Date|number|string} date Date to get year from.
 */
export function getYear(date: Date | number): number {
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
export function getMonth(date: Date | number) {
  if (date instanceof Date) {
    return date.getMonth()
  }

  throw new Error(`Failed to get month from date: ${date}.`)
}

/**
 * Gets human-readable month from date.
 *
 * @param {Date} date Date to get human-readable month from.
 */
export function getMonthHuman(date: Date) {
  return date.getMonth() + 1

  throw new Error(`Failed to get human-readable month from date: ${date}.`)
}

/**
 * Gets human-readable day of the month from date.
 *
 * @param {Date} date Date to get day of the month from.
 */
export function getDate(date: Date | number) {
  if (date instanceof Date) {
    return date.getDate()
  }

  throw new Error(`Failed to get year from date: ${date}.`)
}

/**
 * Gets hours from date.
 *
 * @param {Date|string} date Date to get hours from.
 */
export function getHours(date: Date | string) {
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
export function getMinutes(date: Date | string) {
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
export function getSeconds(date: Date | string) {
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

/**
 * Century
 */

export function getCenturyStart(date: Date | number) {
  const year = getYear(date)
  const centuryStartYear = year + ((-year + 1) % 100)
  const centuryStartDate = new Date()
  centuryStartDate.setFullYear(centuryStartYear, 0, 1)
  centuryStartDate.setHours(0, 0, 0, 0)
  return centuryStartDate
}
export const getPreviousCenturyStart = makeGetEdgeOfNeighbor(getYear, getCenturyStart, -100)
export const getNextCenturyStart = makeGetEdgeOfNeighbor(getYear, getCenturyStart, 100)

export const getCenturyEnd = makeGetEnd(getNextCenturyStart)
export const getPreviousCenturyEnd = makeGetEdgeOfNeighbor(getYear, getCenturyEnd, -100)
export const getNextCenturyEnd = makeGetEdgeOfNeighbor(getYear, getCenturyEnd, 100)

export const getCenturyRange = makeGetRange([getCenturyStart, getCenturyEnd])

/**
 * Decade
 */

export function getDecadeStart(date: Date | number) {
  const year = getYear(date)
  const decadeStartYear = year + ((-year + 1) % 10)
  const decadeStartDate = new Date()
  decadeStartDate.setFullYear(decadeStartYear, 0, 1)
  decadeStartDate.setHours(0, 0, 0, 0)
  return decadeStartDate
}
export const getPreviousDecadeStart = makeGetEdgeOfNeighbor(getYear, getDecadeStart, -10)
export const getNextDecadeStart = makeGetEdgeOfNeighbor(getYear, getDecadeStart, 10)

export const getDecadeEnd = makeGetEnd(getNextDecadeStart)
export const getPreviousDecadeEnd = makeGetEdgeOfNeighbor(getYear, getDecadeEnd, -10)
export const getNextDecadeEnd = makeGetEdgeOfNeighbor(getYear, getDecadeEnd, 10)

export const getDecadeRange = makeGetRange([getDecadeStart, getDecadeEnd])

/**
 * Year
 */

export function getYearStart(date: Date | number): Date {
  const year = getYear(date)
  const yearStartDate = new Date()
  yearStartDate.setFullYear(year, 0, 1)
  yearStartDate.setHours(0, 0, 0, 0)
  return yearStartDate
}
export const getPreviousYearStart = makeGetEdgeOfNeighbor(getYear, getYearStart, -1)
export const getNextYearStart = makeGetEdgeOfNeighbor(getYear, getYearStart, 1)

export const getYearEnd = makeGetEnd(getNextYearStart)
export const getPreviousYearEnd = makeGetEdgeOfNeighbor(getYear, getYearEnd, -1)
export const getNextYearEnd = makeGetEdgeOfNeighbor(getYear, getYearEnd, 1)

export const getYearRange = makeGetRange([getYearStart, getYearEnd])

/**
 * Month
 */

function makeGetEdgeOfNeighborMonth(getEdgeOfPeriod: (date: Date | number) => Date, defaultOffset: number) {
  return function makeGetEdgeOfNeighborMonthInternal(date: Date | number, offset = defaultOffset) {
    const year = getYear(date)
    const month = getMonth(date) + offset
    const previousPeriod = new Date()
    previousPeriod.setFullYear(year, month, 1)
    previousPeriod.setHours(0, 0, 0, 0)
    return getEdgeOfPeriod(previousPeriod)
  }
}

export function getMonthStart(date: Date | number) {
  const year = getYear(date)
  const month = getMonth(date)
  const monthStartDate = new Date()
  monthStartDate.setFullYear(year, month, 1)
  monthStartDate.setHours(0, 0, 0, 0)
  return monthStartDate
}
export const getPreviousMonthStart = makeGetEdgeOfNeighborMonth(getMonthStart, -1)
export const getNextMonthStart = makeGetEdgeOfNeighborMonth(getMonthStart, 1)

export const getMonthEnd = makeGetEnd(getNextMonthStart)
export const getPreviousMonthEnd = makeGetEdgeOfNeighborMonth(getMonthEnd, -1)
export const getNextMonthEnd = makeGetEdgeOfNeighborMonth(getMonthEnd, 1)

export const getMonthRange = makeGetRange([getMonthStart, getMonthEnd])

/**
 * Day
 */

function makeGetEdgeOfNeighborDay(getEdgeOfPeriod: (date: Date) => Date, defaultOffset: number) {
  return function makeGetEdgeOfNeighborDayInternal(date: Date | number, offset = defaultOffset) {
    const year = getYear(date)
    const month = getMonth(date)
    const day = getDate(date) + offset
    const previousPeriod = new Date()
    previousPeriod.setFullYear(year, month, day)
    previousPeriod.setHours(0, 0, 0, 0)
    return getEdgeOfPeriod(previousPeriod)
  }
}

export function getDayStart(date: Date | number) {
  const year = getYear(date)
  const month = getMonth(date)
  const day = getDate(date)
  const dayStartDate = new Date()
  dayStartDate.setFullYear(year, month, day)
  dayStartDate.setHours(0, 0, 0, 0)
  return dayStartDate
}
export const getPreviousDayStart = makeGetEdgeOfNeighborDay(getDayStart, -1)
export const getNextDayStart = makeGetEdgeOfNeighborDay(getDayStart, 1)

export const getDayEnd = makeGetEnd(getNextDayStart)
export const getPreviousDayEnd = makeGetEdgeOfNeighborDay(getDayEnd, -1)
export const getNextDayEnd = makeGetEdgeOfNeighborDay(getDayEnd, 1)

export const getDayRange = makeGetRange([getDayStart, getDayEnd])

/**
 * Other
 */

/**
 * Returns a number of days in a month of a given date.
 *
 * @param {Date} date Date.
 */
export function getDaysInMonth(date: Date) {
  return getDate(getMonthEnd(date))
}

function padStart(num: number, val = 2) {
  const numStr = `${num}`

  if (numStr.length >= val) {
    return num
  }

  return `0000${numStr}`.slice(-val)
}

/**
 * Returns local hours and minutes (hh:mm).
 */
export function getHoursMinutes(date: Date) {
  const hours = padStart(getHours(date))
  const minutes = padStart(getMinutes(date))

  return `${hours}:${minutes}`
}

/**
 * Returns local hours, minutes and seconds (hh:mm:ss).
 */
export function getHoursMinutesSeconds(date: Date) {
  const hours = padStart(getHours(date))
  const minutes = padStart(getMinutes(date))
  const seconds = padStart(getSeconds(date))

  return `${hours}:${minutes}:${seconds}`
}

/**
 * Returns local month in ISO-like format (YYYY-MM).
 */
export function getISOLocalMonth(date: Date) {
  const year = padStart(getYear(date), 4)
  const month = padStart(getMonthHuman(date))

  return `${year}-${month}`
}

/**
 * Returns local date in ISO-like format (YYYY-MM-DD).
 */
export function getISOLocalDate(date: Date) {
  const year = padStart(getYear(date), 4)
  const month = padStart(getMonthHuman(date))
  const day = padStart(getDate(date))

  return `${year}-${month}-${day}`
}

/**
 * Returns local date & time in ISO-like format (YYYY-MM-DDThh:mm:ss).
 */
export function getISOLocalDateTime(date: Date) {
  return `${getISOLocalDate(date)}T${getHoursMinutesSeconds(date)}`
}
export const formatDateUtc = (date: string | Date, _format: string) => {
  return format(utcToZonedTime(typeof date === 'string' ? new Date(date) : date, 'UTC'), _format, {locale: ru})
}
export const formatDate = (date: string | Date, _format: string) => {
  return format(typeof date === 'string' ? new Date(date) : date, _format, {locale: ru})
}

export const formatDateRelativeUtc = (_date: string | Date, showTime: boolean = true) => {
 const date = utcToZonedTime(typeof _date === 'string' ? new Date(_date) : _date, 'UTC')
  return formatDateRelative(date, showTime)
}
export const formatDateRelative = (date: string | Date, showTime: boolean = true) => {
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

const formatMonthYearOptions: Intl.DateTimeFormatOptions = { month: 'long', year: 'numeric' }
const formatYearOptions: Intl.DateTimeFormatOptions = { year: 'numeric' }

const getFormatter = (options: Intl.DateTimeFormatOptions) => {
  return (locale: string, date: Date) => date.toLocaleString(locale || getUserLocale(), options)
}
const getSafeFormatter = (options: Intl.DateTimeFormatOptions) => {
  return (locale: string, date: Date) => getFormatter(options)(locale, toSafeHour(date))
}
const toSafeHour = (date: Date | string) => {
  const safeDate = new Date(date)
  return new Date(safeDate.setHours(12))
}
const toYearLabel = (locale: string, formatYear: (locale: string, date: Date) => string | null, dates: Date[]) => {
  return dates
    .map((date) => formatYear(locale, date))
    .join(' – ')
}


export const formatMonthYear = getSafeFormatter(formatMonthYearOptions)
export const formatYear = getSafeFormatter(formatYearOptions)


export const getCenturyLabel = (locale: string, formatYear:(locale: string, date: Date) => string | null, date: Date) => {
  return toYearLabel(locale, formatYear, getCenturyRange(date))
}


export const getDecadeLabel = (locale: string, formatYear: (locale: string, date: Date) => string | null, date: Date) => {
  return toYearLabel(locale, formatYear, getDecadeRange(date))
}

export const getBeginPrevious = (rangeType: string, date: Date) => {
  switch (rangeType) {
    case 'century':
      return getPreviousCenturyStart(date)
    case 'decade':
      return getPreviousDecadeStart(date)
    case 'year':
      return getPreviousYearStart(date)
    case 'month':
      return getPreviousMonthStart(date)
    case 'week':
      return startOfWeek(new Date(date.getTime()  - 7 * 24 * 60 * 60 * 1000))
    case 'day':
      return addDays(date, -1)
    default:
      throw new Error(`Invalid rangeType: ${rangeType}`)
  }
}

export const getBeginNext = (rangeType: string, date: Date) => {
  switch (rangeType) {
    case 'century':
      return getNextCenturyStart(date)
    case 'decade':
      return getNextDecadeStart(date)
    case 'year':
      return getNextYearStart(date)
    case 'month':
      return getNextMonthStart(date)
    case 'week':
      return startOfWeek(new Date(date.getTime()  + 7 * 24 * 60 * 60 * 1000))
    case 'day':
      return addDays(date, 1)
    default:
      throw new Error(`Invalid rangeType: ${rangeType}`)
  }
}



export const getEndPrevious = (rangeType: string, date: Date) => {
  switch (rangeType) {
    case 'century':
      return getPreviousCenturyEnd(date)
    case 'decade':
      return getPreviousDecadeEnd(date)
    case 'year':
      return getPreviousYearEnd(date)
    case 'month':
      return getPreviousMonthEnd(date)
    case 'week':
      return endOfWeek(new Date(date.getTime()  - 7 * 24 * 60 * 60 * 1000))
    case 'day':
      return addDays(date, -1)
    default:
      throw new Error(`Invalid rangeType: ${rangeType}`)
  }
}

export const getEndNext = (rangeType: string, date: Date) => {
  switch (rangeType) {
    case 'century':
      return getNextCenturyEnd(date)
    case 'decade':
      return getNextDecadeEnd(date)
    case 'year':
      return getNextYearEnd(date)
    case 'month':
      return getNextMonthEnd(date)
    case 'week':
      return startOfWeek(new Date(date.getTime()  + 7 * 24 * 60 * 60 * 1000))
    case 'day':
      return addDays(date, 1)
    default:
      throw new Error(`Invalid rangeType: ${rangeType}`)
  }
}
export const getBegin = (rangeType: string, date: Date) => {
  switch (rangeType) {
    case 'century': return getCenturyStart(date)
    case 'decade': return getDecadeStart(date)
    case 'year': return getYearStart(date)
    case 'month': return getMonthStart(date)
    case 'week': return startOfWeek(date)
    case 'day': return getDayStart(date)
    default: throw new Error(`Invalid rangeType: ${rangeType}`)
  }
}


export const getEnd = (rangeType: string, date: Date) => {
  switch (rangeType) {
    case 'century': return getCenturyEnd(date)
    case 'decade': return getDecadeEnd(date)
    case 'year': return getYearEnd(date)
    case 'month': return getMonthEnd(date)
    case 'week': return endOfWeek(date)
    case 'day': return getDayEnd(date)
    default: throw new Error(`Invalid rangeType: ${rangeType}`)
  }
}

export const getNearestDate = (dates: Date[], targetDate: Date) => {
  const sortedByDiff = [...dates].sort((a,b) => {
    return Math.abs(a.getTime() - targetDate.getTime()) - Math.abs(b.getTime() - targetDate.getTime())
  })
  return sortedByDiff[0]
}
export function getDatesBetween (startDate: Date, endDate: Date) {
  const dates = []
  let currentDate = startDate

  while (currentDate <= endDate) {
    dates.push(currentDate)
    currentDate =addDays(currentDate, 1)
  }
  return dates
}

export function getMissingDates(dates: Date[]){
  const missingDates = []
  for (let i = 1; i < dates.length; i++)
  {
    const daysDiff = ((dates[i].getTime() - dates[i - 1].getTime()) / 86400000) - 1
    for (var j = 1; j <= daysDiff; j++)
    {
      const missingDate = new Date(dates[i - 1])
      missingDate.setDate(dates[i - 1].getDate() + j)
      missingDates.push(missingDate)
    }
  }
  return missingDates
}
