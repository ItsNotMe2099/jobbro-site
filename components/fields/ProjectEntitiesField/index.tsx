import React, {useRef} from 'react'
import {IField, IOption, Nullable} from '@/types/types'
import SelectMultipleField from '@/components/fields/SelectMultipleField'
import {useField} from 'formik'
import {IProject} from '@/data/interfaces/IProject'
import ProjectRepository from '@/data/repositories/ProjectRepository'


interface Props extends IField<IProject[]> {
  resettable?: boolean
  onChange?: (value: Nullable<number>) => void
  className?: string
}

export default function ProjectEntitiesField(props: Props) {
  const abortControllerRef = useRef<AbortController | null>(null)
  const [field, meta, helpers] = useField<IProject[]>(props as any)
  const loadOptions = async (search: string, loadedOptions: IOption<IProject>[], data: any): Promise<{ options: IOption<IProject>[], hasMore: boolean, additional?: any | null }> => {
    console.log('loadOptionsSearch', search)
    const page = data.page
    if (abortControllerRef.current) {
      abortControllerRef.current?.abort()
    }

    abortControllerRef.current = new AbortController()
    const res = await ProjectRepository.fetch({
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
    <SelectMultipleField<IProject> {...(props as any)} async={true}
                                 values={field.value}
                                 onDeleteValue={(value) => helpers.setValue(field.value.filter(i => i.id !== value.id))}
                                 findValue={(value) => !!field.value.find(i => i.id === value.id)}
                                 placeholder={props.placeholder}
                                 formatLabel={(v) => {
                                   console.log('FormatLabel', v)
                                   return (v as IProject).title}}
                                 loadOptions={loadOptions} options={[]}
                                 initialAsyncData={{page: 1}}/>
  )
}

