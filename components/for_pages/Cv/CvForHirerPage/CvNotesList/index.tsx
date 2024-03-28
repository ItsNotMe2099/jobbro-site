import styles from './index.module.scss'
import {useCvNoteListOwnerContext} from '@/context/cv_note_list_state'
import CvNoteCard from '@/components/for_pages/Cv/CvForHirerPage/CvNoteCard'
import ContentLoader from '@/components/ui/ContentLoader'
import InfiniteScroll from 'react-infinite-scroll-component'
import Spacer from '@/components/ui/Spacer'
import classNames from 'classnames'

interface Props{
  styleType: 'green' | 'white'
  isReversed?: boolean
}
const CvForHirerNotes = (props: Props) => {
  const cvNoteListContext = useCvNoteListOwnerContext()
  const loading = cvNoteListContext.isLoading

  return (
    <div className={styles.root} id={'cv-notes'}>
       {loading && <ContentLoader style={'block'} isOpen={true}/>}
        {!loading &&
          <InfiniteScroll
            dataLength={cvNoteListContext.data.data.length}
            next={cvNoteListContext.fetchMore}
            scrollableTarget={'cv-notes'}
            inverse={props.isReversed ? true : false}
            style={{ overflow: 'inherit'}}
            className={classNames(styles.list, {[styles.reversed]: props.isReversed})}
            loader={cvNoteListContext.data.total > 0 ? <ContentLoader style={'infiniteScroll'} isOpen={true}/> : null}
            hasMore={cvNoteListContext.data.total > cvNoteListContext.data.data.length}
            scrollThreshold={0.6}
          >
            {cvNoteListContext.data.data.map((i, index) => {
              const previous = index > 0 ? cvNoteListContext.data.data[index - 1] : null
              return (
                <div key={i.id}>
                  {previous && previous.profileId !== i.profileId && <Spacer basis={10}/>}
                  <CvNoteCard
                    cvNote={i} styleType={'green'}
                  />
                </div>)
            })}
          </InfiniteScroll>}
    </div>
    )
}

export default  CvForHirerNotes
