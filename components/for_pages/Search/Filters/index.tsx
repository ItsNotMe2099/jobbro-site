import styles from './index.module.scss'

import { Form, FormikProvider, useFormik } from 'formik'
import { IVacancyFilterParams } from '@/data/interfaces/IVacancySearchParams'
import InputField from '@/components/fields/InputField'
import CheckboxMultipleField from '@/components/fields/CheckboxMultipleField'
import RadioField from '@/components/fields/RadioField'
import { useServiceCategoryListOwnerContext } from '@/context/service_category_list_state'
import { useEffect } from 'react'
import Button from '@/components/ui/Button'
import { IVacancySearchStateProps, useVacancySearchContext } from '@/context/vacancy_search_state'
import Dictionary from '@/utils/Dictionary'
import useTranslation from 'next-translate/useTranslation'
import { useAppContext } from '@/context/state'
import classNames from 'classnames'
import CountryField from '@/components/fields/CountryField'
import CityField from '@/components/fields/CityField'
import KeywordField from '@/components/fields/KeywordField'
import { IOption } from '@/types/types'
import { IGeoName } from '@/data/interfaces/ILocation'
import Spacer from '@/components/ui/Spacer'

interface Props {
  vacancySearchContext?: IVacancySearchStateProps
}

export default function Filters(props: Props) {
  const { t } = useTranslation()

  const serviceCategoryListContext = useServiceCategoryListOwnerContext()
  const vacancySearchContext = useVacancySearchContext()
  const context = props.vacancySearchContext||vacancySearchContext
  const appContext = useAppContext()

  useEffect(()=>{
    serviceCategoryListContext.reFetch()
  }, [])

  const submit = (data: IVacancyFilterParams) => {
    delete data.fullCountries
    delete data.country
    delete data.city
    delete data.fullCities
    data.cities?.length === 0 && delete data.cities
    data.countries?.length === 0 && delete data.countries

    if(context.filters) {
      context.filters.current = {...data, page: 1, limit: 20}
    }
    context.setVacancies?.(true)
  }

  const initialValues = {
    experienceDuration: [],
    salaryMin: undefined,
    salaryMax: undefined,
    workplace: [],
    categories: [],
    subcategories: [],
    keywords: [],
    experience: undefined,
    countries: [],
    country: undefined,
    cities: [],
    city: undefined
  }

  const formik = useFormik<Partial<IVacancyFilterParams>>({
    initialValues: {
      ...initialValues
    },
    onSubmit: submit,
    onReset: () => {
      context.setFullCities(new Map)
      context.setFullCountries(new Map)
    }
  })

  useEffect(()=>{
    if(formik.values.country) {
      context.setFullCountries(state=> {
        //@ts-ignore
        if(state.has(formik.values.country.id)) {
          //@ts-ignore
          state.delete(formik.values.country.id)
          return new Map(state)
        }
        //@ts-ignore
        state.set(formik.values.country.geonameid, formik.values.country)
        return new Map(state)
      })
      formik.setFieldValue('country', undefined)
    }
    if(formik.values.city) {
      context.setFullCities(state=> {
        //@ts-ignore
        if(state.has(formik.values.city.id)) {
        //@ts-ignore
          state.delete(formik.values.city.id)
          return new Map(state)
        }
        //@ts-ignore
        state.set(formik.values.city?.geonameid, formik.values.city)
        return new Map(state)
      })
      formik.setFieldValue('city', undefined)
    }
  }, [formik.values])



  useEffect(()=>{
    formik.setValues({...initialValues, ...context.filters.current})
  }, [])

  return (<div className={classNames(styles.root, styles['root_'+appContext.headerDirection])}>
    <FormikProvider value={formik}>
      <div className={classNames(styles.formWrapper, styles['formWrapper_'+appContext.headerDirection])}>
        <Form className={styles.form}>

          <p className={styles.title}>{t('cv_form_field_category')}</p>
          <CheckboxMultipleField options={serviceCategoryListContext.data.map(c => {
            return {label: c.name, value: c.id}
          })} name={'categories'}/>

          <p className={styles.title}>{t('cv_form_field_sub_category')}</p>
          <CheckboxMultipleField options={serviceCategoryListContext.data.map(c => {
            return {label: c.name, value: c.id}
          })} name={'subcategories'}/>

          <p className={styles.title}>{t('cv_form_section_salary_type')}</p>
          <div className={styles.range}>
            <InputField
            name={'salaryMin'}
            classNameInputWrapper={styles.inputWrapper}
            classNameInput={styles.input}
            label={t('cv_form_field_experience_from')}
            format='price'
            // suffix={'$'}
            />
            <span>-</span>
            <InputField
            name={'salaryMax'}
            classNameInputWrapper={styles.inputWrapper}
            classNameInput={styles.input}
            label={t('cv_form_field_experience_to')}
            format='price'

            // suffix={'$'}
            />
          </div>

          <p className={styles.title}>{t('job_preview_employment_country')}</p>
          <CountryField name={'country'} className={styles.input}
          placeholder={t('form_field_search')}
          resettable
          />
          {context.fullCountries.size > 0 &&
          <>
          <Spacer basis={16}/>
          <CheckboxMultipleField name={'countries'}
          options={[...context.fullCountries.values()]?.map((c: IGeoName) => (
            {label: c.name, value: c.geonameid} as IOption<number>))||[]}
            />
          </>
          }

          <p className={styles.title}>{t('job_preview_employment_location')}</p>
          <CityField name={'city'} className={styles.input}
          placeholder={t('form_field_search')}
          />
          {context.fullCities.size > 0 &&
          <>
          <Spacer basis={16}/>
          <CheckboxMultipleField name={'cities'}
          options={[...context.fullCities.values()]?.map((c: IGeoName) => (
            {label: c.name, value: c.geonameid} as IOption<number>))||[]}
          />
          </>}

          <p className={styles.title}>{t('job_preview_employment_type')}</p>
          <CheckboxMultipleField name={'employment'}
          options={Dictionary.getEmploymentOptions(t)}
          />

          <p className={styles.title}>Grade</p>
          <RadioField
          name={'experience'} itemClassName={styles.radio}
          options={Dictionary.getExperienceOptions(t)}
          />

          <p className={styles.title}>{t('job_form_tab_details_section_Experience')}</p>
          <CheckboxMultipleField name={'experienceDuration'}
          options={Dictionary.getExperienceDurationOptions(t)}
          />

          <p className={styles.title}>{t('cv_form_section_salary_type')}</p>
          <RadioField
          name={'salaryType'} itemClassName={styles.radio}
          options={Dictionary.getSalaryTypeOptions(t)}
          />

          <p className={styles.title}>{t('job_form_tab_details_field_workplace')}</p>
          <CheckboxMultipleField name={'workplace'}
          options={Dictionary.getWorkplaceOptions(t)}
          />

          <p className={styles.title}>{t('job_form_tab_workflow_section_keywords')}</p>
          <KeywordField name={'keywords'}
          selectClassName={styles.input}
          />
        </Form>
      </div>

      <div className={styles.buttons}>
        {formik.values !== formik.initialValues &&
          <Button color={'white'} onClick={()=>formik.resetForm()} type={'button'} className={styles.submitButton}>Reset Filter</Button>
        }
        <Button color={'green'} onClick={()=>{formik.submitForm(); appContext.hideModal()}} type={'submit'} className={styles.submitButton}>Apply Filter</Button>
      </div>
    </FormikProvider>
  </div>)
}
