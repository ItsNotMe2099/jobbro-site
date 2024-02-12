import styles from './index.module.scss'
import classNames from 'classnames'
import {IOffice} from '@/data/interfaces/IOffice'
import MenuButton from '@/components/ui/MenuButton'
import {IOption} from '@/types/types'
import {useRouter} from 'next/router'
import {Routes} from '@/types/routes'
import {OfficeOwnerWrapper, useOfficeOwnerContext} from '@/context/office_owner_state'
import useTranslation from 'next-translate/useTranslation'
import PersonSvg from '@/components/svg/PersonSvg'
import {colors} from '@/styles/variables'
enum MenuKey{
  Edit = 'edit',
  Delete = 'delete'
}
interface Props {
  office: IOffice
  className?: string
}

const OfficeCardInner = (props: Props) => {
  const router = useRouter()
  const officeOwnerContext = useOfficeOwnerContext()
  const office = officeOwnerContext.office
  const {t} = useTranslation()
  const menuOptions: IOption<MenuKey>[] = [
    {label: t('office_card_menu_edit'), value: MenuKey.Edit},
    {label: t('office_card_menu_delete'), value: MenuKey.Delete},
  ]
  const handleMenuClick = (value: MenuKey) => {
    switch (value){
      case MenuKey.Edit:
        router.push(Routes.lkCompanyOffice(office!.id!))
        break
      case MenuKey.Delete:
      officeOwnerContext.delete()
        break
    }
  }
  return (
    <div className={classNames(styles.root, props.className)}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.jobs}>
            {props.office.jobsCount} {t('office_card_job')}
          </div>
           <div className={styles.employees}>
            <PersonSvg color={colors.textSecondary} />
            <div className={styles.quantity}>
              {props.office.managersCount}
            </div>
          </div>
        </div>
        <div className={styles.middle}>
          <div className={styles.country}>
            {office?.name}
          </div>
          <div className={styles.city}>
            {office?.city?.name}
          </div>
        </div>
        <div className={styles.bottom}>
          {props.office.isDefault && <div className={styles.status}>
            Default
          </div>}
          <MenuButton<MenuKey> options={menuOptions} onClick={handleMenuClick}/>
        </div>
      </div>
    </div>
  )
}

export default function OfficeCard(props: Props) {
  return <OfficeOwnerWrapper officeId={props.office.id} office={props.office}>
    <OfficeCardInner office={props.office}/>
  </OfficeOwnerWrapper>
}
