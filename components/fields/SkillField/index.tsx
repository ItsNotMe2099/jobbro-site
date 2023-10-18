import React, {useRef} from 'react'
import {IField, IOption, Nullable} from '@/types/types'
import {ISkill} from '@/data/interfaces/ISkill'
import SelectMultipleField from '@/components/fields/SelectMultipleField'
import {useField} from 'formik'
import SkillRepository from '@/data/repositories/SkillRepository'


interface Props extends IField<ISkill[]> {
  resettable?: boolean
  onChange?: (value: Nullable<number>) => void
  className?: string
}

export default function SkillField(props: Props) {
  const abortControllerRef = useRef<AbortController | null>(null)
  const [field] = useField<ISkill[]>(props as any)
  const loadOptions = async (search: string, loadedOptions: IOption<ISkill>[], data: any): Promise<{ options: IOption<ISkill>[], hasMore: boolean, additional?: any | null }> => {
    console.log('loadOptionsSearch', search)
    const page = data.page
    if (abortControllerRef.current) {
      abortControllerRef.current?.abort()
    }

    abortControllerRef.current = new AbortController()
    const res = await SkillRepository.fetch({
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
    return SkillRepository.create({title: value})
  }

  return (
    <SelectMultipleField<ISkill> {...(props as any)} async={true}
                                   values={field.value?.map(i => ({
                                     label: i.title,
                                     value: i
                                   }))}
                                   placeholder={props.placeholder ?? 'Search skills'}
                                   onCreateOption={handleCreate} creatable={true} loadOptions={loadOptions} options={[]}
                                initialAsyncData={{page: 1}}/>
  )
}

