import React, {useRef} from 'react'
import {IField, IOption, Nullable} from '@/types/types'
import SelectMultipleField from '@/components/fields/SelectMultipleField'
import {useField} from 'formik'
import SkillRepository from '@/data/repositories/SkillRepository'
import {ISkill} from '@/data/interfaces/ISkill'


interface Props extends IField<ISkill[]> {
  resettable?: boolean
  onChange?: (value: Nullable<number>) => void
  className?: string
}

export default function SkillEntitiesField(props: Props) {
  const abortControllerRef = useRef<AbortController | null>(null)
  const [field, meta, helpers] = useField<ISkill[]>(props as any)
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
  const handleCreate = async (value: string) => {
    return value
  }
  console.log('FieldValue111', field.value)
  return (
    <SelectMultipleField<ISkill> {...(props as any)} async={true}
                                 values={field.value}
                                 onDeleteValue={(value) => helpers.setValue(field.value.filter(i => i.id !== value.id))}
                                 findValue={(value) => !!field.value.find(i => i.id === value.id)}
                                 placeholder={props.placeholder}
                                 formatLabel={(v) => {
                                   console.log('FormatLabel', v)
                                   return (v as ISkill).title}}
                                 loadOptions={loadOptions} options={[]}
                                 initialAsyncData={{page: 1}}/>
  )
}

