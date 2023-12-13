import styles from './index.module.scss'
import { useField } from 'formik'
import { IField } from 'types/types'
import FieldError from 'components/fields/FieldError'

import { colors } from '@/styles/variables'
import StarSvg from '@/components/svg/StarSvg'
import {Rating} from 'react-simple-star-rating'
import FieldLabel, {LabelStyleType} from '@/components/fields/FieldLabel'

interface Props extends IField<string> {
  label?: string
  labelStyleType?: LabelStyleType
}

export default function StarRatingsField(props: Props) {
  // @ts-ignore
  const [field, meta, helpers] = useField(props as any)
  const showError = meta.touched && !!meta.error

  const onStarClick = (nextValue: number) => {
    if(props.disabled){
      return
    }
    helpers.setValue(nextValue)
  }

  return (
    <div className={styles.root} data-field={props.name}>
      {props.label &&
        <FieldLabel label={props.label} styleType={props.labelStyleType} />
      }
      <Rating
        emptyIcon={<StarSvg color={colors.green} />}
        fillIcon={<StarSvg color={colors.green}  filled />}
        onClick={onStarClick}
        transition
      />

      <FieldError showError={showError}>{meta.error}</FieldError>
    </div >
  )
}
