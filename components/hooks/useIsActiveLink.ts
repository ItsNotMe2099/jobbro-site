import { useRouter } from 'next/router'

export default function useIsActiveLink(href: string): boolean {
  const { asPath } = useRouter()
  if (href === '/' && asPath === '/') {
    return true
  }
  console.log('greg111', href)
  const hrefKey = href ? href.replace('/', '') : ''
  return hrefKey ? asPath.replace('/', '').includes(hrefKey) : false
}
