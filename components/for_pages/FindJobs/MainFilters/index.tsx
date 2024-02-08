import { IVacancyFilterParams, IVacancyFilterParamsInner } from '@/data/interfaces/IVacancySearchParams'
import styles from './index.module.scss'
import Dictionary from '@/utils/Dictionary'
import useTranslation from 'next-translate/useTranslation'
import CountryField from '@/components/fields/CountryField'
import { Form, FormikProvider, useFormik } from 'formik'
import { useEffect } from 'react'
import SelectField from '@/components/fields/SelectField'
import { IGeoName } from '@/data/interfaces/ILocation'

interface Props {
  onChange: (data: IVacancyFilterParams) => void
  filters: IVacancyFilterParams
}

interface FormikInitial extends 
Pick<IVacancyFilterParamsInner, 
'experienceDuration'|
'salaryType'|
'experience'> {
  countries: IGeoName,
  country: Partial<IGeoName>
}

export default function MainFilters(props: Props) {
  const {t} = useTranslation()

  const formik = useFormik<Partial<FormikInitial>>({
    initialValues: {
      countries: undefined,
      experienceDuration: undefined,
      salaryType: undefined,
      experience: undefined,
    },
    onSubmit: ()=> {}
  })

  useEffect(()=>{
    props.onChange({...formik.values, countries: [formik.values.countries?.geonameid as number], country: {geonameid: formik.values.countries?.geonameid as number, name: formik.values.countries?.name as string} as IGeoName})
  }, [formik.values])

  return (<div>
    <FormikProvider value={formik}>
      <Form className={styles.root}>
        <CountryField name={'countries'}
        placeholder='Country'
        className={styles.select}
        />
        <SelectField 
        placeholder={t('job_form_tab_details_section_Experience')}
        options={Dictionary.getExperienceOptions(t)} 
        name={'experience'}
        className={styles.select}
        resettable
        />
        <SelectField 
        placeholder={t('cv_form_section_salary_type')}
        options={Dictionary.getSalaryTypeOptions(t)} 
        name={'salaryType'}
        className={styles.select}
        resettable
        />
        <SelectField 
        placeholder={t('job_preview_required_experience')}
        options={Dictionary.getExperienceDurationOptions(t)} 
        name={'experienceDuration'}
        className={styles.select}
        resettable
        />
      </Form>
    </FormikProvider>
  </div>)
}
