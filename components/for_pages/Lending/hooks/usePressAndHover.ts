import { RefObject, useEffect, useRef, useState } from 'react'

export default function usePressAndHover(): [RefObject<any>, boolean, boolean] {
  const ref = useRef<HTMLButtonElement | HTMLDivElement | HTMLLinkElement>(null)
  const [hover, setHover] = useState(false)
  const [press, setPress] = useState(false)

  const handleMouseOver = () => setHover(true)
  const handleMouseOut = () => {
    setHover(false)
    setPress(false)
  }
  const handleMouseDown = () => setPress(true)
  const handleMouseUp = () => setPress(false)

  useEffect(() => {
    const node = ref.current
    if (node) {
      node.addEventListener('mouseover', handleMouseOver)
      node.addEventListener('mouseout', handleMouseOut)
      node.addEventListener('mousedown', handleMouseDown)
      node.addEventListener('mouseup', handleMouseUp)
      node.addEventListener('touchstart', handleMouseDown)
      node.addEventListener('touchend', handleMouseUp)
      return () => {
        node.removeEventListener('mouseover', handleMouseOver)
        node.removeEventListener('mouseout', handleMouseOut)
        node.removeEventListener('mousedown', handleMouseDown)
        node.removeEventListener('mouseup', handleMouseUp)
        node.removeEventListener('touchstart', handleMouseDown)
        node.removeEventListener('touchend', handleMouseUp)
      }
    }
  }, [ref.current])

  return [ref, press, hover]
}
