import styles from './index.module.scss'

import { useDetectOutsideClick } from '@/components/hooks/useDetectOutsideClick'
import { useRef, useState } from 'react'
import Image from 'next/image'
import { colors } from '@/styles/variables'
import ChevronDownSvg from '@/components/svg/ChevronDownSvg'
import classNames from 'classnames'
import CheckSvg from '@/components/svg/CheckSvg'
import Spacer from '@/components/ui/Spacer'
import { useAppContext } from '@/context/state'

interface Props {
}

interface Lang {
  label: string
  value: string
  flag: string|JSX.Element
}

export default function LanguageSelector(props: Props) {
  const appContext = useAppContext()

  const langs: Lang[] = [
    {label: 'English', value: 'en', flag: <Image src={'/img/icons/usaFlag.png'} width={24} height={16} alt={''}/>},
    {label: 'Bahasa Indonesia ', value: 'id', flag: <Image src={'/img/icons/indonesiaFlag.png'} width={24} height={16} alt={''}/>},
  ]

  const wrapper = useRef(null!)
  const [active, setActive] = useDetectOutsideClick(wrapper, false)
  const [activeLanguage, setActiveLanguage] = useState<Lang>(langs.find(el=> el.value === appContext.currentLanguage)||langs[0])

  return (<div className={styles.root} ref={wrapper}>
    <div className={styles.switcher} onClick={() => setActive(!active)}>
      {activeLanguage.flag} {activeLanguage.value} <ChevronDownSvg color={colors.white} />
    </div>
    <div className={classNames(styles.dropdown, active && styles.active) }>
      {
        langs.map((lang, index) => (
          <div
          className={styles.dropdownItem}
          key={index}
          onClick={() => {
            setActiveLanguage(lang)
            appContext.setLanguage(lang.value)
            setActive(false)
          }}
          >
            {lang.flag} {lang.label} {lang.value === activeLanguage.value ? <CheckSvg/>:<Spacer basis={16}/>}
          </div>
        ))
      }
    </div>

  </div>)
}
