import React, {useRef} from 'react'
import {IField, IOption, Nullable} from '@/types/types'
import {useField} from 'formik'
import SelectField from '@/components/fields/SelectField'
import ProjectRepository from '@/data/repositories/ProjectRepository'


interface Props extends IField<string> {
  resettable?: boolean
  onChange?: (value: Nullable<string>) => void
  className?: string
}

export default function ProjectField(props: Props) {
  const abortControllerRef = useRef<AbortController | null>(null)
  const [field, meta, helpers] = useField<string>(props as any)
  const loadOptions = async (search: string, loadedOptions: IOption<string>[], data: any): Promise<{ options: IOption<string>[], hasMore: boolean, additional?: any | null }> => {
    const page = data.page
    if (abortControllerRef.current) {
      abortControllerRef.current?.abort()
    }

    abortControllerRef.current = new AbortController()
    const res = await ProjectRepository.fetch({
      limit: 100,
      page,
      ...(search ? {search} : {}),
    }, {signal: abortControllerRef.current?.signal})
    const hasMore = res.total > res.data.length + loadedOptions.length
    return {
      options: res.data.map(i => ({
        label: i.title,
        value: i.title
      })),
      hasMore: hasMore,
      additional: {
        page: (page ?? 0) + 1
      }
    }
  }
  console.log('ProjectValue', field.value)
  const handleCreate = async (value: string) => {
    helpers.setValue(value)
    return value
  }
  return (
    <SelectField<string> {...(props as any)} async={true}
                           onCreateOption={handleCreate} creatable={true}
                           defaultOption={field.value ? {label: field.value ?? '', value: field.value} : null}
                          loadOptions={loadOptions} options={[]}
                         initialAsyncData={{page: 1}}/>
  )
}

