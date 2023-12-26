import { getAuthServerSideProps } from '@/utils/auth'
import { ProfileType } from '@/data/enum/ProfileType'
import {useRouter} from 'next/router'
import ContentLoader from '@/components/ui/ContentLoader'
import {DeepPartial, Nullable, RequestError} from '@/types/types'
import {ICV} from '@/data/interfaces/ICV'
import CvForm from '@/components/for_pages/Cv/CvForm'
import {useRef, useState} from 'react'
import {useEffectOnce} from '@/components/hooks/useEffectOnce'
import AiCvRequestRepository from '@/data/repositories/AiCvRequestRepository'
import {IAiCvRequest} from '@/data/interfaces/IAiCvRequest'
import CvOwnerRepository from '@/data/repositories/CvOwnerRepository'
import {SnackbarType} from '@/types/enums'
import {useAppContext} from '@/context/state'
import {LkPageHirerLayout} from '@/components/for_pages/Lk/components/LkLayout'
import styles from '@/pages/lk/candidates-base/index.module.scss'
import PageTitle from '@/components/for_pages/Common/PageTitle'
import {Routes} from '@/types/routes'
import useTranslation from 'next-translate/useTranslation'

interface Props {

}

const CandidateBaseCvEditPageInner = (props: Props) => {
  const router = useRouter()
  const appContext = useAppContext()
  const { t } = useTranslation()
  const [loading, setLoading] = useState<boolean>(true)
  const [sending, setSending] = useState<boolean>(false)
  const [aiRequest, setAiRequest] = useState<IAiCvRequest | null>(null)
  const containerRef = useRef<Nullable<HTMLDivElement>>(null)
  useEffectOnce(() => {
    AiCvRequestRepository.fetchById(router.query.id as string).then((i) => {
      setAiRequest(i)
      setLoading(false)
    })
  })
  const handleSubmit = async (data: DeepPartial<ICV>) => {
    try{
      setSending(true)
      await CvOwnerRepository.update(aiRequest?.cv!.id!, data as DeepPartial<ICV>)
      router.push(Routes.lkCandidateAiCvRequests)
    } catch (err) {
      if (err instanceof RequestError) {
        appContext.showSnackbar(err.message, SnackbarType.error)
      }
    }

    setSending(false)
  }
  return (<div className={styles.root} ref={containerRef}>
     <PageTitle title={t('request_cv_check_title')} link={Routes.lkCandidateAiCvRequests}/>

    {loading && !aiRequest ? <ContentLoader isOpen={true}/> :
      <CvForm onSubmit={handleSubmit} loading={sending} cv={aiRequest!.cv} cancelLink={Routes.lkCandidateAiCvRequests}/>
    }
      </div>)
}


const CandidateBaseCvEditPage = (props: Props) => {
  return (<CandidateBaseCvEditPageInner {...props} />)
}


CandidateBaseCvEditPage.getLayout = LkPageHirerLayout
export default CandidateBaseCvEditPage
export const getServerSideProps = getAuthServerSideProps(ProfileType.Hirer)
