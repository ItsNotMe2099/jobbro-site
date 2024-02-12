import { getAuthServerSideProps } from '@/utils/auth'
import { ProfileType } from '@/data/enum/ProfileType'
import { ProfilePageLayout } from '@/components/for_pages/Profile/ProfileLayout'
import styles from 'pages/lk/profile/resume/index.module.scss'
import {useEffectOnce} from '@/components/hooks/useEffectOnce'
import NoData from '@/components/for_pages/Common/NoData'
import ContentLoader from '@/components/ui/ContentLoader'
import useTranslation from 'next-translate/useTranslation'
import {FavoriteListWrapper, useFavoriteListContext} from '@/context/favorite_list_state'
import JobCard from '@/components/ui/JobCard'

interface Props {

}

const MarksPageInner = (props: Props) => {
  const favoriteListContext = useFavoriteListContext()
  const { t } = useTranslation()
  useEffectOnce(() => {
    favoriteListContext.reFetch()
  })

  return (
    <div className={styles.root}>
      {favoriteListContext.isLoaded && favoriteListContext.data.total === 0 &&
        <NoData
          title={t('stub_my_marks_title')}
          text={t('stub_my_marks_desc')}
        />
      }
      {!favoriteListContext.isLoaded && favoriteListContext.isLoading &&
        <ContentLoader style={'page'} isOpen={true}/>}

      {favoriteListContext.isLoaded && favoriteListContext.data.total > 0 && favoriteListContext.data.data.map((i, index) =>
        <JobCard vacancy={i} key={i.id}  onSave={(el)=> {}}/>
      )}
    </div>
  )
}

const MarksPage = () => {
  return (<FavoriteListWrapper>
    <MarksPageInner/>
  </FavoriteListWrapper>)
}
MarksPage.getLayout = ProfilePageLayout
export default  MarksPage
export const getServerSideProps = getAuthServerSideProps(ProfileType.Employee)
