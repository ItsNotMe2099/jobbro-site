
import {ReactElement} from 'react'
import {nestLayout} from '@/utils/nestLayout'
import {LkPageHirerLayout} from '@/components/for_pages/Lk/components/LkLayout'
import {VacancyOwnerWrapper} from '@/context/vacancy_owner_state'
import {useRouter} from 'next/router'

interface Props {
  children?: ReactElement | ReactElement[]
  hideTabbar?: boolean
}

const LkJobLayoutInner = (props: Props) => {
  const router = useRouter()
  const vacancyId = parseInt(router.query.id as string, 10)
  return (
    <VacancyOwnerWrapper vacancyId={vacancyId}>
      {props.children}
    </VacancyOwnerWrapper>)
}

export const LkJobHirerLayout = nestLayout(LkPageHirerLayout, (page: ReactElement) =>
  <LkJobLayoutInner>{page}</LkJobLayoutInner>)
