import React, {useEffect} from 'react'
import styles from './index.module.scss'
import {IField} from '@/types/types'
import {useField} from 'formik'
import classNames from 'classnames'
import InputField, {InputValueType} from '@/components/fields/InputField'
import {debounce} from 'debounce'
import {useVacancyListOwnerContext, VacancyListOwnerWrapper} from '@/context/vacancy_owner_list_state'
import {IVacancy} from '@/data/interfaces/IVacancy'
import RadioCheckbox from '@/components/ui/RadioCheckbox'
import FieldError from '@/components/fields/FieldError'


interface Props extends IField<IVacancy[]> {
  resettable?: boolean
  onChange?: (value: IVacancy[]) => void
  className?: string
}

const JobWithSearchFieldInner = (props: Props) => {
  const vacancyListOwnerContext = useVacancyListOwnerContext()
  const [field, meta, helpers] = useField<IVacancy[]>(props as any)
  const showError = meta.touched && !!meta.error

  useEffect(() => {
    vacancyListOwnerContext.setFilter({showClosed: false})
  }, [])
  const handleSelect = (vacancy: IVacancy) => {
    if (field.value.find(i => i.id === vacancy.id)) {
      helpers.setValue(field.value.filter((i) => i.id !== vacancy.id))
    } else {
      helpers.setValue([...field.value, vacancy])
    }
  }
  const handleRemove = (vacancy: IVacancy) => {
    if (field.value.find(i => i.id === vacancy.id)) {
      helpers.setValue(field.value.filter((i) => i.id !== vacancy.id))
    }
  }
  const debouncedSearchChange = debounce(async (search: InputValueType<string>) => {
    vacancyListOwnerContext.setFilter({...vacancyListOwnerContext.filter, search: search as string})
  }, 300)
  const valueIds = field.value.map(i => i.id)
  return (
    <div className={styles.root}>
      <InputField name={'search'} noAutoComplete={true} suffix={'search'} label={'Search'}
                  onChange={debouncedSearchChange}/>
      <FieldError showError={showError}>{meta.error}</FieldError>

      <div className={styles.list}>
        {vacancyListOwnerContext.data.data.map((vacancy) => <div
            className={classNames(styles.job)}
            onClick={() => handleSelect(vacancy)}>
            <RadioCheckbox checked={valueIds.includes(vacancy.id)}/>

            <div className={styles.name}>{vacancy.name}</div>
          </div>
        )}
      </div>
      {field.value.length > 0 && <div className={classNames(styles.list, {[styles.selected]: true})}>
        {field.value.map((vacancy) => <div key={vacancy.id}
                                           className={classNames(styles.job)} onClick={() => handleRemove(vacancy)}>
          <RadioCheckbox checked={true}/>
          <div className={styles.name}>{vacancy.name}</div>
        </div>)}
      </div>}
    </div>
  )
}

export default function JobWithSearchField(props: Props) {
  return <VacancyListOwnerWrapper>
    <JobWithSearchFieldInner {...props}/>
  </VacancyListOwnerWrapper>
}
