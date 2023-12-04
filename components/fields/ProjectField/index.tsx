import React, {useRef} from 'react'
import {IField, IOption, Nullable} from '@/types/types'
import {useField} from 'formik'
import SelectField from '@/components/fields/SelectField'
import {IProject} from '@/data/interfaces/IProject'
import ProjectRepository from '@/data/repositories/ProjectRepository'


interface Props extends IField<IProject> {
  resettable?: boolean
  onChange?: (value: Nullable<IProject>) => void
  className?: string
}

export default function ProjectField(props: Props) {
  const abortControllerRef = useRef<AbortController | null>(null)
  const [field] = useField<IProject>(props as any)
  const loadOptions = async (search: string, loadedOptions: IOption<IProject>[], data: any): Promise<{ options: IOption<IProject>[], hasMore: boolean, additional?: any | null }> => {
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
        label: i.title ?? '',
        value: i
      })),
      hasMore: hasMore,
      additional: {
        page: (page ?? 0) + 1
      }
    }
  }
  return (
    <SelectField<IProject> {...(props as any)} async={true}
                           defaultOption={field.value ? {label: field.value?.title ?? '', value: field.value} : null}
                          loadOptions={loadOptions} options={[]}
                         initialAsyncData={{page: 1}}/>
  )
}

