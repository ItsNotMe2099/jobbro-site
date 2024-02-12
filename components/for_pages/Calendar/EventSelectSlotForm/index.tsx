import styles from './index.module.scss'
import { useEffect, useMemo, useRef, useState} from 'react'
import {Nullable, RequestError} from '@/types/types'
import {Form, FormikProvider, useFormik} from 'formik'
import {ModalType, SnackbarType} from '@/types/enums'
import EventRepository from '@/data/repositories/EventRepository'
import {useAppContext} from '@/context/state'
import EventSelectSlotCalendar from '@/components/for_pages/Calendar/EventSelectSlotForm/EventSelectSlotCalendar'
import EventSelectSlotTimes from '@/components/for_pages/Calendar/EventSelectSlotForm/EventSelectSlotTimes'
import {EventSlotListWrapper, useEventSlotListContext} from '@/context/event_slot_list_context'
import PageTitle from '@/components/for_pages/Common/PageTitle'
import Card from '@/components/for_pages/Common/Card'

import FormStickyFooter from '@/components/for_pages/Common/FormStickyFooter'
import Button from '@/components/ui/Button'
import {format} from 'date-fns'
import {MyEvents} from '@/components/for_pages/Calendar/MyEvents'
import useTranslation from 'next-translate/useTranslation'
import { IChooseSlotModalArgs } from '@/components/modals/ChooseSlotModal'

interface IFormDataSlot {
  start: string
  end: string
}

interface IFormData {
  slot: Nullable<string>
}

enum FormStep {
  Participants = 'participants',
  Details = 'details',
  Time = 'time',
}

interface Props {
  onBack?: () => void
  onSubmit?: () => void
  eventId: number
  simpleType?: boolean
}


const EventSelectSlotFormInner = (props: Props) => {
  const appContext = useAppContext()
  const {isTabletWidth} = appContext.size
  const eventListContext = useEventSlotListContext()
  const { t } = useTranslation()
  const [formLoading, setFormLoading] = useState(false)
  const formRef = useRef<HTMLDivElement | null>(null)
  const clickedDay = useRef<boolean>(false)

  const handleSubmit = async (data: IFormData) => {
    setFormLoading(true)
    if(! data.slot){
      return
    }
    try {
      const res = await EventRepository.confirm(props.eventId, {
        start: data.slot.split('//')[0],
        end: data.slot.split('//')[1]
      })
      appContext.eventUpdateState$.next(res)
      props.onSubmit?.()
    } catch (err) {
      if (err instanceof RequestError) {
        appContext.showSnackbar(err.message, SnackbarType.error)
      }
    }
    setFormLoading(false)
  }

  const initialValues: IFormData = {
    slot: null
  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  })

  const selectSlotDateStr = useMemo(() => {
    if (!formik.values.slot) {
      return null
    }
    return format(new Date(formik.values.slot.split('//')[0]), 'yyyy-MM-dd')
  }, [formik.values.slot])

  useEffect(()=>{  
    if(!clickedDay.current ) return
    if(isTabletWidth){
      appContext.showBottomSheetOnTop<IChooseSlotModalArgs>(ModalType.ChooseSlotModal, {
        availableSlots: eventListContext.currentDateSlots,
        onSet: (slot) => {
          formik.setFieldValue('slot', slot)
          appContext.hideBottomSheetOnTop()
        },
        currentDate: eventListContext.currentDate
      })
      return
    }
    else if(!isTabletWidth && props.simpleType){
      appContext.showModal<IChooseSlotModalArgs>(ModalType.ChooseSlotModal, {
        availableSlots: eventListContext.currentDateSlots,
        onSet: (slot) => {
          formik.setFieldValue('slot', slot)
          appContext.hideModal()
        },
        currentDate: eventListContext.currentDate
      })

    }
  }, [eventListContext.currentDateSlots])



  return (<div className={styles.root}>
    <PageTitle title={t('event_select_title')} className={styles.title} onBack={props.onBack}/>
    <div className={styles.wrapper}>
      <div className={styles.left}  ref={formRef}>
        <Card className={styles.card} >
          <FormikProvider value={formik}>
            <Form className={styles.form}>
              <div className={styles.calendar}>
                <EventSelectSlotCalendar 
                onClickDay={()=>clickedDay.current = true} 
                selectSlotDateStr={selectSlotDateStr}
                />
              </div>
              {!isTabletWidth && !props.simpleType &&
                <div className={styles.slots}>
                  <EventSelectSlotTimes/>
                </div>
              }
            </Form>
          </FormikProvider>
        </Card>
        <FormStickyFooter 
        className={styles.footer} 
        boundaryElement={`.${styles.left}`} 
        formRef={formRef}
        >
          <Button 
          disabled={!formik.values.slot} 
          spinner={formLoading} 
          type='button' 
          styleType='large' 
          color='green'
          onClick={() => formik.submitForm()}
          >
            {t('event_select_button_confirm')}
          </Button>
          <>
            <Button 
            disabled={formLoading} 
            type='button' 
            styleType='large' 
            color='white'
            onClick={() => props.onBack?.()}
            >
              {t('event_select_button_cancel')}
            </Button>
          </>
        </FormStickyFooter>
      </div>
      {!isTabletWidth && !props.simpleType &&
        <div className={styles.right}>
          <MyEvents/>
        </div>
        } 
    </div>
  </div>)
}

export default function EventSelectSlotForm(props: Props) {
  return <EventSlotListWrapper eventId={props.eventId}>
    <EventSelectSlotFormInner {...props}/>
  </EventSlotListWrapper>
}
