import React, {useRef} from 'react'
import {IField, IOption, Nullable} from '@/types/types'
import KeywordRepository from '@/data/repositories/KeywordRepository'
import {IKeyword} from '@/data/interfaces/IKeyword'
import SelectMultipleField from '@/components/fields/SelectMultipleField'
import {useField} from 'formik'


interface Props extends IField<IKeyword[]> {
  resettable?: boolean
  onChange?: (value: Nullable<number>) => void
}

export default function KeywordField(props: Props) {
  const abortControllerRef = useRef<AbortController | null>(null)
  const [field] = useField<IKeyword[]>(props as any)
  const loadOptions = async (search: string, loadedOptions: IOption<IKeyword>[], data: any): Promise<{ options: IOption<IKeyword>[], hasMore: boolean, additional?: any | null }> => {
    console.log('loadOptionsSearch', search)
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
        value: i
      })),
      hasMore: hasMore,
      additional: {
        page: (page ?? 0) + 1
      }
    }
  }
  const handleCreate = (value: string) => {
    return KeywordRepository.create({title: value})
  }

  return (
    <SelectMultipleField<IKeyword> {...(props as any)} async={true}
                                   values={field.value?.map(i => ({
                                     label: i.title,
                                     value: i
                                   }))}
                                   placeholder={'Enter keyword'}
                                   onCreateOption={handleCreate} creatable={true} loadOptions={loadOptions} options={[]}
                                initialAsyncData={{page: 1}}/>
  )
}

