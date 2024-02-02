import { IVacancyFilterParams } from '@/data/interfaces/IVacancySearchParams'
import styles from './index.module.scss'
import FilterDropDown from './FilterDropDown'
import Dictionary from '@/utils/Dictionary'
import useTranslation from 'next-translate/useTranslation'
import { Nullable } from '@/types/types'
import { colors } from '@/styles/variables'
import CheckSvg from '@/components/svg/CheckSvg'
import { SalaryType } from '@/data/enum/SalaryType'
import {Experience, ExperienceDuration} from '@/data/enum/Experience'
import CountryField from '@/components/fields/CountryField'
import { Form, FormikProvider, useFormik } from 'formik'
import { useEffect } from 'react'
import { IGeoName } from '@/data/interfaces/ILocation'

interface Props {
  onChange: (data: IVacancyFilterParams) => void
  filters: IVacancyFilterParams
}





export default function MainFilters(props: Props) {
  const {t} = useTranslation()

  const formik = useFormik<{country: IGeoName|null}>({
    initialValues: {
      country: null
    },
    onSubmit: ()=> {}
  })

  useEffect(()=>{
    props.onChange({countries: [formik.values.country?.geonameid as number] })
  }, [formik.values])

  return (<div className={styles.root}>
    {/* <FilterDropDown title='Country'> */}
      <FormikProvider value={formik}>
        <Form className={styles.form}>
          <CountryField name={'country'}
          placeholder='Country'
          className={styles.country}/>
        </Form>
      </FormikProvider>

    {/* </FilterDropDown>     */}
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
        {Dictionary.getExperienceDurationOptions(t).map(el=> {
          return (
            <p className={styles.item}
            onClick={() => props.onChange({experienceDuration: [el.value as Nullable<ExperienceDuration>]})}
            >
              {el.label}
              {props.filters.experienceDuration?.includes(el.value as Nullable<ExperienceDuration>) && <CheckSvg color={colors.green}/>}
            </p>
          )
        })}
      </div>
    </FilterDropDown>
  </div>)
}
