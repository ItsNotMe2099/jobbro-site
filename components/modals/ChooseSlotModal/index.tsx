import styles from './index.module.scss'

import { IAvailableSlot } from '@/data/interfaces/IEvent'
import { useAppContext } from '@/context/state'
import BottomSheetLayout from '@/components/layout/BottomSheet/BottomSheetLayout'
import BottomSheetBody from '@/components/layout/BottomSheet/BottomSheetBody'
import RadioField from '@/components/fields/RadioField'
import Validator from '@/utils/validator'
import { format } from 'date-fns'
import { Form, FormikProvider, useFormik } from 'formik'
import Button from '@/components/ui/Button'
import { Nullable } from '@/types/types'
import ClockSvg from '@/components/svg/ClockSvg'
import { colors } from '@/styles/variables'
import useTranslation from 'next-translate/useTranslation'
import ModalLayout from '@/components/layout/Modal/ModalLayout'
import ModalBody from '@/components/layout/Modal/ModalBody'

interface Props {
  isBottomSheet?: boolean
  onClose?: () => void
}

export interface IChooseSlotModalArgs {
  availableSlots: IAvailableSlot[]
  onSet?: (slot: string) => void
  currentDate: Nullable<Date>
}

export default function ChooseSlotModal(props: Props) {
  debugger
  const appContext = useAppContext()
  const args: IChooseSlotModalArgs = props.isBottomSheet?appContext.bottomSheetOnTopArguments:appContext.modalArguments
  const { t } = useTranslation()

  const formik = useFormik<{slot: string}>({
    initialValues: {
      slot: 'null'
    },
    onSubmit: (data) => {
      args.onSet?.(data.slot)
    }
  })

  const body = (
    <FormikProvider value={formik}>
      <div className={styles.header}>
        <div
          className={styles.day}>{args?.currentDate ? format(args.currentDate, 'EEEE, MMMM dd') : '&nbsp;'}</div>
        <div className={styles.timezone}>
          <ClockSvg color={colors.simpleGrey}/>
          <div className={styles.label}>{t('event_select_slot_timezone')}</div>
          <div className={styles.value}>{format(new Date(), 'zzz')}</div>
        </div>
      </div>

      <p className={styles.title}>
        {t('event_select_available_slots_title')}
      </p>

      <Form className={styles.form}>
        {args?.availableSlots &&
          <RadioField<string> 
          validate={Validator.required} 
          name={'slot'} 
          options={args?.availableSlots&&args.availableSlots?.map(i => ({
            label: `${format(new Date(i.start), 'HH:mm')} - ${format(new Date(i.end), 'HH:mm')}`,
            value: `${i.start}//${i.end}`
          }))}/>
        }
      </Form>
        <div className={styles.buttons}>
          <Button styleType='medium' color='green' onClick={formik.submitForm}>Confirm</Button>
          <Button styleType='medium' color='white' onClick={()=>props.onClose?.()}>Cancel</Button>
        </div>
    </FormikProvider>
  )

  if(props.isBottomSheet) {
    return (
      <BottomSheetLayout>
        <BottomSheetBody>
          {body}
        </BottomSheetBody>
      </BottomSheetLayout>
    )
  }

  return (
    <ModalLayout>
      <ModalBody className={styles.modalBody}>
        {body}
      </ModalBody>
    </ModalLayout>
  )
}