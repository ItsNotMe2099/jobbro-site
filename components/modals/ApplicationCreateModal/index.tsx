import styles from './index.module.scss'
import {colors} from 'styles/variables'
import BottomSheetLayout from 'components/layout/BottomSheet/BottomSheetLayout'
import ModalLayout from 'components/layout/Modal/ModalLayout'
import BottomSheetBody from 'components/layout/BottomSheet/BottomSheetBody'
import {useAppContext} from 'context/state'
import ModalBody from 'components/layout/Modal/ModalBody'
import ModalFooter from 'components/layout/Modal/ModalFooter'
import {CVListOwnerWrapper, useCVListOwnerContext} from '@/context/cv_owner_list_state'
import StubEmpty from '@/components/ui/StubEmpty'
import ContentLoader from '@/components/ui/ContentLoader'
import Button from '@/components/ui/Button'
import {CvOwnerSmallCard} from '@/components/for_pages/Common/CvOwnerSmallCard'
import {useState} from 'react'
import {ICV} from '@/data/interfaces/ICV'
import {Nullable, RequestError} from '@/types/types'
import {SnackbarType} from '@/types/enums'
import ApplicationRepository from '@/data/repositories/ApplicationRepository'
import {ApplicationCreateModalArguments} from '@/types/modal_arguments'
import {useEffectOnce} from '@/components/hooks/useEffectOnce'
import {PublishStatus} from '@/data/enum/PublishStatus'
import useTranslation from 'next-translate/useTranslation'

interface Props {
  isBottomSheet?: boolean
}

const ApplicationCreateModalInner = (props: Props) => {
  const appContext = useAppContext()
  const cvListContext = useCVListOwnerContext()
  const { t } = useTranslation()
  const isLoading = cvListContext.isLoading
  const [sending, setSending] = useState(false)
  const [selectedCv, setSelectedCv] = useState<Nullable<ICV>>(null)
  const args = appContext.modalArguments as ApplicationCreateModalArguments

  useEffectOnce(() => {
    cvListContext.reFetch()
  })
  const handleApply = async () => {
    setSending(true)
    if(!selectedCv){
      return
    }
    try{
      await ApplicationRepository.create({
        vacancyId: args?.vacancyId,
        cvId: selectedCv.id
      })
      appContext.hideModal()

    } catch (err) {
      if (err instanceof RequestError) {
        appContext.showSnackbar(err.message, SnackbarType.error)
      }
    }
    setSending(false)

  }


  const header = (
    <div className={styles.header}>
      </div>
  )

  const body = ( cvListContext.isLoaded && cvListContext.data.length === 0
      ? <StubEmpty>{t('apply_create_no_cv')}</StubEmpty>
    : (!cvListContext.isLoaded ? (<ContentLoader isOpen={true}/>) : (<>
        <div className={styles.list}>
          {cvListContext.data.filter(i => i.status === PublishStatus.Published).map(i => <CvOwnerSmallCard key={i.id} cv={i} checked={selectedCv?.id === i.id} onClick={() => selectedCv?.id === i.id ? setSelectedCv(null) : setSelectedCv(i)}/>)}
        </div>
      </>))
  )

  const footer = <div className={styles.buttons}>
    <Button spinner={sending} type='submit' disabled={!selectedCv} onClick={handleApply} styleType='large' color='green'>
      {t('apply_create_button_apply')}
    </Button>
    <Button onClick={() => appContext.hideModal()} styleType='large' color='white'>
      {t('apply_create_button_cancel')}
    </Button>
  </div>
  if (props.isBottomSheet) {
    return (
      <BottomSheetLayout closeIconColor={colors.black}>
        <BottomSheetBody>{body}</BottomSheetBody>
      </BottomSheetLayout>
    )
  }


  return (
  <>
      <ModalLayout fixed className={styles.modalLayout}>
        {/* {appContext.isMobile && <ModalHeader>{header}</ModalHeader>} */}
        <ModalBody fixed>
          {header}
          {body}
          </ModalBody>
        <ModalFooter fixed className={styles.footer}>{footer}</ModalFooter>
      </ModalLayout>
  </>
  )
}


export default function ApplicationCreateModal(props: Props) {
  console.log('ApplicationCreateModal1111')
  return <CVListOwnerWrapper>
    <ApplicationCreateModalInner {...props}/>
  </CVListOwnerWrapper>
}
