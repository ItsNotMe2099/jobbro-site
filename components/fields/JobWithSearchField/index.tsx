import React, {useEffect} from 'react'
import styles from './index.module.scss'
import {IField, Nullable} from '@/types/types'
import { useField} from 'formik'
import classNames from 'classnames'
import InputField, {InputValueType} from '@/components/fields/InputField'
import {debounce} from 'debounce'
import {useVacancyListOwnerContext, VacancyListOwnerWrapper} from '@/context/vacancy_owner_list_state'
import {IVacancy} from '@/data/interfaces/IVacancy'
import RadioCheckbox from '@/components/ui/RadioCheckbox'
import FieldError from '@/components/fields/FieldError'


interface Props extends IField<number> {
  resettable?: boolean
  onChange?: (value: Nullable<number>) => void
  className?: string
}

const JobWithSearchFieldInner = (props: Props) => {
  const vacancyListOwnerContext = useVacancyListOwnerContext()
  const [field, meta, helpers] = useField<number>(props as any)
  const showError = meta.touched && !!meta.error

  useEffect(() => {
    vacancyListOwnerContext.reFetch()
  }, [])
  const handleSelect = (vacancy: IVacancy) => {
      helpers.setValue(vacancy.id)
  }

  const debouncedSearchChange = debounce(async (search: InputValueType<string>) => {
    vacancyListOwnerContext.setFilter({...vacancyListOwnerContext.filter, search: search as string})
  }, 300)
  return (
    <div className={styles.root}>
          <InputField name={'search'} noAutoComplete={true} suffix={'search'} label={'Search'} onChange={debouncedSearchChange}/>
      <FieldError showError={showError}>{meta.error}</FieldError>

      <div className={styles.list}>
        {vacancyListOwnerContext.data.data.map((vacancy) => <div
            className={classNames(styles.job)}
            onClick={() => handleSelect(vacancy)}>
          <RadioCheckbox checked={field.value === vacancy.id}/>

              <div className={styles.name}>{vacancy.name}</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function JobWithSearchField(props: Props) {
  return <VacancyListOwnerWrapper>
    <JobWithSearchFieldInner {...props}/>
  </VacancyListOwnerWrapper>
}
