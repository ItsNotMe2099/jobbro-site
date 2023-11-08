import styles from './index.module.scss'
import Card from '@/components/for_pages/Common/Card'
import {ICompany} from '@/data/interfaces/ICompany'
import AvatarCircular from '@/components/ui/AvatarCircular'
import Link from 'next/link'
import LocationSvg from '@/components/svg/LocationSvg'
import {colors} from '@/styles/variables'
import PersonSvg from '@/components/svg/PersonSvg'
import Dictionary from '@/utils/Dictionary'

enum TabKey {
  AdDetails = 'adDetails',
  ApplicationForm = 'applicationForm',
  Workflow = 'workflow'
}


 interface Props {
 company: ICompany
}

export default function JobCompanyPreview(props: Props) {
  const {company} = props
 return (
     <Card >
       <div className={styles.root}>
         <div className={styles.left}>
           <div className={styles.photo}>
             <AvatarCircular file={company?.logo} initials={company?.name?.charAt(0) ?? null}/>
           </div>
           <div className={styles.companyInfo}>
             {company?.industry && <div className={styles.desc}>{company.industry?.name}</div>}
             <div className={styles.name}>{company?.name}</div>
             {company.url && <Link className={styles.link} href={company.url}>Go to website</Link>}
           </div>
         </div>
         <div className={styles.right}>
           <div className={styles.stats}>
             {company?.employeesCount && <div className={styles.item}>
               <PersonSvg color={colors.textSecondary} />
               <div className={styles.itemValue}>{Dictionary.getEmployeeCountName(company.employeesCount)} employees</div>
             </div>}
             {company?.country && <div className={styles.item}>
               <LocationSvg color={colors.textSecondary} />
               <div className={styles.itemValue}>{company.country.name}</div>
             </div>}
           </div>
         </div>


       </div>
     </Card>
 )
}