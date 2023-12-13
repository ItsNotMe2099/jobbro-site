import styles from './index.module.scss'
import { getAuthServerSideProps } from '@/utils/auth'
import { ProfileType } from '@/data/enum/ProfileType'
import { LkPageHirerLayout } from '@/components/for_pages/Lk/components/LkLayout'
import PageTitle from '@/components/for_pages/Common/PageTitle'
import FilterToolbar from '@/components/for_pages/Common/FilterToolbar'
import HiringBoardJobCard from '@/components/for_pages/Lk/HiringBoards/HiringBoardListJobCard'
import {HiringBoardListWrapper, useHiringBoardListContext} from '@/context/hiring_board_list_state'
import {useEffectOnce} from '@/components/hooks/useEffectOnce'



const HiringBoardsInner = () => {
  const hiringBoardListContext = useHiringBoardListContext()
  useEffectOnce(() => {
    hiringBoardListContext.reFetch()
  })
  return (
    <div className={styles.container}>
      <PageTitle title={'Hiring boards'} />
      <div className={styles.wrapper}>
        <FilterToolbar left={[]} />
        <div className={styles.cards}>
          {hiringBoardListContext.data.data.map((i, index) =>
              <HiringBoardJobCard vacancy={i} key={i.id} />)
          }
        </div>
      </div>
    </div>
  )
}

const HiringBoards = () => {
  return (<HiringBoardListWrapper>
    <HiringBoardsInner/>
  </HiringBoardListWrapper>)
}
HiringBoards.getLayout = LkPageHirerLayout

export default HiringBoards
export const getServerSideProps = getAuthServerSideProps(ProfileType.Hirer)
