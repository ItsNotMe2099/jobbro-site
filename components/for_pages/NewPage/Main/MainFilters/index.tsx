import { IVacancyFilterParams } from '@/data/interfaces/IVacancySearchParams'
import styles from './index.module.scss'
import FilterDropDown from './FilterDropDown'
import Dictionary from '@/utils/Dictionary'
import useTranslation from 'next-translate/useTranslation'
import { Nullable } from '@/types/types'
import { Employment } from '@/data/enum/Employment'
import { colors } from '@/styles/variables'
import { useEffect } from 'react'
import CheckSvg from '@/components/svg/CheckSvg'
import { SalaryType } from '@/data/enum/SalaryType'
import { Experience } from '@/data/enum/Experience'

interface Props {
  onChange: (data: IVacancyFilterParams) => void
  filters: IVacancyFilterParams
}





export default function MainFilters(props: Props) {
  const {t} = useTranslation()

  useEffect(()=>{
    console.log(props.filters)
  
  }, [props.filters])

  return (<div className={styles.root}> 
    <FilterDropDown title='Country'>
      
    </FilterDropDown>    
    <FilterDropDown title='Experience'>
      <div className={styles.items}>
        {Dictionary.getExperienceOptions(t).map(el=> {
          return (
            <p className={styles.item} 
            onClick={() => props.onChange({experience: el.value as Nullable<Experience> })}
            >
              {el.label} 
              {props.filters.experience === el.value && <CheckSvg color={colors.green}/>}
            </p>
          )
        })}
      </div>
    </FilterDropDown>
    <FilterDropDown title='Salary'>
      <div className={styles.items}>
        {Dictionary.getSalaryTypeOptions(t).map(el=> {
          return (
            <p className={styles.item} 
            onClick={() => props.onChange({salaryType: [el.value as Nullable<SalaryType>]})}
            >
              {el.label} 
              {props.filters.salaryType?.includes(el.value as Nullable<SalaryType>) && <CheckSvg color={colors.green}/>}
            </p>
          )
        })}
      </div>
    </FilterDropDown>
    <FilterDropDown title='Employment Type'>
      <div className={styles.items}>
        {Dictionary.getEmploymentOptions(t).map(el=> {
          return (
            <p className={styles.item} 
            onClick={() => props.onChange({employment: [el.value as Nullable<Employment>]})}
            >
              {el.label} 
              {props.filters.employment?.includes(el.value as Nullable<Employment>) && <CheckSvg color={colors.green}/>}
            </p>
          )
        })}
      </div>
    </FilterDropDown>
  </div>)
}