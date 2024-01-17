import styles from './index.module.scss'

import { useField } from 'formik'
import { IField, IOption } from '@/types/types'
import RadioField from '../RadioField'
import { LanguageKnowLevel } from '@/data/enum/LanguageKnowLevel'
import LanguageField from '../LanguageField'
import { useEffect, useState } from 'react'
import { ILanguageKnowledge } from '@/data/interfaces/ICV'
import LanguageUtils from '@/utils/LanguageUtils'
import classNames from 'classnames'
import { colors } from '@/styles/variables'
import CloseSvg from '@/components/svg/CloseSvg'
import useTranslation from 'next-translate/useTranslation'


interface Props extends IField<string[]> {
  className?: string
}
export default function LanguagesField(props: Props) {
  const [field, meta, helpers] = useField<ILanguageKnowledge[]>(props as any)
  const [index, setIndex] = useState<number>(field.value.length > 0?field.value.length:0)
  const { t } = useTranslation()


  const levelOptions: IOption<string>[] = [
    {label: `A1 – ${t('job_form_tab_details_section_languages_a1')}`, value: LanguageKnowLevel.A1},
    {label: `A2 – ${t('job_form_tab_details_section_languages_a2')}`, value: LanguageKnowLevel.A2},
    {label: `B1 – ${t('job_form_tab_details_section_languages_b1')}`, value: LanguageKnowLevel.B1},
    {label: `B2 – ${t('job_form_tab_details_section_languages_b2')}`, value: LanguageKnowLevel.B2},
    {label: `C1 – ${t('job_form_tab_details_section_languages_c1')}`, value: LanguageKnowLevel.C1},
    {label: `C2 – ${t('job_form_tab_details_section_languages_c2')}`, value: LanguageKnowLevel.C2},
  ]

  const onRemoveTag = (ind: number) => {
    helpers.setValue(field.value.filter((_, index) => index !== ind))
  }

  useEffect(()=>{
    const lastEl = field.value.slice(-1)
    if(lastEl[0]?.language && lastEl[0]?.level) {
      setIndex(field.value.length)
    }
    else {
      setIndex(field.value.length === 0? 0: field.value.length - 1)
    }
  }, [field.value])

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

        <LanguageField name={`languageKnowledges[${index}].language`} resettable placeholder={t('job_form_tab_details_section_languages_placeholder')}/>
        <div className={classNames(styles.levelList, field.value[index]?.language && styles.hasValue)}>
          <p className={styles.subtitle}>{t('job_form_tab_details_section_languages_select')}</p>
          <RadioField 
          className={styles.radioListRoot}
          listClassName={styles.radioList} 
          options={levelOptions} 
          name={`languageKnowledges[${index}].level`}
          />
        </div>
        {/* {field.value[index]?.language && field.value[index]?.level &&
          <div className={styles.add} onClick={() => setIndex(index + 1)}>
            <AddSvg color={colors.green} />
            <div className={styles.desc}>Add language</div>
          </div>      
        } */}
      </div>
  )
}