import styles from './index.module.scss'
import classNames from 'classnames'
import { useEffect, useRef } from 'react'
import { useAppContext } from 'context/state'
import {colors} from '@/styles/variables'
import BookmarkSvg from '@/components/svg/BookmarkSvg'
import {useCandidateAddedContext} from '@/context/candidate_added_state'
import {Routes} from '@/types/routes'
import {useRouter} from 'next/router'
import ClientOnly from '@/components/visibility/ClientOnly'
import BookmarkOutlinedSvg from '@/components/svg/BookmarkOutlinedSvg'

interface Props {
  id: number
  className?: string
}

export default function CvFavoriteBtn(props: Props) {
  const ref = useRef<HTMLButtonElement>()
  const appContext = useAppContext()
  const router = useRouter()
  const favoriteContext = useCandidateAddedContext()
  const active = favoriteContext.store.includes(props.id)
  const activeRef = useRef<boolean>(active)
  const isLogged = appContext.isLogged
  const isLoggedRef = useRef<boolean>(isLogged)
  useEffect(() => {
    isLoggedRef.current = isLogged
  }, [isLogged])

  useEffect(() => {
    favoriteContext.addRecord(props.id)
  }, [])

  useEffect(() => {
    activeRef.current = active
  }, [active])

  useEffect(() => {
    const prevent = (e: MouseEvent | TouchEvent) => {
      e.preventDefault()
      e.stopPropagation()
    }
    const handleClick = async (e: MouseEvent | TouchEvent) => {
      prevent(e)
      if (!isLoggedRef.current) {
        router.push(Routes.login())
        return
      }
      if (activeRef.current) {
        await favoriteContext.unlike(props.id)
      } else {
        await favoriteContext.like(props.id)
      }
    }
    if (ref.current) {
      ref.current?.addEventListener('mousedown', prevent)
      ref.current?.addEventListener('click', handleClick)
      ref.current?.addEventListener('touchend', handleClick)
      return () => {
        ref.current?.removeEventListener('mousedown', prevent)
        ref.current?.removeEventListener('click', handleClick)
        ref.current?.removeEventListener('touchend', handleClick)
      }
    }
  }, [ref.current])
  return (
    <button
      ref={ref as any}
      className={classNames({
        [styles.root]: true,
        [styles.active]: active,
      }, props.className)}
    >
      <ClientOnly>
        <BookmarkOutlinedSvg color={colors.green} className={classNames({
          [styles.inactiveImage]: true,
          [styles.inactiveImageInvisible]: active,
        })}/>
      </ClientOnly>
      <ClientOnly>
        <BookmarkSvg color={colors.green} className={classNames({
          [styles.activeImage]: true,
          [styles.activeImageVisible]: active,
        })}/>
      </ClientOnly>
    </button>
  )
}

