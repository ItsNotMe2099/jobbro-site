import styles from './index.module.scss'

import { Form, FormikProvider, useFormik } from 'formik'
import { IVacancyFilterParams } from '@/data/interfaces/IVacancySearchParams'
import InputField from '@/components/fields/InputField'
import CheckboxMultipleField from '@/components/fields/CheckboxMultipleField'
import RadioField from '@/components/fields/RadioField'
import { useServiceCategoryListOwnerContext } from '@/context/service_category_list_state'
import { useEffect } from 'react'
import Button from '@/components/ui/Button'
import { useVacancySearchContext } from '@/context/vacancy_search_state'
import Dictionary from '@/utils/Dictionary'
import useTranslation from 'next-translate/useTranslation'

interface Props {
}

export default function Filters(props: Props) {
  const { t } = useTranslation()

  const serviceCategoryListContext = useServiceCategoryListOwnerContext()
  const vacancySearchContext = useVacancySearchContext()



  useEffect(()=>{
    serviceCategoryListContext.reFetch()
  }, [])

  const submit = (data: Partial<IVacancyFilterParams>) => {
    if(vacancySearchContext.filters) {
      vacancySearchContext.filters.current = {...data, page: 1, limit: 20}
    }
    vacancySearchContext.setVacancies?.(true)
  }

  const formik = useFormik<Partial<IVacancyFilterParams>>({
    initialValues: {
      employment: [],
      salaryMin: null,
      salaryMax: null,
      workplace: [],
      categories: [],
      subcategories: [],
    },
    onSubmit: submit
  })

  return (<div className={styles.root}> 
    <FormikProvider value={formik}>
      <div className={styles.formWrapper}>
        <Form className={styles.form}>

          <p className={styles.title}>Categories</p>
          <CheckboxMultipleField options={serviceCategoryListContext.data.map(c => {
            return {label: c.name, value: c.id}
          })} name={'categories'}/>
        
          <p className={styles.title}>Sub-categories</p>
          <CheckboxMultipleField options={serviceCategoryListContext.data.map(c => {
            return {label: c.name, value: c.id}
          })} name={'subcategories'}/>

          <p className={styles.title}>Salary</p>
          <div className={styles.range}>
            <InputField 
            name={'salaryMin'} 
            classNameInputWrapper={styles.inputWrapper} 
            classNameInput={styles.input}
            suffix={'$'}
            />
            <span>-</span>
            <InputField 
            name={'salaryMax'} 
            classNameInputWrapper={styles.inputWrapper} 
            classNameInput={styles.input}
            suffix={'$'}
            />
          </div>

          <p className={styles.title}>Employment Type</p>
          <CheckboxMultipleField name={'employment'} 
          options={Dictionary.getEmploymentOptions(t)}
          />

          <p className={styles.title}>Experience</p>
          <RadioField 
          name={'experienceDuration'} itemClassName={styles.radio}
          options={Dictionary.getExperienceOptions(t)} 
          />

          <p className={styles.title}>Grade</p>
          <RadioField 
          name={'esperience'} itemClassName={styles.radio}
          options={Dictionary.getSalaryTypeOptions(t)}
          />

          <p className={styles.title}>Workplace</p>
          <CheckboxMultipleField name={'workplace'}
          options={Dictionary.getWorkplaceOptions(t)}
          />   
        </Form>
      </div>

      <Button color={'green'} onClick={formik.submitForm} type={'submit'} className={styles.submitButton}>Apply Filter</Button>   
    </FormikProvider>
  </div>)
}