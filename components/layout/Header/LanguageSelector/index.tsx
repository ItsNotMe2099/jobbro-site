import styles from './index.module.scss'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { colors } from '@/styles/variables'
import ChevronDownSvg from '@/components/svg/ChevronDownSvg'
import classNames from 'classnames'
import CheckSvg from '@/components/svg/CheckSvg'
import Spacer from '@/components/ui/Spacer'
import { useAppContext } from '@/context/state'
import setLanguage from 'next-translate/setLanguage'
import useTranslation from 'next-translate/useTranslation'
import { useDropDown } from '@/components/hooks/useDropDown'
import { MenuDropdown } from '@/components/ui/MenuDropdown'
interface Props {
}

interface Lang {
  label: string
  value: string
  flag: string|JSX.Element
}

export default function LanguageSelector(props: Props) {
  const appContext = useAppContext()
  const {t, lang} = useTranslation()
  const langs: Lang[] = [
    {label: 'English', value: 'en', flag: <Image src={'/img/icons/usaFlag.png'} width={24} height={16} alt={''}/>},
    {label: 'Bahasa Indonesia ', value: 'id', flag: <Image src={'/img/icons/indonesiaFlag.png'} width={24} height={16} alt={''}/>},
  ]

  const {setRootRef, isActive, setIsActive, popperStyles, setPopperElement, attributes} = useDropDown({placement: 'bottom-start', offset: [0, 4]})
  const [activeLanguage, setActiveLanguage] = useState<Lang>(langs.find(el=> el.value === lang)||langs[0])

  const handleChangeLanguage = (lang: Lang) => {
    setLanguage(lang.value)
    setActiveLanguage(lang)
    setIsActive(false)
  }

  useEffect(()=>{
    if(appContext.headerDirection === 'down'){
      setIsActive(false)
    }
  }, [appContext.headerDirection])

  
  return (<div className={styles.root} ref={setRootRef}>
    <div className={styles.switcher} onClick={() => setIsActive(!isActive)}>
      {activeLanguage.flag} {activeLanguage.value.toUpperCase()} <ChevronDownSvg color={colors.white} />
    </div>
    <MenuDropdown 
    ref={setPopperElement}
    styleType={'separator'}
    isOpen={isActive as boolean}
    className={classNames(styles.dropDown)}
    style={popperStyles.popper}
    {...attributes.popper} 
    options={langs.map((lang, index)=> ({label: <div
      className={styles.dropdownItem}
      key={index}
      onClick={() => handleChangeLanguage(lang)}
      >
        {lang.flag} {lang.label} {lang.value === activeLanguage.value ? <CheckSvg/>:<Spacer basis={16}/>}
      </div>}))
    }/>  
  </div>)
}
