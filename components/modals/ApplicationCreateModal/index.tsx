import styles from './index.module.scss'
import {colors} from 'styles/variables'
import BottomSheetLayout from 'components/layout/BottomSheet/BottomSheetLayout'
import ModalLayout from 'components/layout/Modal/ModalLayout'
import BottomSheetBody from 'components/layout/BottomSheet/BottomSheetBody'
import {useAppContext} from 'context/state'
import ModalBody from 'components/layout/Modal/ModalBody'
import ModalFooter from 'components/layout/Modal/ModalFooter'
import {CVListOwnerWrapper, useCVListOwnerContext} from '@/context/cv_owner_list_state'
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
import useTranslation from 'next-translate/useTranslation'
import BottomSheetFooter from '@/components/layout/BottomSheet/BottomSheetFooter'
import showToast from '@/utils/showToast'
import ModalHeader from '@/components/layout/Modal/ModalHeader'
import classNames from 'classnames'
import {useRouter} from 'next/router'
import {Routes} from '@/types/routes'

interface Props {
  isBottomSheet?: boolean
}

const ApplicationCreateModalInner = (props: Props) => {
  const appContext = useAppContext()
  const cvListContext = useCVListOwnerContext()
  const router = useRouter()
  const {t} = useTranslation()
  const isLoading = cvListContext.isLoading
  const [sending, setSending] = useState(false)
  const [selectedCv, setSelectedCv] = useState<Nullable<ICV>>(null)
  const args: ApplicationCreateModalArguments = appContext.modalArguments
  const isEmpty = cvListContext.isLoaded && cvListContext.data.length === 0
  useEffectOnce(() => {
    cvListContext.reFetch()
  })
  const handleApply = async () => {
    setSending(true)
    if (!selectedCv) {
      return
    }
    try {
      await ApplicationRepository.create({
        vacancyId: args?.vacancyId,
        cvId: selectedCv.id
      })
      showToast({title: t('toast_apply_created_title'), text: t('toast_apply_created_desc')})
      appContext.hideModal()

    } catch (err) {
      if (err instanceof RequestError) {
        appContext.showSnackbar(err.message, SnackbarType.error)
      }
    }
    setSending(false)
  }
  const handleCreateResume = () => {
    appContext.hideModal()
    router.push(Routes.profileResumeCreate)
  }

  const body = (isEmpty
      ? <div className={styles.stub}><img src={'/img/no-resume.svg'}/></div>
      : (!cvListContext.isLoaded ? (<ContentLoader isOpen={true}/>) : (<>
        <div className={styles.list}>
          {cvListContext.data.map(i => <CvOwnerSmallCard key={i.id}
                                                         cv={i}
                                                         checked={selectedCv?.id === i.id}
                                                         onClick={() => selectedCv?.id === i.id ? setSelectedCv(null) : setSelectedCv(i)}/>)}
        </div>
      </>))
  )

  const footer = <div className={styles.buttons}>
    {!isEmpty &&
      <Button spinner={sending} type='submit' fluid disabled={!selectedCv} onClick={handleApply} styleType='large'
              color='green'>
        {t('apply_create_button_apply')}
      </Button>}
    {isEmpty && <Button spinner={sending} type='submit' fluid onClick={handleCreateResume}
                        styleType='large' color='green'>
      {t('apply_create_button_create_resume')}
    </Button>}
    <Button onClick={() => appContext.hideModal()} fluid styleType='large' color='white'>
      {t('apply_create_button_cancel')}
    </Button>
  </div>


  if (props.isBottomSheet) {
    return (
      <BottomSheetLayout closeIconColor={colors.black}>
        <BottomSheetBody>{body}</BottomSheetBody>
        <BottomSheetFooter>
          {footer}
        </BottomSheetFooter>
      </BottomSheetLayout>
    )
  }
  return (
    <>
      <ModalLayout fixed className={styles.modalLayout}>
        {/* {appContext.isMobile && <ModalHeader>{header}</ModalHeader>} */}
        <ModalHeader title={t('apply_create_title')}
                     description={isEmpty ? t('apply_create_no_resume_desc') : undefined}/>
        <ModalBody fixed className={classNames({[styles.stubBody]: isEmpty})}>

          {body}
        </ModalBody>
        {cvListContext.isLoaded ? <ModalFooter fixed>{footer}</ModalFooter> : <></>}
      </ModalLayout>
    </>
  )
}


export default function ApplicationCreateModal(props: Props) {
  return <CVListOwnerWrapper>
    <ApplicationCreateModalInner {...props}/>
  </CVListOwnerWrapper>
}
