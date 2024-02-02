import styles from './index.module.scss'
import { ISpecializationCategory } from '@/data/interfaces/Common'
import SelectField from '@/components/fields/SelectField'
import { IGeoName } from '@/data/interfaces/ILocation'
import { Employment } from '@/data/enum/Employment'
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
import { useState } from 'react'
import { Form, FormikProvider, useFormik } from 'formik'

interface Props extends Partial<IJobWidget> {
  categories?: ISpecializationCategory[]
  locations?: IGeoName[]
  employment?: Employment[]
  vacancies?: IVacancy[]
}

export default function JobWidget(props: Props) {
  
  const {t} = useTranslation()
  const [activeVacancies, setActiveVacancies] = useState<IVacancy[]>(props.vacancies?.slice(0, props.jobsPerPage||2)||[])

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
            options={props?.categories&&props?.categories?.length > 0 ? props?.categories?.map(i => ({value: i.id, label: i.name})):[]} 
            name={'categories'}/>
          }
          {props.locationFilter &&
            <SelectField 
            className={styles.select}
            style={{border: props.filterBorders&&`2px solid ${props.filterBorders}`}}
            label={'All locations'}
            options={ props?.locations&&props?.locations?.length > 0 ?  props.locations.map(i => ({value: i.geonameid, label: i.name})):[]} 
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
            <AvatarCircular initials={'Jobbro'} size={80}/>
            <div className={styles.info}>
              <div className={styles.name}>{v.name}</div>
              <div className={styles.stats}>
                <div className={styles.stat}>{v.category.name}</div>
                <div className={styles.stat}>{v.office.city.locName}</div>
                <div className={styles.stat}>{v.employment}</div>
              </div>
            </div>
            <IconButton className={styles.arrow} href={'/'}><ChevronDownSvg color={colors.green}/></IconButton>
          </div>
        )
      })
      ||
      <div className={styles.vacancy} 
      style={{
        background: props.backgroundJobCard, 
        boxShadow: props.cardShadow&&`0px 0px 10px 0px ${props.cardShadow}`,
        border: props.cardBorder&&'2px solid '+props.cardBorder,
      }} 
      >
        <AvatarCircular/>
        <div className={styles.info}>
          <div className={styles.name} style={{color: props.primaryText}}>Empty vacancy name</div>
          <div className={styles.stats}>
            <div className={styles.stat} style={{color: props.secondaryText}}><FileSvg color={colors.green}/> Empty Category</div>
            <div className={styles.stat} style={{color: props.secondaryText}}><LocationSvg color={colors.green}/> Empty City</div>
            <div className={styles.stat} style={{color: props.secondaryText}}><UserTabSvg color={colors.green}/> Full Time</div>
          </div>
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