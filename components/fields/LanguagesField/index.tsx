import { useField } from 'formik'
import styles from './index.module.scss'
import languages from '@cospired/i18n-iso-languages'
import { IField } from '@/types/types'
import { useEffect, useState } from 'react'
import SelectMultipleField from '../SelectMultipleField'


interface Props extends IField<string[]> {
  className?: string
}
export default function LanguagesField(props: Props) {
  const [field, meta, helpers] = useField<string[]>(props as any)
  const [langsList, setLangsList] = useState<{language: string, name: string}[]>()

  useEffect(()=>{
    languages.registerLocale(require('@cospired/i18n-iso-languages/langs/en.json'))
    const languagesList = languages.getNames(('en'))
    setLangsList(Object.keys(languagesList).map(i => ({language: i, name: languagesList[i]})))
  }, [])


  return (<div className={styles.root}> 
  {langsList &&
    <SelectMultipleField<string> {...(props as any)} 
    async={false}
    values={field.value}
    onDeleteValue={(value) => helpers.setValue(field.value.filter(i => i !== value))}
    findValue={(value) => field.value.includes(value)}
    placeholder={props.placeholder ?? 'Start typing the language name'}
    creatable={false} 
    options={langsList.map(i => ({label: i.name, value: i.language, name: i.name}))}
    loadOptions={langsList.map(i => ({label: i.name, value: i.language}))}
    />
}
  </div>)
}