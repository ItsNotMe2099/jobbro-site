import styles from './index.module.scss'
import { LkPageHirerLayout } from '@/components/for_pages/Lk/components/LkLayout'
import { getAuthServerSideProps } from '@/utils/auth'
import { ProfileType } from '@/data/enum/ProfileType'
import PageTitle from '@/components/for_pages/Common/PageTitle'
import { Routes } from '@/types/routes'
import { useRouter } from 'next/router'
import FilterToolbar from '@/components/for_pages/Common/FilterToolbar'
import {useVacancyOwnerContext, VacancyOwnerWrapper} from '@/context/vacancy_owner_state'
import dynamic from 'next/dynamic'
import SettingsSvg from '@/components/svg/SettingsSvg'
import {colors} from '@/styles/variables'
import IconButton from '@/components/ui/IconButton'
import {useState} from 'react'

const HiringBoard = dynamic(() => import('@/components/for_pages/Lk/HiringBoards/HiringBoard'), {
  ssr: false,
})

const HiringBoardPageInner = () => {
  const router = useRouter()
  const vacancyOwnerContext = useVacancyOwnerContext()
  const vacancyId = parseInt(router.query.id as string, 10)
  const [isEdit, setIsEdit] = useState(false)
  return (
    <div className={styles.container}>

      <PageTitle title={vacancyOwnerContext.vacancy?.name ?? ''} link={Routes.lkHiringBoards} right={ <IconButton
        size={'large'}
        onClick={() => setIsEdit(!isEdit)}>
        <SettingsSvg color={colors.textSecondary}/>
      </IconButton>}/>
      <div className={styles.wrapper}>
        <FilterToolbar />
        <HiringBoard vacancyId={vacancyId} isEdit={isEdit}/>
      </div>
    </div>
  )
}

const HiringBoardPage = () => {
  const router = useRouter()
  const vacancyId = parseInt(router.query.id as string, 10)
  return (<VacancyOwnerWrapper vacancyId={vacancyId}>
    <HiringBoardPageInner/>
  </VacancyOwnerWrapper>)
}
HiringBoardPage.getLayout = LkPageHirerLayout
export default HiringBoardPage
export const getServerSideProps = getAuthServerSideProps(ProfileType.Hirer)
