import Image from 'next/image'
import styles from './index.module.scss'
import classNames from 'classnames'
import {IIntegrationProfile} from '@/data/interfaces/IIntegrationProfile'
import Dictionary from '@/utils/Dictionary'
import useTranslation from 'next-translate/useTranslation'
import {IntegrationPlatform} from '@/data/enum/IntegrationPlatform'
import {IOption} from '@/types/types'
import {Routes} from '@/types/routes'
import MenuButton from '@/components/ui/MenuButton'
import {useRouter} from 'next/router'
import {IntegrationOwnerWrapper, useIntegrationOwnerContext} from '@/context/integration_owner_state'
enum MenuKey{
  Edit = 'edit',
  Delete = 'delete'
}
interface Props {
  integration?: IIntegrationProfile | undefined
  platform: IntegrationPlatform
}

const IntegrationCardInner = ({ integration, platform }: Props) => {
  const {t} = useTranslation()
  const router = useRouter()
  const integrationContext = useIntegrationOwnerContext()
  const menuOptions: IOption<MenuKey>[] = [
    {label: t('integration_card_menu_edit'), value: MenuKey.Edit},
    {label: t('integration_card_menu_delete'), value: MenuKey.Delete},
  ]
  const handleMenuClick = (value: MenuKey) => {
    switch (value){
      case MenuKey.Edit:
        router.push(Routes.lkSettingsIntegrationEdit(integration!.id!))
        break
      case MenuKey.Delete:
        integrationContext.delete()
        break
    }
  }
  return (
    <div className={classNames(styles.root)}>
      <div className={styles.wrapper}>
        <div className={styles.top}>
          <Image src={Dictionary.getIntegrationPlatformImage(platform)} alt='' fill />
          <div className={styles.label}>
            {Dictionary.getIntegrationPlatformName(platform, t)}
          </div>
        </div>
        <div className={styles.middle}>
          {Dictionary.getIntegrationPlatformDescription(platform,t)}
        </div>
        <div className={styles.bottom}>
          {!integration && <div className={styles.connect} onClick={() => router.push(Routes.lkSettingsIntegrationCreate(platform))}>{t('integration_card_connect')}</div>}
          {integration && <div className={styles.connected} >{t('integration_card_connected') }</div>}
          {integration && <MenuButton<MenuKey> options={menuOptions} onClick={handleMenuClick}/>}

        </div>

      </div>
    </div>
  )
}

export default function IntegrationCard(props: Props) {
  if(props.integration){
    return (<IntegrationOwnerWrapper integrationId={props.integration.id} integration={props.integration}>
      <IntegrationCardInner platform={props.platform} integration={props.integration}/>
    </IntegrationOwnerWrapper>)

   }else{
    return (<IntegrationCardInner platform={props.platform} integration={props.integration}/>)
  }

}
