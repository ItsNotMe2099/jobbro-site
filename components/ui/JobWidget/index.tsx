import styles from './index.module.scss'
import SelectField from '@/components/fields/SelectField'
import Dictionary from '@/utils/Dictionary'
import useTranslation from 'next-translate/useTranslation'
import { IVacancy } from '@/data/interfaces/IVacancy'
import AvatarCircular from '../AvatarCircular'
import IconButton from '../IconButton'
import { colors } from '@/styles/variables'
import ChevronDownSvg from '@/components/svg/ChevronDownSvg'
import FileSvg from '@/components/svg/FileSvg'
import LocationSvg from '@/components/svg/LocationSvg'
import UserTabSvg from '@/components/svg/UserTabSvg'
import Link from 'next/link'
import { IJobWidget } from '@/data/interfaces/JobWidgetType'
import { useEffect, useState } from 'react'
import { Form, FormikProvider, useFormik } from 'formik'

interface Props extends Partial<IJobWidget> {
  vacancies?: IVacancy[]
}

export default function JobWidget(props: Props) {
  
  const {t} = useTranslation()
  const [activeVacancies, setActiveVacancies] = useState<IVacancy[]>(props.vacancies?.slice(0, props.jobsPerPage||2)||[])

  useEffect(()=>{
    if(props.vacancies &&props.vacancies?.length > 0) {
      setActiveVacancies(props.vacancies?.slice(0, props.jobsPerPage||2))
    }
  }, [props.vacancies])

  const formik = useFormik({
    initialValues: {
      categories: undefined,
      location: undefined,
      employment: undefined
    },
    onSubmit: () => {}
  })

  return (<div className={styles.root} style={{background: props.backgroundWidget}}> 
    <p className={styles.title} style={{color: props.primaryText}}>Widget preview</p>
    <FormikProvider value={formik}>
      <Form>
        <div className={styles.settings}>
          { props.categoryFilter &&
            <SelectField 
            className={styles.select}
            style={{border: props.filterBorders&&`2px solid ${props.filterBorders}`}}
            label={'All categories'}
            options={props?.category&&props?.category?.length > 0 ? props?.category?.map(i => ({value: i.id, label: i.name})):[]} 
            name={'categories'}/>
          }
          {props.locationFilter &&
            <SelectField 
            className={styles.select}
            style={{border: props.filterBorders&&`2px solid ${props.filterBorders}`}}
            label={'All locations'}
            options={ props?.location&&props?.location?.length > 0 ?  props.location.map(i => ({value: i.geonameid, label: i.name})):[]} 
            name={'location'}/>
          }
          {props.employmentFilter &&
            <SelectField 
            className={styles.select}
            style={{border: props.filterBorders&&`2px solid ${props.filterBorders}`}}
            label={'All employment types'}
            options={ props?.employment&&props?.employment?.length > 0 ?props.employment.map(i => ({value: i, label: Dictionary.getEmploymentName(i, t)})):[]} 
            name={'employment'}/>
          }
        </div>
      </Form>
    </FormikProvider>

    <div className={styles.vacancies}>
      {activeVacancies && activeVacancies.length > 0 &&activeVacancies.map(v => {
        return (
          <div className={styles.vacancy} >
            <AvatarCircular file={v.company.logo} initials={'Jobbro'} size={80}/>
            <div className={styles.info}>
              <div className={styles.name}>{v.name}</div>
              {(props.showItemCategory || props.showItemLocation || props.showItemEmploymentType) &&
                <div className={styles.stats}>
                  {v.category?.name && props.showItemLogo &&
                    <div className={styles.stat}><FileSvg color={colors.green}/> {v.category?.name}</div>
                  }
                  {v.office?.city?.locName && props.showItemLocation &&
                    <div className={styles.stat}><LocationSvg color={colors.green}/> {v.office?.city?.locName}</div>
                  }
                  {v.employment && props.showItemEmploymentType &&
                    <div className={styles.stat}><UserTabSvg color={colors.green}/> {v?.employment}</div>
                  }
                </div>
              }
            </div>
            <IconButton className={styles.arrow} href={'/'}><ChevronDownSvg color={colors.green}/></IconButton>
          </div>
        )
      })
      ||
      <div className={styles.vacancy} 
      style={{
        background: props.backgroundJobCard, 
        boxShadow: (props.cardShadow&& props.showCardShadow)?`0px 0px 10px 0px ${props.cardShadow}`:'',
        border: (props.cardBorder &&props.showCardBorder)?'2px solid '+props.cardBorder:'',
      }} 
      >
        {props.showItemLogo &&
          <AvatarCircular/>
        }
        <div className={styles.info}>
          <div className={styles.name} style={{color: props.primaryText}}>Empty vacancy name</div>
          {(props.showItemCategory || props.showItemLocation || props.showItemEmploymentType) &&
          <div className={styles.stats}>
            {props.showItemCategory &&
              <div className={styles.stat} style={{color: props.secondaryText}}><FileSvg color={colors.green}/> Empty Category</div>
            }
            {props.showItemLocation &&
              <div className={styles.stat} style={{color: props.secondaryText}}><LocationSvg color={colors.green}/> Empty City</div>
            }
            {props.showItemEmploymentType &&
              <div className={styles.stat} style={{color: props.secondaryText}}><UserTabSvg color={colors.green}/> Full Time</div>
            }
          </div>
          }
        </div>
        <IconButton className={styles.arrow} href={'/'}><ChevronDownSvg color={colors.green} direction='right'/></IconButton>
      </div>
      }
    </div>

    <div className={styles.bottom}>
      <div className={styles.pagination}>
        <p className={styles.item} style={{background: props.pagination}}>
          1
        </p>
      </div>
      <Link className={styles.link} href={'#'}>Show all jobs at Jobbro</Link>
    </div>  
  </div>)
}