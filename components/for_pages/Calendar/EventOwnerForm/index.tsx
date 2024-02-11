import styles from './index.module.scss'
import {useEffect, useRef, useState} from 'react'
import {DeepPartial, IFormStep, Nullable, RequestError} from '@/types/types'
import FormStepper from '@/components/ui/FormStepper'
import CreateMeetingParticipantsStep from '@/components/for_pages/Calendar/EventOwnerForm/CreateMeetingParticipantsStep'
import CreateMeetingDetailsStep from '@/components/for_pages/Calendar/EventOwnerForm/CreateMeetingDetailsStep'
import CreateMeetingTimeStep from '@/components/for_pages/Calendar/EventOwnerForm/CreateMeetingTimeStep'
import {Form, FormikProvider, useFormik} from 'formik'
import Card from '@/components/for_pages/Common/Card'
import FormStickyFooter from '@/components/for_pages/Common/FormStickyFooter'
import Button from '@/components/ui/Button'
import {format, parse} from 'date-fns'
import {omit} from '@/utils/omit'
import PageTitle from '@/components/for_pages/Common/PageTitle'
import {IProfile} from '@/data/interfaces/IProfile'
import {SnackbarType} from '@/types/enums'
import EventRepository from '@/data/repositories/EventRepository'
import IEvent from '@/data/interfaces/IEvent'
import {useAppContext} from '@/context/state'
import useTranslation from 'next-translate/useTranslation'
import ContentLoader from '@/components/ui/ContentLoader'

interface IFormDataSlot {
  start: string
  end: string
}
type EventSlotForm =  {
  [key: string]: {
    start: string
    end: string
  }[]
}
interface IFormData {
  theme: Nullable<string>
  description: Nullable<string>
  place: Nullable<string>
  duration: Nullable<number>
  participants: IProfile[]
  slots: EventSlotForm
}

enum FormStep {
  Participants = 'participants',
  Details = 'details',
  Time = 'time',
}

interface Props {
  onBack?: () => void
  onSubmit?: () => void
  cvId?: number
  vacancyId?: number
  eventId?: number
}





const EventOwnerFormInner = (props: Props  & {event: IEvent | null}) => {
  const appContext = useAppContext()
  const { t } = useTranslation()
  const [formLoading, setFormLoading] = useState(false)
  const formRef = useRef<HTMLDivElement | null>(null)

  const steps: IFormStep<FormStep>[] = [
    {key: FormStep.Participants, name: t('event_form_step_participants')},
    {key: FormStep.Details, name: t('event_form_step_details')},
    {key: FormStep.Time, name: t('event_form_step_time')},
  ]
  const [step, setStep] = useState<FormStep>(FormStep.Participants)

  const handlePrevious = () => {
    const curIndex = steps.findIndex(i => i.key === step)
    if(curIndex > 0) {
      setStep(steps[curIndex - 1].key)
    }
  }
  const formatSlotsToForm = (event: IEvent): EventSlotForm => {
    const slots: EventSlotForm = {}
    for(const slot of event.slots){
      const key = format(new Date(slot.start),'yyyy-MM-dd')
      if(!slots[key]){
        slots[key] = []
      }
      slots[key].push({start: format(new Date(slot.start),'HH:mm'), end: format(new Date(slot.end),'HH:mm')})
    }
    return slots
  }

  const handleSubmit = async (data: IFormData) => {

    if (step !== FormStep.Time) {
      const curIndex = steps.findIndex(i => i.key === step)
      setStep(steps[curIndex + 1].key)
    } else {
      const dates = Object.keys(data.slots)
      let slots: {start: string, end: string}[] = []
      for (const date of dates) {
        const toDate = parse(date, 'yyyy-MM-dd', new Date())
        const timeStrToDate = (time: string, date: Date) => {
          const copiedDate = new Date(date)
          const [hours, mins] = time.split(':')
          copiedDate.setHours(parseInt(hours, 10) ?? 0)
          copiedDate.setMinutes(parseInt(mins) ?? 0)
          copiedDate.setSeconds(0)
          copiedDate.setMilliseconds(0)
          return copiedDate
        }
        const items = data.slots[date].filter(i => i.start && i.end).map(i => {
          return {start: timeStrToDate(i.start, toDate).toISOString(), end: timeStrToDate(i.end, toDate).toISOString()}
        })
        slots = [...slots, ...items]
      }
      const newData = {...omit(data, ['slots', 'participants']),
        participantsIds: data.participants?.map(i => i.id),
        slots, cvId: props.cvId, vacancyId: props.vacancyId}
      setFormLoading(true)
      try{
        if(props.eventId){
          const res = await EventRepository.update(props.eventId, newData as DeepPartial<IEvent>)
          appContext.eventUpdateState$.next(res)
          props.onSubmit?.()

        }else{
          const res = await EventRepository.create(newData as DeepPartial<IEvent>)
          props.onSubmit?.()
        }

      } catch (err) {
        if (err instanceof RequestError) {
          appContext.showSnackbar(err.message, SnackbarType.error)
        }
      }
      setFormLoading(false)
    }
  }

  const initialValues: IFormData = {
    theme: props.event?.theme ?? null,
    place: props.event?.place ?? null,
    description: props.event?.description ?? null,
    duration: props.event?.duration ?? null,
    participants: props.event?.participants ?? [],
    slots: props.event ? formatSlotsToForm(props.event) : {},
  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  })

  return (
    <div className={styles.root}  ref={formRef}>
      <PageTitle title={t('event_form_title')} className={styles.title} onBack={props.onBack} />

      <Card className={styles.card}>
        <FormikProvider value={formik}>
          <Form className={styles.form}>
            <FormStepper<FormStep> steps={steps} currentStep={step}/>
            <div className={styles.content}>
              {step === FormStep.Participants && <CreateMeetingParticipantsStep/>}
              {step === FormStep.Details && <CreateMeetingDetailsStep/>}
              {step === FormStep.Time && <CreateMeetingTimeStep values={formik.values.slots}/>}
            </div>

          </Form>
        </FormikProvider>

      </Card>
      <FormStickyFooter boundaryElement={`.${styles.root}`} formRef={formRef}>
        <Button spinner={formLoading} type='button' styleType='large' color='green' onClick={() => formik.submitForm()}>
          {t('event_form_button_next')}
        </Button>
        <>
          {step !== FormStep.Participants && <Button disabled={formLoading} type='button' styleType='large' color='white' onClick={handlePrevious}>
            {t('event_form_button_previous')}
          </Button>}
        </>
      </FormStickyFooter>
    </div>
  )
}


export default function EventOwnerForm(props: Props) {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(!!props.eventId)
  const [event, setEvent] = useState<IEvent | null>(null)
  useEffect(() => {
    if(!props.eventId){
      return
    }
    EventRepository.fetchById(props.eventId!).then((event) => {
      setEvent(event)
      setLoading(false)
    })
  }, [props.eventId])

  return loading ? (
    <div className={styles.root} >
      <PageTitle title={t('event_form_title')} className={styles.title} onBack={props.onBack} />
      {loading && <ContentLoader isOpen={true} style={'block'}/>}
    </div> ) : (<EventOwnerFormInner {...props} event={event}/>)
}
