import styles from './index.module.scss'
// import {RenderPropSticky} from 'react-sticky-el'
import {useRef} from 'react'
import {useAppContext} from '@/context/state'
import {Nullable} from '@/types/types'
import ChatDialogWidget from '@/components/for_pages/Chat/ChatDialogWidget'
import classNames from 'classnames'

interface Props {
  vacancyId?: Nullable<number | undefined>
  cvId?: Nullable<number | undefined>
  title?: string | undefined
}

export default function ChatOnPage(props: Props) {
  const appContext = useAppContext()
  let ref = useRef<HTMLDivElement | null>(null)
  return (<div ref={ref} className={classNames(styles.root, styles[appContext.headerDirection]) } >
            <ChatDialogWidget vacancyId={props.vacancyId} cvId={props.cvId} title={props.title}/>
      </div>
  )
}

