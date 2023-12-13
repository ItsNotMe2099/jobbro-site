import React, {useRef} from 'react'
import {IField, IOption, Nullable} from '@/types/types'
import KeywordRepository from '@/data/repositories/KeywordRepository'
import SelectMultipleField from '@/components/fields/SelectMultipleField'
import {useField} from 'formik'


interface Props extends IField<string[]> {
  resettable?: boolean
  onChange?: (value: Nullable<number>) => void
}

export default function KeywordField(props: Props) {
  const abortControllerRef = useRef<AbortController | null>(null)
  const [field, meta, helpers] = useField<string[]>(props as any)
  const loadOptions = async (search: string, loadedOptions: IOption<string>[], data: any): Promise<{ options: IOption<string>[], hasMore: boolean, additional?: any | null }> => {

    const page = data.page
    if (abortControllerRef.current) {
      abortControllerRef.current?.abort()
    }

    abortControllerRef.current = new AbortController()
    const res = await KeywordRepository.fetch({
      limit: 5,
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
  const handleCreate = async (value: string) => {
    return value
  }

  return (
    <SelectMultipleField<string> {...(props as any)} async={true}
                                   values={field.value?.map(i => i)}
                                   onDeleteValue={(value) => helpers.setValue(field.value.filter(i => i !== value))}
                                   findValue={(value) => field.value.includes(value)}

                                   placeholder={props.placeholder ?? 'Enter keywords'}
                                   onCreateOption={handleCreate} creatable={true} loadOptions={loadOptions} options={[]}
                                initialAsyncData={{page: 1}}/>
  )
}

