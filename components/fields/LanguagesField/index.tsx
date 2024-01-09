import styles from './index.module.scss'

import { useField } from 'formik'
import { IField, IOption } from '@/types/types'
import RadioField from '../RadioField'
import { LanguageKnowLevel } from '@/data/enum/LanguageKnowLevel'
import LanguageField from '../LanguageField'
import { useState } from 'react'
import { ILanguageKnowledge } from '@/data/interfaces/ICV'
import LanguageUtils from '@/utils/LanguageUtils'
import classNames from 'classnames'
import AddSvg from '@/components/svg/AddSvg'
import { colors } from '@/styles/variables'
import CloseSvg from '@/components/svg/CloseSvg'


interface Props extends IField<string[]> {
  className?: string
}
export default function LanguagesField(props: Props) {
  const [field, meta, helpers] = useField<ILanguageKnowledge[]>(props as any)
  const [index, setIndex] = useState<number>(field.value.length > 0?field.value.length:0)

  const levelOptions: IOption<string>[] = [
    {label: 'A1 – Breakthrough or beginner', value: LanguageKnowLevel.A1},
    {label: 'A2 – Way stage or elementary', value: LanguageKnowLevel.A2},
    {label: 'B1 – Threshold or intermediate ', value: LanguageKnowLevel.B1},
    {label: 'B2 – Advantage or upper intermediate ', value: LanguageKnowLevel.B2},
    {label: 'C1 – Effective operational proficiency or advanced ', value: LanguageKnowLevel.C1},
    {label: 'C2 – Mastery or proficiency ', value: LanguageKnowLevel.C2},
  ]

  const onRemoveTag = (ind: number) => {
    helpers.setValue(field.value.filter((_, index) => index !== ind))
    setIndex(state => state > 0 ? state - 1: state)
  }

  return (
      <div className={styles.root}>  
        {field.value.length > 0 &&
          <div className={styles.tagList}>
            {field.value.map((i, ind) => (
              i?.level && i.language &&
              <div className={styles.tag}>
                {LanguageUtils.getLanguageName(i.language)} - {i.level}
                <div 
                className={styles.closeButton} 
                onClick={()=> {onRemoveTag(ind)}}>
                  <CloseSvg color={colors.textSecondary}/>
                </div>
              </div>
            ))}          
          </div> 
        }        

        <LanguageField name={`languageKnowledges[${index}].language`} resettable/>
        <div className={classNames(styles.levelList, field.value[index]?.language && styles.hasValue)}>
          <p className={styles.subtitle}>Select the level of proficiency</p>
          <RadioField 
          className={styles.radioListRoot}
          listClassName={styles.radioList} 
          options={levelOptions} 
          name={`languageKnowledges[${index}].level`}
          />
        </div>
        {field.value[index]?.language && field.value[index]?.level &&
          <div className={styles.add} onClick={() => setIndex(index + 1)}>
            <AddSvg color={colors.green} />
            <div className={styles.desc}>Add language</div>
          </div>      
        }
      </div>
  )
}