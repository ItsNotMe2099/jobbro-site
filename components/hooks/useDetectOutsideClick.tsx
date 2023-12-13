import { useState, useEffect, MutableRefObject } from 'react'

export const useDetectOutsideClick = (el: any, initialState: any) => {
  const [isActive, setIsActive] = useState(initialState)

  useEffect(() => {
    const pageClickEvent = (e: any) => {
      // If the active element exists and is clicked outside of
      if (el?.current?.contains(e.target)) {
        return
      }
      else if (el.current !== null && !el.current?.contains(e.target)) {
        setIsActive(!isActive)
        document.removeEventListener('click', pageClickEvent)
      }

    }

    // If the item is active (ie open) then listen for clicks
    if (isActive) {
      setTimeout(() => {
        document.addEventListener('click', pageClickEvent)
      }, 300)

    }

    return () => {
      window.removeEventListener('click', pageClickEvent)
    }

  }, [isActive, el])
  return [isActive, setIsActive]
}

export const useOnClickOutside = (ref: any, handler: any) => {
  useEffect(
    () => {
      const listener = (event: any) => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target)) {
          return
        }
        handler(event)
      }
      document.addEventListener('mousedown', listener)
      document.addEventListener('touchstart', listener)
      return () => {
        document.removeEventListener('mousedown', listener)
        document.removeEventListener('touchstart', listener)
      }
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because passed in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [ref, handler]
  )
}

export function listenForOutsideClicks(listening: boolean, setListening: (val: boolean) => void, menuRef: MutableRefObject<any>, setIsOpen: (val: boolean) => void) {
  return () => {
    if (listening) return
    if (!menuRef.current) return
    setListening(true);
    ['click', 'touchstart'].forEach((type) => {
      document.addEventListener('click', (evt) => {
        if (menuRef.current && menuRef.current.contains(evt.target)) return
        setIsOpen(false)
      })
    })
  }
}
