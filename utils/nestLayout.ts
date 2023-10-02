import {ReactElement} from 'react'

export const nestLayout = (parent: (el: ReactElement) => ReactElement, child:  (el: ReactElement) => ReactElement) => {
  return (page: ReactElement) => parent(child(page))
}
