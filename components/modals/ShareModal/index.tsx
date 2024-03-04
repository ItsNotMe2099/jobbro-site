import ModalLayout from '@/components/layout/Modal/ModalLayout'
import styles from './index.module.scss'
import ModalBody from '@/components/layout/Modal/ModalBody'
import CloseSvg from '@/components/svg/CloseSvg'
import Image from 'next/image'
import Link from 'next/link'
import { useAppContext } from '@/context/state'
import showToast from '@/utils/showToast'
import useTranslation from 'next-translate/useTranslation'

interface Props {
  onClose?: () => void
  isBottomSheet?: boolean
}

export interface IShareModalArgs {
  link: string
}

export default function ShareModal(props: Props) {
  const appContext = useAppContext()
  const args: IShareModalArgs = appContext.modalArguments
  const { t } = useTranslation()


  const onLinkClicked = () => {
    navigator.clipboard.writeText(args?.link)
    showToast({title: t('toast_job_share_copied_link')})
  }

  const body = (
    <div className={styles.root}>
      <div className={styles.header}>
        <p className={styles.title}>{t('job_modal_share_title')}</p>
        <CloseSvg onClick={props.onClose} className={styles.close}/>
      </div>
      <p className={styles.description}>
        {t('job_modal_share_description')}
      </p>
      <div className={styles.linksWrapper}>
        <Link href={`https://www.linkedin.com/shareArticle?mini=true&url=${args?.link}`} target='_blank'  className={styles.link}>
          <Image src={'/img/integrations/linkedin.svg'} width={64} height={64} alt={'linkedIn'}/>
          <p className={styles.linkName}>LinkedIn</p>
        </Link>
        <Link href={`https://api.whatsapp.com/send?text=${args?.link}`} target='_blank' className={styles.link}>
          <Image src={'/img/integrations/WA.svg'} width={64} height={64} alt={'whatsApp'}/>
          <p className={styles.linkName}>WhatsApp</p>
        </Link>
        <Link href={'https://www.instagram.com/'} target='_blank' className={styles.link}>
          <Image src={'/img/integrations/Instagram.svg'} width={64} height={64} alt={'instagram'}/>
          <p className={styles.linkName}>Instagram</p>
        </Link>
        <Link href={`https://www.facebook.com/sharer/sharer.php?u=${args?.link}`} target='_blank'  className={styles.link}>
          <Image src={'/img/integrations/Facebook.svg'} width={64} height={64} alt={'facebook'}/>
          <p className={styles.linkName}>Facebook</p>
        </Link>
        <Link href={`https://twitter.com/intent/tweet?url=${args?.link}`} target='_blank'  className={styles.link}>
          <Image src={'/img/integrations/X.svg'} width={64} height={64} alt={'X'}/>
          <p className={styles.linkName}>X</p>
        </Link>        
        <div className={styles.link} onClick={onLinkClicked}>
          <Image src={'/img/integrations/Link.svg'} width={64} height={64} alt={'link'}/>
          <p className={styles.linkName}>Copy link</p>
        </div>

      </div>
    </div>
  )

  return (<ModalLayout className={styles.modalLayout}>
    <ModalBody>
      {body}
    </ModalBody>
  </ModalLayout>)
}