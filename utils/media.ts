import { breakpoints } from 'styles/variables'

function isMedia(media: string, ssrValue = false) {
  if (typeof window === 'object' && window.matchMedia) {
    return window.matchMedia(media).matches
  }
  return ssrValue ?? false
}

export const isXsScreen = () => isMedia(`(max-width: ${breakpoints.xsMax}px)`)
export const isMdScreen = () => isMedia(`(min-width: ${breakpoints.mdMin}px) and (max-width: ${breakpoints.mdMax}px)`)
export const isLgScreen = () => isMedia(`(min-width: ${breakpoints.lgMin}px)`, true)

export const isServer: boolean = typeof window === 'undefined'
export const isClient: boolean = typeof window !== 'undefined'
