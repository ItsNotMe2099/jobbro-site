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
import ContentLoader from '@/components/ui/ContentLoader'
import useTranslation from 'next-translate/useTranslation'
import {CvEvaluationSimpleWrapper, useCvEvaluationSimpleContext} from '@/context/cv_simple_evaluation_state'
import CvEvaluationForCard from '@/components/ui/CvEvaluationForCard'
interface VacancySelectedItemProps{
  onClick: () => void
  name: string
}
const VacancySelectedItem = (props: VacancySelectedItemProps) => {
  const simpleEvaluation = useCvEvaluationSimpleContext()
  const evaluation = simpleEvaluation.store[props.name]?.evaluation
  useEffect(() => {
    simpleEvaluation.addRecord(props.name)
  }, [])
  return (<div className={classNames(styles.job)} onClick={props.onClick}>
    <RadioCheckbox checked={true}/>
    <div className={styles.name}>{props.name}</div>
    <CvEvaluationForCard evaluation={evaluation?.percentEvaluation}/>
  </div>)
}

interface VacancyRadioItemProps{
  onClick: () => void
  name: string
  checked: boolean
}
const VacancyRadioItem = (props: VacancyRadioItemProps) => {
  const simpleEvaluation = useCvEvaluationSimpleContext()
  const evaluation = simpleEvaluation.store[props.name]?.evaluation
  useEffect(() => {
    simpleEvaluation.addRecord(props.name)
  }, [])
  return (<div
    className={classNames(styles.job)}
    onClick={props.onClick}>
    <RadioCheckbox checked={props.checked}/>
    <div className={styles.name}>{props.name}</div>
    <CvEvaluationForCard evaluation={evaluation?.percentEvaluation}/>
  </div>)
}
interface Props extends IField<IVacancy[]> {
  resettable?: boolean
  onChange?: (value: IVacancy[]) => void
  className?: string
  cvTitle?: string | undefined
}

const JobWithSearchFieldInner = (props: Props) => {
  const {t} = useTranslation()
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
      <InputField name={'search_jobs'} noAutoComplete={true} resettable={true} suffix={'search'} label={t('job_invite_field_job_search_placeholder')}
                  onChange={debouncedSearchChange}/>
      <FieldError showError={showError}>{meta.error}</FieldError>
     <div className={styles.subTitle}> {vacancyListOwnerContext.filter.search ? !vacancyListOwnerContext.isLoading ? t('job_invite_field_job_results') : t('job_invite_field_job_results_amount', {amount: vacancyListOwnerContext.data.total}) : t('job_invite_field_job_all_jobs')}</div>
      <div className={styles.list}>
        {vacancyListOwnerContext.isLoading && <ContentLoader style={'infiniteScroll'} isOpen={true}/>}
        {!vacancyListOwnerContext.isLoading && vacancyListOwnerContext.data.data.map((vacancy) => <VacancyRadioItem key={vacancy.id} checked={valueIds.includes(vacancy.id)} name={vacancy.name} onClick={() => handleSelect(vacancy)}/>)}
      </div>

      {field.value.length > 0 && <div className={styles.selectedWrapper}>
        <div className={styles.subTitle}>{t('job_invite_field_job_selected', {amount: field.value?.length})}</div>
        <div className={classNames(styles.list, {[styles.selected]: true})}>
        {field.value.map((vacancy) => <VacancySelectedItem key={vacancy.id} name={vacancy.name} onClick={() => handleRemove(vacancy)}/>)}
      </div></div>}
    </div>
  )
}

export default function JobWithSearchField(props: Props) {
  const body = (<VacancyListOwnerWrapper limit={100}>
    <JobWithSearchFieldInner {...props}/>
  </VacancyListOwnerWrapper>)
  if(props.cvTitle){
    return <CvEvaluationSimpleWrapper cvTitle={props.cvTitle}>{body}</CvEvaluationSimpleWrapper>
  }else{
    return body
  }
 }
