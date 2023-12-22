import styles from './index.module.scss'
import {formatMonthYear, getBeginNext, getBeginPrevious} from '@/utils/date'
import useTranslation from 'next-translate/useTranslation'
import ArrowSvg from '@/components/svg/ArrowSvg'
import {colors} from '@/styles/variables'
import IconButton from '@/components/ui/IconButton'

interface Props {
  onChangeDate: (date: Date) => void
  currentDate: Date
}

export default function CalendarToolbar(props: Props) {
  const {t, lang} = useTranslation('common')
  const handlePrevClick = () => {
    props.onChangeDate(getBeginPrevious('month', props.currentDate))
  }
  const handleNextClick = () => {
    props.onChangeDate(getBeginNext('month', props.currentDate))
  }

  const renderLabel = (date: Date) => {
    const parts = formatMonthYear(lang, date).split(' ')
    return (<>{parts[0]} <span className={styles.year}>{parts[1]}</span></>)
  }

  return (
    <div className={styles.root}>
       <IconButton bgColor={'lightGreen'} onClick={handlePrevClick}><ArrowSvg direction='left' color={colors.green}/></IconButton>
        <div className={styles.label}>{renderLabel(props.currentDate)}</div>
        <IconButton  bgColor={'lightGreen'} onClick={handleNextClick}><ArrowSvg direction='right' color={colors.green}/></IconButton>
    </div>
  )
}

