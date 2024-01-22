import ModalLayout from '@/components/layout/Modal/ModalLayout'
import styles from './index.module.scss'
import ModalBody from '@/components/layout/Modal/ModalBody'
import { ServiceCategoryListOwnerWrapper } from '@/context/service_category_list_state'
import Filters from '@/components/for_pages/Search/Filters'
import { useAppContext } from '@/context/state'
import { IVacancySearchStateProps } from '@/context/vacancy_search_state'
import PageTitle from '@/components/for_pages/Common/PageTitle'

interface Props {
  onClose?: () => void
}

export interface IVacancySearchModalProps {
  context: IVacancySearchStateProps
}

export default function SearchFiltersModal(props: Props) {
  const appContext = useAppContext()
  const args: IVacancySearchModalProps = appContext.modalArguments

  const body = (
    <ServiceCategoryListOwnerWrapper>
      <Filters vacancySearchContext={args.context}/>
    </ServiceCategoryListOwnerWrapper>
  )

  return (<ModalLayout mobileFullScreen>
    <ModalBody>
      <PageTitle title={'Filters'} className={styles.title}  onBack={props.onClose}/>
      {body}
    </ModalBody>
  </ModalLayout>)
}