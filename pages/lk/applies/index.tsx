import { getAuthServerSideProps } from '@/utils/auth'
import { ProfileType } from '@/data/enum/ProfileType'
import { ProfilePageLayout } from '@/components/for_pages/Profile/ProfileLayout'
import styles from 'pages/lk/profile/resume/index.module.scss'
import {useEffectOnce} from '@/components/hooks/useEffectOnce'
import {ApplyVacancyListWrapper, useApplyListOwnerContext} from '@/context/apply_vacancy_list_state'
import {ApplyCard} from '@/components/for_pages/Common/ApplyCard'

interface Props {

}

const AppliesPageInner = (props: Props) => {
  const appliesListContext = useApplyListOwnerContext()
  useEffectOnce(() => {
    appliesListContext.reFetch()
  })

  return (
    <div className={styles.root}>
      {appliesListContext.data.data.map((i, index) =>
        <ApplyCard vacancy={i} key={i.id} />
      )}
    </div>
  )
}

const AppliesPage = () => {
  return (<ApplyVacancyListWrapper>
    <AppliesPageInner/>
  </ApplyVacancyListWrapper>)
}
AppliesPage.getLayout = ProfilePageLayout
export default  AppliesPage
export const getServerSideProps = getAuthServerSideProps(ProfileType.Employee)
