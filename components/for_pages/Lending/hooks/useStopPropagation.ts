import { RefObject, useEffect } from 'react'

export default function useStopPropagation(ref: RefObject<any>, disabled = false) {
  useEffect(() => {
    const node = ref.current
    const stopPropagation = (e: MouseEvent | TouchEvent) => {
      if (!disabled) {
        e.stopPropagation()
      }
    }
    if (node && !disabled) {
      node.addEventListener('mousedown', stopPropagation)
      node.addEventListener('mouseup', stopPropagation)
      node.addEventListener('touchstart', stopPropagation)
      node.addEventListener('touchend', stopPropagation)
      return () => {
        node.removeEventListener('mousedown', stopPropagation)
        node.removeEventListener('mouseup', stopPropagation)
        node.removeEventListener('touchstart', stopPropagation)
        node.removeEventListener('touchend', stopPropagation)
      }
    }
  }, [ref.current])
}
