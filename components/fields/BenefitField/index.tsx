import React, {useRef} from 'react'
import {IField, IOption, Nullable} from '@/types/types'
import {IBenefit} from '@/data/interfaces/IBenefit'
import SelectMultipleField from '@/components/fields/SelectMultipleField'
import {useField} from 'formik'
import BenefitRepository from '@/data/repositories/BenefitRepository'


interface Props extends IField<IBenefit[]> {
  resettable?: boolean
  onChange?: (value: Nullable<number>) => void
  className?: string
}

export default function BenefitField(props: Props) {
  const abortControllerRef = useRef<AbortController | null>(null)
  const [field] = useField<IBenefit[]>(props as any)
  const loadOptions = async (search: string, loadedOptions: IOption<IBenefit>[], data: any): Promise<{ options: IOption<IBenefit>[], hasMore: boolean, additional?: any | null }> => {
    console.log('loadOptionsSearch', search)
    const page = data.page
    if (abortControllerRef.current) {
      abortControllerRef.current?.abort()
    }

    abortControllerRef.current = new AbortController()
    const res = await BenefitRepository.fetch({
      limit: 5,
      page,
      ...(search ? {search} : {}),
    }, {signal: abortControllerRef.current?.signal})
    const hasMore = res.total > res.data.length + loadedOptions.length
    return {
      options: res.data.map(i => ({
        label: i.title,
        value: i
      })),
      hasMore: hasMore,
      additional: {
        page: (page ?? 0) + 1
      }
    }
  }
  const handleCreate = (value: string) => {
    return BenefitRepository.create({title: value})
  }

  return (
    <SelectMultipleField<IBenefit> {...(props as any)} async={true}
                                   values={field.value?.map((i) => ({
                                     label: i.title,
                                     value: i
                                   }))}
                                   placeholder={props.placeholder ?? 'Search benefits'}
                                   onCreateOption={handleCreate} creatable={true} loadOptions={loadOptions} options={[]}
                                initialAsyncData={{page: 1}}/>
  )
}

